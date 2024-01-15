import { ErrorRequestHandler } from 'express';


const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
   
    if (error instanceof Error) {

        console.log(`Erro: ${error.message}`)
        console.log('')
        console.log('-------------------------------------')
        console.log('')

        if (error.message.length > 0) {

            return res.status(412).json(JSON.parse(error.message))

        } else return res.status(500).json('Falha no sistema, consulte o administrador.')

    } else {

        console.log(error)
        return res.status(400).json(error)

    }

}


export default errorHandler