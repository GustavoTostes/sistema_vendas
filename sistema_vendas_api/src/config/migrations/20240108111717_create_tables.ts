import { Knex } from "knex";
import { html } from '@/utils/templateEmailMigration'


export async function up(knex: Knex): Promise<void> {

    knex.schema.hasTable('apoio_fornecedor_status').then(function(exists) {

        if (!exists) {

            return knex.schema.createTable('apoio_fornecedor_status', function(table) {

                table.increments('id').primary()
                table.string('descricao', 45)
        
            }).then(() => {

                return knex('apoio_fornecedor_status').insert([

                    { id: 1, descricao: 'Ativo' },
                    { id: 2, descricao: 'Inativo' }

                ])

            })

        }

    });

    knex.schema.hasTable('apoio_pedido_status').then(function(exists) {

        if (!exists) {

            return knex.schema.createTable('apoio_pedido_status', function(table) {

                table.increments('id').primary()
                table.string('descricao', 45)
        
            }).then(() => {

                return knex('apoio_pedido_status').insert([

                    { id: 1, descricao: 'Criado' },
                    { id: 2, descricao: 'Editado' },
                    { id: 3, descricao: 'Finalizado' }

                ])

            })

        }

    });

    knex.schema.hasTable('apoio_permissao').then(function(exists) {

        if (!exists) {

            return knex.schema.createTable('apoio_permissao', function(table) {

                table.increments('id').primary()
                table.string('descricao', 45)
        
            }).then(() => {

                return knex('apoio_permissao').insert([

                    { id: 1, descricao: 'Administrador' },
                    { id: 2, descricao: 'Intermediário' },
                    { id: 3, descricao: 'Usuário' }

                ])

            })

        }

    });

    knex.schema.hasTable('apoio_produto_status').then(function(exists) {

        if (!exists) {

            return knex.schema.createTable('apoio_produto_status', function(table) {

                table.increments('id').primary()
                table.string('descricao', 45)
        
            }).then(() => {

                return knex('apoio_produto_status').insert([

                    { id: 1, descricao: 'Disponível' },
                    { id: 2, descricao: 'Indisponível' }

                ])

            })

        }

    });

    knex.schema.hasTable('modelos_email').then(function(exists) {

        if (!exists) {

            return knex.schema.createTable('modelos_email', function(table) {

                table.increments('id').primary()
                table.string('tipo', 255)
                table.text('html')
                table.string('nomeFoto', 255)
                table.string('caminhoFoto', 255)
                table.string('cid', 255)
        
            }).then(() => {

                return knex('modelos_email').insert({

                    tipo: 'recuperarSenha',
                    html: html,
                    nomeFoto: 'logo-flat.png',
                    caminhoFoto: 'src/assets/logo-flat.png',
                    cid: 'logo'


                })

            })

        }

    });

    knex.schema.hasTable('usuarios').then(function(exists) {

        if (!exists) {

            return knex.schema.createTable('usuarios', function(table) {

                table.increments('id').primary()
                table.string('email', 50)
                table.string('senha', 60)
                table.string('nome', 50)
                table.string('cpf', 11)
                table.integer('idPermissao')
                table.integer('idUsuarioInsert').nullable()
                table.dateTime('dataInsert')
                table.string('corSistema', 50)
                table.string('hash', 60)
        
            })

        }

    });

    knex.schema.hasTable('fornecedores').then(function(exists) {

        if (!exists) {

            return knex.schema.createTable('fornecedores', function(table) {

                table.increments('id').primary()
                table.string('cnpj', 14)
                table.string('nomeComercial', 50)
                table.string('email', 50)
                table.integer('status')
                table.integer('idUsuarioInsert')
        
            })

        }

    });

    knex.schema.hasTable('produtos').then(function(exists) {

        if (!exists) {

            return knex.schema.createTable('produtos', function(table) {

                table.increments('id').primary()
                table.string('descricao', 50)
                table.integer('idFornecedor')
                table.decimal('valor', 11, 2)
                table.dateTime('dataInsert')
                table.integer('status')
        
            })

        }

    });

    knex.schema.hasTable('pedidos').then(function(exists) {

        if (!exists) {

            return knex.schema.createTable('pedidos', function(table) {

                table.increments('id').primary()
                table.integer('idUsuarioInsert')
                table.string('nome', 50)
                table.integer('status')
                table.decimal('valor', 11, 2)
                table.dateTime('dataInsert')
        
            })

        }

    });

    knex.schema.hasTable('pedidos_itens').then(function(exists) {

        if (!exists) {

            return knex.schema.createTable('pedidos_itens', function(table) {

                table.increments('id').primary()
                table.integer('idPedido')
                table.integer('idProduto')
                table.integer('quantidade')
                table.string('descricao', 45)
                table.decimal('valorUnitario', 11, 2)
        
            })

        }

    });

}

export async function down(knex: Knex): Promise<void> {

    return knex.schema.dropTableIfExists('apoio_fornecedor_status')
    .dropTableIfExists('apoio_pedido_status')
    .dropTableIfExists('apoio_permissao')
    .dropTableIfExists('apoio_produto_status')
    .dropTableIfExists('modelos_email')
    .dropTableIfExists('usuarios')
    .dropTableIfExists('fornecedores')
    .dropTableIfExists('produtos')
    .dropTableIfExists('pedidos')
    .dropTableIfExists('pedidos_itens')

}
