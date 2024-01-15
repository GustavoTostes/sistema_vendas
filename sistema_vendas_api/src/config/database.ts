import knex from 'knex';
import { env } from './env';


export const dbVendas = knex({

    client: 'mysql',
    connection: {

        host : env.DB_HOST,
        database : env.DB_DATABASE,
        user : env.DB_USER,
        password : env.DB_PASS

    },
    migrations: {

        tableName: 'z_knex_migrations',
        directory: __dirname + '/migrations'
        
    }

});


dbVendas.migrate.latest();
// dbVendas.migrate.rollback();