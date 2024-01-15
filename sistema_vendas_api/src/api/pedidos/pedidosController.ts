import { Request, Response } from "express";
import { PedidosServices } from "./pedidosServices";


async function getPedidos(req: Request, res: Response) {

    const pedidosServices = new PedidosServices()
    const result = await pedidosServices.getPedidos(req)

    return res.status(200).json(result)

}

async function getListaStatusPedido(req: Request, res: Response) {

    const pedidosServices = new PedidosServices()
    const result = await pedidosServices.getListaStatusPedido()

    return res.status(200).json(result)

}

async function getListaProdutos(req: Request, res: Response) {
    
    const pedidosServices = new PedidosServices()
    const result = await pedidosServices.getListaProdutos()

    return res.status(200).json(result)

}

async function getProduto(req: Request, res: Response) {
    
    const pedidosServices = new PedidosServices()
    const result = await pedidosServices.getProduto(req)

    return res.status(200).json(result)

}

function calcularValorFinalProduto(req: Request, res: Response) {
    
    const pedidosServices = new PedidosServices()
    const result = pedidosServices.calcularValorFinalProduto(req)

    return res.status(200).json(result)

}

function calcularTotalPedido(req: Request, res: Response) {
    
    const pedidosServices = new PedidosServices()
    const result = pedidosServices.calcularTotalPedido(req)

    return res.status(200).json(result)

}

async function criarPedido(req: Request, res: Response) {
    
    const pedidosServices = new PedidosServices()
    const result = await pedidosServices.criarPedido(req)

    return res.status(200).json(result)

}

async function excluirPedido(req: Request, res: Response) {
    
    const pedidosServices = new PedidosServices()
    const result = await pedidosServices.excluirPedido(req)

    return res.status(200).json(result)

}

async function editarPedido(req: Request, res: Response) {

    const pedidosServices = new PedidosServices()
    const  result = await pedidosServices.editarPedido(req)

    return res.status(200).json(result)

}

async function finalizarPedido(req: Request, res: Response) {

    const pedidosServices = new PedidosServices()
    const  result = await pedidosServices.finalizarPedido(req)

    return res.status(200).json(result)

}


export { getPedidos, getListaStatusPedido, getListaProdutos, getProduto, calcularValorFinalProduto, calcularTotalPedido, criarPedido, excluirPedido, editarPedido, finalizarPedido }