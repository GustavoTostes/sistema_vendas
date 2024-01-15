import { dbVendas } from "@/config/database";
import { aplicarMascaraMonetariaBRL, formatarDateTime, removerMascaraMonetariaBRL } from "@/utils/global";
import { Request } from "express";
import { IFiltro, validarPedidoInsert, validarPedidoUpdate } from "./pedidosModel";


export class PedidosServices {

    async getPedidos(req: Request) {

        const filtro: IFiltro = {

            nome: req.params.nome,
            status: req.params.status,
            dataInicial: req.params.dataInicial,
            dataFinal: req.params.dataFinal,
            idUsuarioLogado: req.params.idUsuarioLogado

        }

        const queryPedidos = dbVendas('pedidos as ped')
        .join('apoio_pedido_status as status', 'ped.status', '=', 'status.id')
        .select('ped.*', 'status.descricao')
        .where('ped.idUsuarioInsert', filtro.idUsuarioLogado)

        if (filtro.nome != '0') queryPedidos.andWhereILike('ped.nome', `%${filtro.nome}%`)
        if (filtro.status != '0') queryPedidos.andWhere('ped.status', filtro.status)
        if (filtro.dataInicial != '0') queryPedidos.andWhere('ped.dataInsert', '>', new Date(filtro.dataInicial))
        if (filtro.dataFinal != '0') queryPedidos.andWhere('ped.dataInsert', '<', new Date(filtro.dataFinal))

        queryPedidos.orderBy('ped.dataInsert', 'desc')

        const pedidos = await queryPedidos

        for(let i = 0; i < pedidos.length; i++) {

            pedidos[i].valor = aplicarMascaraMonetariaBRL(pedidos[i].valor)
            
            pedidos[i].dataInsert = formatarDateTime(pedidos[i].dataInsert)

        }

        let idsPedidos = []

        for (let i = 0; i < pedidos.length; i++) {

            idsPedidos.push(pedidos[i].id)

        }

        const itensPedidos = await dbVendas('pedidos_itens')
        .select('idPedido', 'idProduto as id', 'descricao', 'valorUnitario', 'quantidade')
        .whereIn('idPedido', idsPedidos)

        for (let i = 0; i < pedidos.length; i++) {

            pedidos[i].itens = []
            const idPedido = pedidos[i].id

            for (let o = 0; o < itensPedidos.length; o++) {

                if (itensPedidos[o].idPedido == idPedido) {

                    delete itensPedidos[o].idPedido

                    let valorFinal = itensPedidos[o].valorUnitario * itensPedidos[o].quantidade

                    itensPedidos[o].valorUnitario = aplicarMascaraMonetariaBRL(itensPedidos[o].valorUnitario)

                    itensPedidos[o].valorFinal = aplicarMascaraMonetariaBRL(valorFinal)

                    pedidos[i].itens.push(itensPedidos[o])

                }

            }

        }

        return pedidos

    }

    async getListaStatusPedido() {

        const status = await dbVendas('apoio_pedido_status')
        .select('id as value', 'descricao as title')

        return status

    }

    async getListaProdutos() {

        const produtos = await dbVendas('produtos')
        .select('id as value', 'descricao as title')
        .where('status', 1)
        .orderBy('dataInsert', 'desc')

        return produtos

    }

    async getProduto(req: Request) {

        const produto = await dbVendas('produtos as prod')
        .join('fornecedores as forn', 'prod.idFornecedor', '=', 'forn.id')
        .select('prod.id', 'prod.descricao', 'forn.nomeComercial', 'prod.valor')
        .where('prod.id', req.params.idProduto)
        .first()
        
        produto.valor = aplicarMascaraMonetariaBRL(produto.valor)

        return produto
        
    }

    calcularValorFinalProduto(req: Request) {

        const valorFinal = parseInt(req.params.quantidade) * removerMascaraMonetariaBRL(req.params.valorUnitario)

        return aplicarMascaraMonetariaBRL(valorFinal)

    }

    calcularTotalPedido(req: Request) {

        const valores = req.body.valores
        let somaValores = 0

        for (let i = 0; i < valores.length; i++) {

            somaValores = somaValores + removerMascaraMonetariaBRL(valores[i])

        }

        return aplicarMascaraMonetariaBRL(somaValores)

    }

    async criarPedido(req: Request) {

        req.body.valor = removerMascaraMonetariaBRL(req.body.valor)

        const pedido = validarPedidoInsert(req.body)

        if (pedido.valor > 999999999.99) throw 'O valor limite para pedidos é de R$ 999.999.999,99'

        const pedidoInsert = {

            nome: pedido.nome,
            idUsuarioInsert: pedido.idUsuarioInsert,
            valor: pedido.valor,
            status: 1,
            dataInsert: new Date()

        }

        const idPedidoInsert = await dbVendas('pedidos')
        .insert(pedidoInsert)

        for (let i = 0; i < pedido.itens.length; i++) {

            const itemPedidoInsert = {

                idPedido: idPedidoInsert[0],
                idProduto: pedido.itens[i].idProduto,
                descricao: pedido.itens[i].descricao,
                valorUnitario: removerMascaraMonetariaBRL(pedido.itens[i].valorUnitario),
                quantidade: pedido.itens[i].quantidade

            }

            await dbVendas('pedidos_itens')
            .insert(itemPedidoInsert)

        }

        return 'Pedido criado com sucesso!'

    }

    async excluirPedido(req: Request) {

        await dbVendas('pedidos')
        .delete()
        .where('id', req.params.idPedido)

        await dbVendas('pedidos_itens')
        .delete()
        .where('idPedido', req.params.idPedido)

        return 'Pedido excluído com sucesso!'

    }

    async editarPedido(req: Request) {
        
        req.body.valor = removerMascaraMonetariaBRL(req.body.valor)

        const pedido = validarPedidoUpdate(req.body)

        if (pedido.valor > 999999999.99) throw 'O valor limite para pedidos é de R$ 999.999.999,99'

        await dbVendas('pedidos')
        .update({

            nome: pedido.nome,
            valor: pedido.valor,
            status: 2

        })
        .where('id', pedido.id)

        await dbVendas('pedidos_itens')
        .del()
        .where('idPedido', pedido.id)

        for (let i = 0; i < pedido.itens.length; i++) {

            const itemPedidoInsert = {

                idPedido: pedido.id,
                idProduto: pedido.itens[i].idProduto,
                quantidade: pedido.itens[i].quantidade,
                descricao: pedido.itens[i].descricao,
                valorUnitario: removerMascaraMonetariaBRL(pedido.itens[i].valorUnitario)

            }

            await dbVendas('pedidos_itens')
            .insert(itemPedidoInsert)

        }

        return 'Pedido atualizado com sucesso!'

    }

    async finalizarPedido(req: Request) {

        await dbVendas('pedidos')
        .update({

            status: 3
            
        })
        .where('id', req.params.idPedido)

        return 'Pedido finalzado com sucesso!'

    }

}