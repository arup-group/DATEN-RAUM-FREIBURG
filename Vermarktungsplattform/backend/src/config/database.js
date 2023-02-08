"use strict";

/**
 *  Database configuration setup
 */
const { Pool, Client } = require("pg");

//logging
//console.log("loading config/database.js");
//console.log("config ", global.gConfig);
const DB_MODE = "production";

//local connection settings
const localConnection = {
  host: global.gConfig.database_config.server,
  port: 5432,
  user: global.gConfig.database_config.user,
  password: global.gConfig.database_config.password,
  database: global.gConfig.database_config.database,
};

//connection pool setup
const pool = new Pool({
  host: global.gConfig.database_config.server,
  user: global.gConfig.database_config.user,
  database: global.gConfig.database_config.database,
  password: global.gConfig.database_config.password,
})
  .connect()
  .then((pool) => {
    //logging
    // console.log(
    //   `Connected to database: ${global.gConfig.database_config.database}`.cyan
    //     .underline
    // );
    //console.log(pool);
    return pool;
  })
  .catch((error) =>
    console.log(
      `Error: Failed to connect to database: ${error.message}`.red.underline
        .bold
    )
  );

//client connection
const client = new Client(localConnection);
client.connect();

module.exports = { pool, client };
