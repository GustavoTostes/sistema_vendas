import { Knex } from 'knex';

declare module 'knex/types/tables' {

    export interface Tables {

        apoio_fornecedor_status: Fornecedor_Status
        apoio_pedido_status: Pedido_Status
        apoio_permissao: Permissao
        apoio_produto_status: Produto_Status
        fornecedores: Fornecedor
        modelos_email: Modelos_email
        pedidos: Pedido
        pedidos_itens: Pedido_Itens
        produtos: Produto
        usuarios: Usuario

    }

}