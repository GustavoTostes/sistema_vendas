import { z } from "zod";


function validarUsuarioUpdate(usuario: object) {

    const usuarioSchema = z.object({

        id: z.number({ invalid_type_error: 'Informe o ID.' }),
        nome: z.string({ invalid_type_error: 'Informe o nome.' }),
        cpf: z.string({ invalid_type_error: 'Informe o CPF.' }).min(11, 'O CPF deve conter 11 dígitos.'),
        email: z.string({ invalid_type_error: 'Informe o e-mail.' }).email('Informe um e-mail válido'),
        corSistema: z.string({ invalid_type_error: 'Informe a cor do sistema.' }),
        senhaAtualConfirmada: z.string({ invalid_type_error: 'Confirme sua senha atual.' })

    })

    return usuarioSchema.parse(usuario)

}


export { validarUsuarioUpdate }