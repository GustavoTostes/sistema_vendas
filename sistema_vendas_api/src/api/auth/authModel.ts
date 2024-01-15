import { z } from 'zod';


function validarLogin(usuarioLogin : object) {

    const loginSchema = z.object({

        email: z.string({ invalid_type_error: 'Informe o e-mail.' }).email('Informe um e-mail válido'),
        senha: z.string({ invalid_type_error: 'Informe a senha.' })

    })

    return loginSchema.parse(usuarioLogin)
    
}

function validarCadastro(usuarioCadastro: object) {

    const cadastroSchema = z.object({

        nome: z.string({ invalid_type_error: 'Informe o nome.' }),
        cpf: z.string({ invalid_type_error: 'Informe o CPF.' }).min(11, 'O CPF deve conter 11 dígitos.'),
        email: z.string({ invalid_type_error: 'Informe o e-mail.' }).email('Informe um e-mail válido'),
        senha: z.string({ invalid_type_error: 'Informe a senha.' }).min(8, 'A senha deve conter ao menos 8 caracteres.'),
        senhaConfirma: z.string({ invalid_type_error: 'Confirme a senha.' })

    })

    return cadastroSchema.parse(usuarioCadastro)

}

function validarEmailRecuperacao(usuario: object) {

    const emailSchema = z.object({

        email: z.string({ invalid_type_error: 'Informe o e-mail.' }).email('Informe um e-mail válido.')

    })

    return emailSchema.parse(usuario)

}

function validarAlteracaoSenha(bodySenha: object) {

    const senhaSchema = z.object({

        novaSenha: z.string({ invalid_type_error: 'Informe a senha.' }).min(8, 'A senha deve conter ao menos 8 caracteres.'),
        novaSenhaConfirmar: z.string({ invalid_type_error: 'Confirme a senha.' }),
        keyUsuario: z.string({ invalid_type_error: 'Informe o código do usuário' })

    })

    return senhaSchema.parse(bodySenha)

}


export { validarLogin, validarCadastro, validarEmailRecuperacao, validarAlteracaoSenha }