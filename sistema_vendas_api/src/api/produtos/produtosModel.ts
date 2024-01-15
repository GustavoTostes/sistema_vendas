import { z } from "zod"


interface IFiltro {

    descricao: string
    idFornecedor: string
    status: string
    dataIni: string
    dataFim: string

}

function validarProdutoInsert(produto: object) {

    const produtoSchema = z.object({

        descricao: z.string({ invalid_type_error: 'Informe a descrição do produto' }),
        idFornecedor: z.number({ invalid_type_error: 'Informe o fornecedor do produto' }),
        valor: z.number({ invalid_type_error: 'Informe o valor do produto' })

    })

    return produtoSchema.parse(produto)

}

function validarProdutoUpdate(produto: object) {

    const produtoSchema = z.object({

        id: z.number({ invalid_type_error: 'Informe do id do produto' }),
        descricao: z.string({ invalid_type_error: 'Informe a descrição do produto' }),
        idFornecedor: z.number({ invalid_type_error: 'Informe o fornecedor do produto' }),
        valor: z.number({ invalid_type_error: 'Informe o valor do produto' })

    })

    return produtoSchema.parse(produto)

}

function validarProdutoStatusUpdate(statusBody: object) {

    const statusSchema = z.object({

        idProduto: z.number({ invalid_type_error: 'Informe o id do produto.' }),
        status: z.number({ invalid_type_error: 'Informe o status do produto.' }),
        mensagem: z.string({ invalid_type_error: 'Informe a mensagem de retorno.' })

    })

    return statusSchema.parse(statusBody)

}


export { IFiltro, validarProdutoInsert, validarProdutoUpdate, validarProdutoStatusUpdate }