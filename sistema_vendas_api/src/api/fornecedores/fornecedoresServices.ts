import { dbVendas } from "@/config/database";
import { Request } from "express";
import { IFiltro, validarFornecedorInsert, validarFornecedorUpdate, validarFornecedorUpdateStatus } from "./fornecedoresModel";
import { aplicarMascaraCNPJ, removerMascaraCNPJ } from "@/utils/global";


export class FornecedoresServices {

    async getListaStatusFornecedor() {

        const status = await dbVendas('apoio_fornecedor_status')
        .select('id as value', 'descricao as title')

        return status

    }

    async getFornecedores(req: Request) {

        req.query.cnpj = removerMascaraCNPJ(req.query.cnpj?.toString())

        const filtro: IFiltro = {

            nome: req.query.nome?.toString(),
            cnpj: req.query.cnpj,
            email: req.query.email?.toString(),
            status: req.query.status?.toString()

        }

        const queryFornecedores = dbVendas('fornecedores as for')
        .join('apoio_fornecedor_status as status', 'for.status', '=', 'status.id')
        .select('for.*', 'status.descricao')

        if (filtro.nome) queryFornecedores.andWhereILike('for.nomeComercial', `%${filtro.nome}%`)
        if (filtro.cnpj) queryFornecedores.andWhereILike('for.cnpj', `%${filtro.cnpj}%`)
        if (filtro.email) queryFornecedores.andWhereILike('for.email', `%${filtro.email}%`)
        if (filtro.status) queryFornecedores.andWhere('for.status', filtro.status)

        queryFornecedores.orderBy('for.id', 'desc')

        const fornecedores = await queryFornecedores

        for (let i = 0; i < fornecedores.length; i++) {

            fornecedores[i].cnpj = aplicarMascaraCNPJ(fornecedores[i].cnpj)

        }

        return fornecedores

    }

    async criarFornecedor(req: Request) {

        if (req.body.cnpj) req.body.cnpj = removerMascaraCNPJ(req.body.cnpj)
        if (req.body.email) req.body.email = req.body.email.toLowerCase()

        const fornecedor = validarFornecedorInsert(req.body)

        const fornecedorInsert = {

            ...fornecedor,
            status: 1

        }

        const nomeCadastrado = await dbVendas('fornecedores')
        .where('nomeComercial', fornecedor.nomeComercial)
        .first()

        if (nomeCadastrado) throw 'Nome comercial já cadastrado.'

        const cnpjCadastrado = await dbVendas('fornecedores')
        .where('cnpj', fornecedor.cnpj)
        .first()

        if (cnpjCadastrado) throw 'CNPJ já cadastrado.'

        const emailCadastrado = await dbVendas('fornecedores')
        .where('email', fornecedor.email)
        .first()

        if (emailCadastrado) throw 'E-mail já cadastrado.'

        await dbVendas('fornecedores')
        .insert(fornecedorInsert)

        return 'Fornecedor criado com sucesso!'

    }

    async editarFornecedor(req: Request) {

        if (req.body.email) req.body.email = req.body.email.toLowerCase()

        const fornecedorUpdate = validarFornecedorUpdate(req.body)

        const nomeCadastrado = await dbVendas('fornecedores')
        .where('nomeComercial', fornecedorUpdate.nomeComercial)
        .andWhereNot('id', fornecedorUpdate.id)
        .first()

        if (nomeCadastrado) throw 'Nome comercial já cadastrado.'

        const emailCadastrado = await dbVendas('fornecedores')
        .where('email', fornecedorUpdate.email)
        .andWhereNot('id', fornecedorUpdate.id)
        .first()

        if (emailCadastrado) throw 'E-mail já cadastrado.'

        await dbVendas('fornecedores')
        .update({

            nomeComercial: fornecedorUpdate.nomeComercial,
            email: fornecedorUpdate.email

        })
        .where('id', fornecedorUpdate.id)

        return 'Fornecedor atualizado com sucesso!'

    }

    async alterarStatusFornecedor(req: Request) {

        const statusBody = validarFornecedorUpdateStatus(req.body)

        await dbVendas('fornecedores')
        .update({

            status: statusBody.status

        })
        .where('id', statusBody.idFornecedor)

        await dbVendas('produtos')
        .update({

            status: statusBody.status

        })
        .where('idFornecedor', statusBody.idFornecedor)

        return statusBody.mensagem

    }

    async excluirFornecedor(req: Request) {

        await dbVendas('fornecedores')
        .del()
        .where('id', req.params.idFornecedor)

        await dbVendas('produtos')
        .del()
        .where('idFornecedor', req.params.idFornecedor)

        return 'Fornecedor excluído com sucesso!'

    }

}