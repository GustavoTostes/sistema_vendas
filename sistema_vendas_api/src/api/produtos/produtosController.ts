import { Request, Response } from "express";
import { ProdutosServices } from "./produtosServices";


async function getListaFornecedores(req: Request, res: Response) {

    const produtosServices = new ProdutosServices()
    const result = await produtosServices.getListaFornecedores()

    return res.status(200).json(result)

}

async function getListaStatus(req: Request, res: Response) {

    const produtosServices = new ProdutosServices()
    const result = await produtosServices.getListaStatus()

    return res.status(200).json(result)

}

async function getProdutos(req: Request, res: Response) {

    const produtosServices = new ProdutosServices()
    const result = await produtosServices.getProdutos(req)

    return res.status(200).json(result)

}

async function criarProduto(req: Request, res: Response) {

    const produtosServices = new ProdutosServices()
    const result = await produtosServices.criarProduto(req)

    return res.status(200).json(result)

}

async function editarProduto(req: Request, res: Response) {

    const produtosServices = new ProdutosServices()
    const result = await produtosServices.editarProduto(req)

    return res.status(200).json(result)

}

async function excluirProduto(req: Request, res: Response) {

    const produtosServices = new ProdutosServices()
    const result = await produtosServices.excluirProduto(req)

    return res.status(200).json(result)

}

async function alterarStatusProduto(req: Request, res: Response) {

    const produtosServices = new ProdutosServices()
    const result = await produtosServices.alterarStatusProduto(req)

    return res.status(200).json(result)

}


export { getListaFornecedores, getListaStatus, getProdutos, criarProduto, editarProduto, excluirProduto, alterarStatusProduto }