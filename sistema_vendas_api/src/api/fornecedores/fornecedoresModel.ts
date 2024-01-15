import { z } from "zod"


interface IFiltro {

    nome?: string
    cnpj?: string
    email?: string
    status?: string

}

function validarFornecedorInsert(fornecedor: object) {

    const fornecedorSchema = z.object({

        nomeComercial: z.string({ invalid_type_error: 'Informe o nome comercial.' }),
        cnpj: z.string({ invalid_type_error: 'Informe o CNPJ.' }).min(14, 'O CNPJ deve conter 14 dígitos.'),
        email: z.string({ invalid_type_error: 'Informe o e-mail.' }).email('Informe um e-mail válido'),
        idUsuarioInsert: z.number({ invalid_type_error: 'Informe o responsável pela criação do registro.' })

    })

    return fornecedorSchema.parse(fornecedor)

}

function validarFornecedorUpdate(fornecedor: object) {

    const fornecedorSchema = z.object({

        id: z.number({ invalid_type_error: 'Informe o id.' }),
        nomeComercial: z.string({ invalid_type_error: 'Informe o nome comercial.' }),
        email: z.string({ invalid_type_error: 'Informe o e-mail.' }).email('Informe um e-mail válido'),

    })

    return fornecedorSchema.parse(fornecedor)

}

function validarFornecedorUpdateStatus(statusBody: object) {

    const statusSchema = z.object({

        idFornecedor: z.number({ invalid_type_error: 'Informe o id do fornecedor.' }),
        status: z.number({ invalid_type_error: 'Informe o status.' }),
        mensagem: z.string({ invalid_type_error: 'Informe a mensagem de alteração.' })

    })

    return statusSchema.parse(statusBody)

}


export { IFiltro, validarFornecedorInsert, validarFornecedorUpdate, validarFornecedorUpdateStatus }