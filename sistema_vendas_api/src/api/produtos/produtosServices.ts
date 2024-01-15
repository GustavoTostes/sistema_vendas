import { Request } from "express";
import { IFiltro, validarProdutoInsert, validarProdutoStatusUpdate, validarProdutoUpdate } from "./produtosModel";
import { dbVendas } from "@/config/database";
import { aplicarMascaraMonetariaBRL, formatarDateTime, removerMascaraMonetariaBRL } from "@/utils/global";


export class ProdutosServices {

    async getListaFornecedores() {

        const fornecedores = await dbVendas('fornecedores')
        .select('id as value', 'nomeComercial as title', 'status')
        .orderBy('id', 'desc')

        return fornecedores

    }

    async getListaStatus() {

        const status = await dbVendas('apoio_produto_status')
        .select('id as value', 'descricao as title')

        return status

    }

    async getProdutos(req: Request) {

        const filtro: IFiltro = {

            descricao: req.params.descricao,
            idFornecedor: req.params.idFornecedor,
            status: req.params.status,
            dataIni: req.params.dataIni,
            dataFim: req.params.dataFim

        }

        const queryProdutos = dbVendas('produtos as prod')
        .join('apoio_produto_status as status', 'prod.status', '=', 'status.id')
        .join('fornecedores as fornec', 'prod.idFornecedor', '=', 'fornec.id')
        .select('prod.*', 'status.descricao as nomeStatus', 'fornec.nomeComercial')

        if (filtro.descricao != '0') queryProdutos.andWhereILike('prod.descricao', `%${filtro.descricao}%`)
        if (filtro.idFornecedor != '0') queryProdutos.andWhere('prod.idFornecedor', filtro.idFornecedor)
        if (filtro.status != '0') queryProdutos.andWhere('prod.status', filtro.status)
        if (filtro.dataIni != '0') queryProdutos.andWhere('prod.dataInsert', '>', new Date(filtro.dataIni))
        if (filtro.dataFim != '0') queryProdutos.andWhere('prod.dataInsert', '<', new Date(filtro.dataFim))

        queryProdutos.orderBy('prod.dataInsert', 'desc')

        const produtos = await queryProdutos

        for (let i = 0; i < produtos.length; i++) {

            produtos[i].valor = aplicarMascaraMonetariaBRL(produtos[i].valor)

            produtos[i].dataInsert = formatarDateTime(produtos[i].dataInsert)

        }

        return produtos

    }

    async criarProduto(req: Request) {

        req.body.valor = removerMascaraMonetariaBRL(req.body.valor)

        const produto = validarProdutoInsert(req.body)

        const produtoDescricao = await dbVendas('produtos')
        .where('descricao', produto.descricao)
        .andWhere('idFornecedor', produto.idFornecedor)
        .first()

        if (produtoDescricao) throw 'Já existe um produto com essa descrição.'

        const produtoInsert = {

            ...produto,
            dataInsert: new Date(),
            status: 1

        }

        await dbVendas('produtos')
        .insert(produtoInsert)

        return 'Produto cadastrado com sucesso!'

    }

    async editarProduto(req: Request) {

        req.body.valor = removerMascaraMonetariaBRL(req.body.valor)

        const produto = validarProdutoUpdate(req.body)

        const produtoDescricao = await dbVendas('produtos')
        .where('descricao', produto.descricao)
        .andWhere('idFornecedor', produto.idFornecedor)
        .andWhereNot('id', produto.id)
        .first()

        if (produtoDescricao) throw 'Já existe um produto com essa descrição.'

        await dbVendas('produtos')
        .update({

            descricao: produto.descricao,
            idFornecedor: produto.idFornecedor,
            valor: produto.valor

        })
        .where('id', produto.id)

        return 'Produto atualizado com sucesso!'

    }

    async excluirProduto(req: Request) {

        await dbVendas('produtos')
        .del()
        .where('id', req.params.idProduto)

        return 'Produto excluído com sucesso!'

    }

    async alterarStatusProduto(req: Request) {

        const statusBody = validarProdutoStatusUpdate(req.body)

        if (statusBody.status == 1) {

            const produtoPertenceAFornecedorInativo = await dbVendas('produtos as prod')
            .join('fornecedores as fornec', 'prod.idFornecedor', '=', 'fornec.id')
            .select('fornec.nomeComercial')
            .where('prod.id', statusBody.idProduto)
            .andWhere('fornec.status', 2)
            .first()

            if (produtoPertenceAFornecedorInativo) throw `O fornecedor "${produtoPertenceAFornecedorInativo.nomeComercial}" encontra-se inativo, reative-o para disponibilizar este produto.`

        }

        await dbVendas('produtos')
        .update({

            status: statusBody.status
                
        })
        .where('id', statusBody.idProduto)

        return statusBody.mensagem

    }

}