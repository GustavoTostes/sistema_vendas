import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import { env } from './config/env';
import errorHandler from './errors/handler';


const app = express()


app.use(express.json())
app.use(cors({

    origin: env.URL,
    credentials: true

}))
app.use(routes)
app.use(errorHandler)


const porta = env.SERVER_PORT
app.listen(porta, () => {

    console.log(`Servidor ativo - porta ${porta}`)

})

