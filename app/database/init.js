
/*required node plugin and personal header for db info */
var header = require('./header.js');
var mysql = require('mysql');

/*
  grab database name and delete field from info before creating database
  so it doesnt try to connect to wmuc database that isnt there yet
*/
var dbInfo = header.dbInfo;
var db_name = dbInfo.database;
delete dbInfo.database;

var dbTables = header.dbTables;

/* connects to localhost sql server using username:password -> root:root */
var connection = mysql.createConnection(dbInfo);
console.log("Connected to local sql server: @" + dbInfo.host + "\nCreating database: " + db_name);
connection.connect(function(err) {
    if (err) throw err;
    let db_query = "create database " + db_name;
    /* create database wmuc and catch creation error
       all other queries are dependent on this being successful
       so all table creatin queries are nested under the error throw
    */
    connection.query(db_query, function (err, result) {
	if (err) throw err;
	console.log("Successfuly created db");
	console.log("Creating tables in " + db_name  + ": ");
	console.log(" -sits: (id varchar(256), title varchar(200), year int, month int, date int, hour int, duration int, owner varchar(256), sitter varchar(256), primary key(id, owner, sitter))")
	let table_query0 = "use " + db_name + "; ";
	/* all the table creations are independent so
	   if one fails it will not affect the other, dont
	   need to nest, 'use wmuc' query should never fail
	*/
	let table_query1 = "create table sits(id varchar(256), title varchar(200), year int, month int, date int, hour int, duration int, owner varchar(256), sitter varchar(256)); ";
	connection.query(table_query0);
	connection.query(table_query1, (err, result) => { if (err) throw err });
	console.log("Successfully created all tables");
	connection.end();
    });
});
