import { Request, Response } from 'express';
import { AuthServices } from './authServices';


async function efetuarLogin(req: Request, res: Response) {

    const authServices = new AuthServices()
    const result = await authServices.efetuarLogin(req)

    res.cookie('auth', result.token, { 
        
        httpOnly: true,
        path: "/",
        domain: "localhost",
        secure: false,
        sameSite: "lax",
        maxAge: 3600000
    
    })

    return res.status(200).json(result.payload)

}

async function efetuarCadastro(req: Request, res: Response) {

    const authServices = new AuthServices()
    const result = await authServices.efetuarCadastro(req)

    return res.status(200).json(result)

}

async function enviarEmail(req: Request, res: Response) {

    const authServices = new AuthServices()
    const result = await authServices.enviarEmail(req)

    return res.status(200).json(result)

}

async function alterarSenha(req: Request, res: Response) {

    const authServices = new AuthServices()
    const result = await authServices.alterarSenha(req)

    return res.status(200).json(result)

}

async function removerCookie(req: Request, res: Response) {

    res.clearCookie('auth')

    return res.status(200).json('Cookie removido')

}


export { efetuarLogin, efetuarCadastro, enviarEmail, alterarSenha, removerCookie }