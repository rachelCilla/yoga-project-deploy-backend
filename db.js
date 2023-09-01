// module used in server.js

// from postgres documentation
// const { Pool } = require('pg');

const { Pool } = require("pg");

require("dotenv").config();

// how we are going to communicate with our postgres database

const pool = new Pool({
	user: process.env.USERNAME,
	password: process.env.PASSWORD,
	host: process.env.HOST,
	port: process.env.DBPORT,
	database: process.env.DATABASE,
});

{
	// INFO module.exports:
	//  a module is a file that contains code that can be loaded and used in other files in a Node.js application. T
	// the module obj is a special obj in node.js that repressents the current module
	// in this case, the module is db.js
	// exports property of the module obj is an obj that is used to export values from the module
	// pool obj is assigned to the exports property of the module obj
	//  this makes it available to other modules that require the db.js file module using require()
}

module.exports = pool;
