import { z } from 'zod';


interface IFiltro {

    email: string
    nome: string
    cpf: string
    idPermissao: string
    idUsuarioLogado: string

}

function validarUsuarioInsert(usuario: object) {

    const usuarioSchema = z.object({

        nome: z.string({ invalid_type_error: 'Informe o nome.' }),
        cpf: z.string({ invalid_type_error: 'Informe o CPF.' }).min(11, 'O CPF deve conter 11 dígitos.'),
        email: z.string({ invalid_type_error: 'Informe o e-mail.' }).email('Informe um e-mail válido'),
        idPermissao: z.number({ invalid_type_error: 'Informe a permissão.' }),
        senha: z.string({ invalid_type_error: 'Informe a senha.' }).min(8, 'A senha deve conter ao menos 8 caracteres.'),
        senhaConfirma: z.string({ invalid_type_error: 'Confirme a senha.' }),
        idUsuarioInsert: z.number({ invalid_type_error: 'Informe o responsável pelo cadastro.' })
        
    })

    return usuarioSchema.parse(usuario)

}

function validarUsuarioUpdate(usuario: object) {

    const usuarioSchema = z.object({

        id: z.number({ invalid_type_error: 'Informe o id.' }),
        nome: z.string({ invalid_type_error: 'Informe o nome.' }),
        idPermissao: z.number({ invalid_type_error: 'Informe a permissão.' })
        
    })

    return usuarioSchema.parse(usuario)

}


export { IFiltro, validarUsuarioInsert, validarUsuarioUpdate }