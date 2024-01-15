import { Request, Response } from 'express';
import { UsuariosServices } from './usuariosServices';


async function getUsuarios(req: Request, res: Response) {

    const usuariosServices = new UsuariosServices()
    const result = await usuariosServices.getUsuarios(req)

    return res.status(200).json(result)

}

async function editarUsuario(req: Request, res: Response) {

    const usuariosServices = new UsuariosServices()
    const result = await usuariosServices.editarUsuario(req)

    return res.status(200).json(result)

}

async function criarUsuario(req: Request, res: Response) {

    const usuariosServices = new UsuariosServices()
    const result = await usuariosServices.criarUsuario(req)

    return res.status(200).json(result)

}

async function excluirUsuario(req: Request, res: Response) {

    const usuariosServices = new UsuariosServices()
    const result = await usuariosServices.excluirUsuario(req)

    return res.status(200).json(result)

}

async function getListaPermissoes(req: Request, res: Response) {

    const usuariosServices = new UsuariosServices()
    const result = await usuariosServices.getListaPermissoes()

    return res.status(200).json(result)

}


export { getUsuarios, editarUsuario, criarUsuario, excluirUsuario, getListaPermissoes }