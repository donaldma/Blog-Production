require('dotenv').config({silent: true})

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT,
      password : process.env.DB_PASSWORD,
      user     : process.env.DB_USER
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },
  
  production: {
    client: 'postgresql',
    connection: 'postgres://pmflzazfsbynxq:8465254505a26e9b389910a8fbfedfeb55e90c03912b84b504704810d27aa835@ec2-23-21-197-231.compute-1.amazonaws.com:5432/d16tcd4usnkjri'+ '?ssl=true',
    ssl: true,    
    pool: {
      min: 1,
      max: 20
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }

};
