import { Request, Response } from "express";
import { PerfilServices } from "./perfilServices";


async function getDadosUsuario(req: Request, res: Response) {

    const perfilServices = new PerfilServices()
    const result = await perfilServices.getDadosUsuario(req)

    return res.status(200).json(result)

}

async function editarPerfil(req: Request, res: Response) {

    const perfilServices = new PerfilServices()
    const result = await perfilServices.editarPerfil(req)

    return res.status(200).json(result)

}

async function excluirConta(req: Request, res: Response) {

    const perfilServices = new PerfilServices()
    const result = await perfilServices.excluirConta(req)

    return res.status(200).json(result)

}


export { getDadosUsuario, editarPerfil, excluirConta }