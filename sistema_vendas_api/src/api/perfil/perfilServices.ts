import { dbVendas } from "@/config/database";
import { removerMascaraCPF } from "@/utils/global";
import { Request } from "express";
import { validarUsuarioUpdate } from "./perfilModel";
import bcrypt from 'bcrypt';


export class PerfilServices {

    async getDadosUsuario(req: Request) {

        const usuario = await dbVendas('usuarios')
        .where('id', req.params.idUsuario)
        .first()

        return usuario

    }

    async editarPerfil(req: Request) {

        if (req.body.cpf) req.body.cpf = removerMascaraCPF(req.body.cpf)
        if (req.body.email) req.body.email = req.body.email.toLowerCase()

        const usuario = validarUsuarioUpdate(req.body)

        const cpfExistente = await dbVendas('usuarios')
        .where('cpf', usuario.cpf)
        .andWhereNot('id', usuario.id)
        .first()

        if (cpfExistente) throw 'CPF já cadastrado.|fechar'

        const emailExistente = await dbVendas('usuarios')
        .where('email', usuario.email)
        .andWhereNot('id', usuario.id)
        .first()

        if (emailExistente) throw 'E-mail já cadastrado.|fechar'

        const usuarioSenhaAtual = await dbVendas('usuarios')
        .select('senha')
        .where('id', usuario.id)
        .first()

        if (usuarioSenhaAtual) {

            const match = await bcrypt.compare(usuario.senhaAtualConfirmada, usuarioSenhaAtual.senha)

            if (!match) throw 'Senha incorreta.|manter'

            await dbVendas('usuarios')
            .update({
    
                'nome': usuario.nome,
                'cpf': usuario.cpf,
                'email': usuario.email,
                'corSistema': usuario.corSistema
    
            })
            .where('id', usuario.id)
    
            return 'Seus dados foram atualizados com sucesso! Você precisará efetuar o login novavmente em alguns segundos.'

        }

    }

    async excluirConta(req: Request) {

        const usuarioSenhaAtual = await dbVendas('usuarios')
        .where('id', req.params.idUsuario)
        .first()

        if (usuarioSenhaAtual) {

            const match = await bcrypt.compare(req.params.senhaAtualConfirmada, usuarioSenhaAtual.senha)

            if (!match) throw 'Senha incorreta.'

            await dbVendas('usuarios')
            .del()
            .where('id', req.params.idUsuario)

            const resultIdsPedidos = await dbVendas('pedidos')
            .select('id')
            .where('idUsuarioInsert', req.params.idUsuario)

            await dbVendas('pedidos')
            .del()
            .where('idUsuarioInsert', req.params.idUsuario)

            let idsPedidos = []

            for (let i = 0; i < resultIdsPedidos.length; i++) {

                idsPedidos.push(resultIdsPedidos[i].id)

            }

            await dbVendas('pedidos_itens')
            .del()
            .whereIn('idPedido', idsPedidos)

            return 'Conta excluída com sucesso!'

        }

    }

}