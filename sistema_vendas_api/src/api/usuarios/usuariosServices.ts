import { Request } from 'express';
import { dbVendas } from '@/config/database';
import { IFiltro, validarUsuarioInsert, validarUsuarioUpdate } from './usuariosModel';
import { aplicarMascaraCPF, formatarDateTime, removerMascaraCPF } from '@/utils/global';
import bcrypt from 'bcrypt';


export class UsuariosServices {

    async getUsuarios(req: Request) { 

        const filtro: IFiltro = {

            email: req.params.email,
            nome: req.params.nome,
            cpf: removerMascaraCPF(req.params.cpf),
            idPermissao: req.params.idPermissao,
            idUsuarioLogado: req.params.idUsuarioLogado

        }

        const queryUsuarios = dbVendas('usuarios as user')
        .join('apoio_permissao as perm', 'user.idPermissao', '=', 'perm.id')
        .select('user.*', 'perm.descricao')
        .whereNot('user.id', filtro.idUsuarioLogado)

        if (filtro.email != '0') queryUsuarios.andWhereILike('user.email', `%${filtro.email}%`)
        if (filtro.nome != '0') queryUsuarios.andWhereILike('user.nome', `%${filtro.nome}%`)
        if (filtro.cpf != '0') queryUsuarios.andWhereILike('user.cpf', `%${filtro.cpf}%`)
        if (filtro.idPermissao != '0') queryUsuarios.andWhere('user.idPermissao', filtro.idPermissao)

        queryUsuarios.orderBy('user.dataInsert', 'desc')

        const usuarios = await queryUsuarios

        for (let i = 0; i < usuarios.length; i++) {

            usuarios[i].cpf = aplicarMascaraCPF(usuarios[i].cpf)

            usuarios[i].dataInsert = formatarDateTime(usuarios[i].dataInsert)

        }

        return usuarios

    }

    async editarUsuario(req: Request) {

        const usuarioUpdate = validarUsuarioUpdate(req.body)

        await dbVendas('usuarios')
        .update({

            idPermissao: usuarioUpdate.idPermissao,
            nome: usuarioUpdate.nome

        })
        .where('id', usuarioUpdate.id)

        return 'Informações do usuário atualizadas com sucesso!'

    }

    async criarUsuario(req: Request) {

        if (req.body.cpf) req.body.cpf = removerMascaraCPF(req.body.cpf)
        if (req.body.email) req.body.email = req.body.email.toLowerCase()

        const cadastro = validarUsuarioInsert(req.body)

        const usuarioCPF = await dbVendas('usuarios') 
        .where('cpf', cadastro.cpf)
        .first()

        if (usuarioCPF) throw 'CPF já cadastrado.'
        
        const usuarioEmail = await dbVendas('usuarios') 
        .where('email', cadastro.email)
        .first()

        if (usuarioEmail) throw 'E-mail já cadastrado.'

        if (cadastro.senhaConfirma != cadastro.senha) throw 'As senhas não coincidem.'

        const senhaHash = await bcrypt.hash(cadastro.senha, 10)

        const ultimoId = await dbVendas('usuarios')
        .select('id')
        .orderBy('id', 'desc')
        .first()

        const usuarioHash = await bcrypt.hash(`6eavk8452a${ultimoId}`, 10)

        const usuarioInsert = {

            nome: cadastro.nome,
            cpf: cadastro.cpf,
            email: cadastro.email,
            senha: senhaHash,
            idUsuarioInsert: cadastro.idUsuarioInsert,
            idPermissao: cadastro.idPermissao,
            dataInsert: new Date(),
            corSistema: 'cyan-darken-3',
            hash: usuarioHash

        }

        await dbVendas('usuarios')
        .insert(usuarioInsert)
        
        return 'Usuário cadastrado com sucessso!'
        
    }

    async excluirUsuario(req: Request) {

        await dbVendas('usuarios')
        .del()
        .where('id', req.params.id)

        const resultIdsPedidos = await dbVendas('pedidos')
        .select('id')
        .where('idUsuarioInsert', req.params.id)

        await dbVendas('pedidos')
        .del()
        .where('idUsuarioInsert', req.params.id)

        let idsPedidos = []

        for (let i = 0; i < resultIdsPedidos.length; i++) {

            idsPedidos.push(resultIdsPedidos[i].id)

        }

        await dbVendas('pedidos_itens')
        .del()
        .whereIn('idPedido', idsPedidos)

        return 'Usuário excluído com sucesso!'

    }

    async getListaPermissoes() {

        const permissoes = await dbVendas('apoio_permissao')
        .select('id as value', 'descricao as title')

        return permissoes

    }

}