import 'dotenv/config';
import { z } from 'zod'


const envSchema = z.object({

    SERVER_PORT: z.coerce.number().default(5050),

    AUTH_JWT: z.string(),

    DB_HOST: z.string(),
    DB_DATABASE: z.string(),
    DB_USER: z.string(),
    DB_PASS: z.string(),

    URL: z.string()

})

const envValidacao = envSchema.safeParse(process.env)

if (envValidacao.success == false) {

    console.log('Variável de ambiente inválida.', envValidacao.error.format())

    throw ('Variável de ambiente inválida.')

}


export const env = envValidacao.data