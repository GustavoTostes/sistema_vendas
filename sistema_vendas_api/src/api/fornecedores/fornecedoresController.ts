import { Request, Response } from "express";
import { FornecedoresServices } from "./fornecedoresServices";


async function getListaStatusFornecedor(req: Request, res: Response) {

    const fornecedoresServices = new FornecedoresServices
    const result = await fornecedoresServices.getListaStatusFornecedor()

    return res.status(200).json(result)

}

async function getFornecedores(req: Request, res: Response) {

    const fornecedoresServices = new FornecedoresServices
    const result = await fornecedoresServices.getFornecedores(req)

    return res.status(200).json(result)

}

async function criarFornecedor(req: Request, res: Response) {

    const fornecedoresServices = new FornecedoresServices
    const result = await fornecedoresServices.criarFornecedor(req)

    return res.status(200).json(result)

}

async function editarFornecedor(req: Request, res: Response) {

    const fornecedoresServices = new FornecedoresServices
    const result = await fornecedoresServices.editarFornecedor(req)

    return res.status(200).json(result)

}

async function alterarStatusFornecedor(req: Request, res: Response) {

    const fornecedoresServices = new FornecedoresServices
    const result = await fornecedoresServices.alterarStatusFornecedor(req)

    return res.status(200).json(result)

}

async function excluirFornecedor(req: Request, res: Response) {

    const fornecedoresServices = new FornecedoresServices
    const result = await fornecedoresServices.excluirFornecedor(req)

    return res.status(200).json(result)

}


export { getListaStatusFornecedor, getFornecedores, criarFornecedor, editarFornecedor, alterarStatusFornecedor, excluirFornecedor }