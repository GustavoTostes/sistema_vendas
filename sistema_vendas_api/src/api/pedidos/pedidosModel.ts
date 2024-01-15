import { z } from "zod"


interface IFiltro {

    nome: string
    status: string
    dataInicial: string
    dataFinal: string
    idUsuarioLogado: string

}

function validarPedidoInsert(pedido: object) {

    const itemPedidoSchema = z.object({

        idProduto: z.number({ invalid_type_error: 'Informe o id do item.' }),
        descricao: z.string({ invalid_type_error: 'Informe a descrição do item.' }),
        quantidade: z.number({ invalid_type_error: 'Informe a quantidade.' }),
        valorUnitario: z.string({ invalid_type_error: 'Informe o valor unitário' })

    })

    const pedidoSchema = z.object({

        idUsuarioInsert: z.number({ invalid_type_error: 'Informe o criador do pedido.' }),
        nome: z.string({ invalid_type_error: 'Informe o nome do pedido.' }),
        valor: z.number({ invalid_type_error: 'Informe o valor do pedido.' }),
        itens: z.array(itemPedidoSchema)

    })

    return pedidoSchema.parse(pedido)

}

function validarPedidoUpdate(pedido: object) {

    const itemPedidoSchema = z.object({

        idProduto: z.number({ invalid_type_error: 'Informe o id do item.' }),
        descricao: z.string({ invalid_type_error: 'Informe a descrição do item.' }),
        quantidade: z.number({ invalid_type_error: 'Informe a quantidade.' }),
        valorUnitario: z.string({ invalid_type_error: 'Informe o valor unitário' })

    })

    const pedidoSchema = z.object({

        id: z.number({ invalid_type_error: 'Informe o id do pedido.' }),
        nome: z.string({ invalid_type_error: 'Informe o nome do pedido.' }),
        valor: z.number({ invalid_type_error: 'Informe o valor do pedido.' }),
        itens: z.array(itemPedidoSchema)

    })

    return pedidoSchema.parse(pedido)

}


export { IFiltro, validarPedidoInsert, validarPedidoUpdate }