import { Router } from 'express';
import { alterarSenha, efetuarCadastro, efetuarLogin, removerCookie, enviarEmail } from './api/auth/authController';
import { autenticar } from './middlewares/autenticacao';
import { criarUsuario, excluirUsuario, getListaPermissoes, getUsuarios, editarUsuario } from './api/usuarios/usuariosController';
import { getPedidos, getListaStatusPedido, getListaProdutos, getProduto, calcularValorFinalProduto, calcularTotalPedido, criarPedido, excluirPedido, editarPedido, finalizarPedido } from './api/pedidos/pedidosController';
import { alterarStatusFornecedor, criarFornecedor, getFornecedores, getListaStatusFornecedor, editarFornecedor, excluirFornecedor } from './api/fornecedores/fornecedoresController';
import { alterarStatusProduto, criarProduto, excluirProduto, getListaFornecedores, getListaStatus, getProdutos, editarProduto } from './api/produtos/produtosController';
import { editarPerfil, excluirConta, getDadosUsuario } from './api/perfil/perfilController';
import 'express-async-errors';


const routes = Router()

// Auth

    routes.post('/login', efetuarLogin)
    routes.post('/cadastro', efetuarCadastro)
    routes.post('/enviar-email', enviarEmail)
    routes.put('/alterar-senha', alterarSenha)
    routes.post('/remover-cookie', removerCookie)

// ---------------------------------------------------------

// Usuários

    routes.get('/usuarios/:email/:nome/:cpf/:idPermissao/:idUsuarioLogado', autenticar, getUsuarios)
    routes.get('/usuarios/lista-permissoes', autenticar, getListaPermissoes)  
    routes.put('/usuarios', autenticar, editarUsuario)
    routes.post('/usuarios', autenticar, criarUsuario)
    routes.delete('/usuarios/:id', autenticar, excluirUsuario)

// ---------------------------------------------------------

// Pedidos

    routes.get('/pedidos/:nome/:status/:dataInicial/:dataFinal/:idUsuarioLogado', autenticar, getPedidos)
    routes.get('/pedidos/lista-status', autenticar, getListaStatusPedido)
    routes.get('/pedidos/lista-produtos', autenticar, getListaProdutos)
    routes.get('/pedidos/produto/:idProduto', autenticar, getProduto)
    routes.get('/pedidos/produto/valor-final/:quantidade/:valorUnitario', autenticar, calcularValorFinalProduto)
    routes.post('/pedidos/valor-total', autenticar, calcularTotalPedido)
    routes.post('/pedidos', autenticar, criarPedido)
    routes.delete('/pedidos/:idPedido', autenticar, excluirPedido)
    routes.put('/pedidos', autenticar, editarPedido)
    routes.put('/pedidos/finalizar/:idPedido', autenticar, finalizarPedido)


// ---------------------------------------------------------

// Fornecedores

    routes.get('/fornecedores/lista-status', autenticar, getListaStatusFornecedor)
    routes.get('/fornecedores', autenticar, getFornecedores)
    routes.post('/fornecedores', autenticar, criarFornecedor)
    routes.put('/fornecedores', autenticar, editarFornecedor)
    routes.put('/fornecedores/alterar-status', autenticar, alterarStatusFornecedor)
    routes.delete('/fornecedores/:idFornecedor', autenticar, excluirFornecedor)

// ---------------------------------------------------------

// Produtos

    routes.get('/produtos/lista-fornecedores', autenticar, getListaFornecedores)
    routes.get('/produtos/lista-status', autenticar, getListaStatus)
    routes.get('/produtos/:descricao/:idFornecedor/:status/:dataIni/:dataFim', autenticar, getProdutos)
    routes.post('/produtos', autenticar, criarProduto)
    routes.put('/produtos', autenticar, editarProduto)
    routes.delete('/produtos/:idProduto', autenticar, excluirProduto)
    routes.put('/produtos/alterar-status', autenticar, alterarStatusProduto)

// ---------------------------------------------------------

// Perfil

    routes.get('/perfil/:idUsuario', autenticar, getDadosUsuario)
    routes.put('/perfil', autenticar, editarPerfil)
    routes.delete('/perfil/:idUsuario/:senhaAtualConfirmada', autenticar, excluirConta)

// ---------------------------------------------------------


export { routes }