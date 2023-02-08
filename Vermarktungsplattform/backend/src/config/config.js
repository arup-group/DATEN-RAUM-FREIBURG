/**
 * Environment configuration setup
 */

// requires
// logging
// console.log("loading config/config.js");
const lodash = require("lodash");

// module variables
const baseConfig = require("./config.json");
//logging
//console.log("base config " + baseConfig);
//console.log("./" + process.env.NODE_ENV + ".json");

//env config
const envconfig = require("./" + process.env.NODE_ENV + ".json");

//env config setup
const finalConfig = lodash.merge(baseConfig, envconfig);

//node port
if (typeof process.env.PORT !== "undefined") {
  finalConfig.node_port = process.env.PORT;
}

// as a best practice all global variables should be referenced via global. syntax and their names should always begin with g
global.gConfig = finalConfig;
