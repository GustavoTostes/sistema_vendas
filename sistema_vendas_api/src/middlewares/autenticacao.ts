import { env } from '@/config/env';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import 'express-async-errors';


interface IPayload {

    id: number
    idPermissao: number
    corSistema: string

}

export async function autenticar(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.cookie?.split('auth=').join('bearer ')

    if (!authHeader) {

        return res.status(401).json('Autorização vazia.')
        
    }

    const [,token] = authHeader.split(' ')

    try {

        const { id, idPermissao, corSistema } = verify(token, env.AUTH_JWT) as IPayload

        req.id = id
        req.idPermissao = idPermissao
        req.corSistema = corSistema
        
        return next()

    } catch (error) {

        return res.status(401).json({

            message: 'Token inválido.' 
              
        })  

    }

}