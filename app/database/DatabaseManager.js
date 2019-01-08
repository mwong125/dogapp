
var mysql = require('mysql'); 

const _SITS_COLUMNS = ['id', 'title', 'year', 'month', 'date', 'hour', 'duration', 'owner', 'sitter'];

module.exports = class DatabaseManager {
    
    constructor(header='./header.js',
		connect=true) {
	this.header = require(header);
	this.dbInfo = this.header.dbInfo;
	this.dbTables = this.header.dbTables;
	this.knex = require('knex')({
	    client: 'mysql',
	    connection: this.dbInfo
	});
    }
    /*
     * Get methods
     */
    
    getAllSits() {
	var select_options;
	if (arguments.length == 0) {
	    select_options = "*";
	} else {
	    select_options = new Array();
	    for (var opt of arguments) {
		select_options.push(opt);
	    }
	}
	return new Promise((resObj, rejObj) => {
	    this.knex.from(this.dbTables.sits).select(select_options).then((rows) => {
		if (rows.length == 0) {
		    resObj(null);
		} else {
		    resObj(rows);
		}
	    }).catch((err) => { rejObj(err) });
	});
    }
    getSpecificSitByJson(jsonParams) {
	return new Promise((resObj, rejObj) => {
	    this.knex.from(this.dbTables.sits).select("*").where(jsonParams).then((rows) => {
		if (rows.length == 0) {
		    resObj(null);
		} else {
		    resObj(rows);
		}
		
	    }).catch((err) => { rejObj(err) });
	});
    }
    getSpecificSitBy(column, rel, value) {
	return new Promise((resObj, rejObj) => {
	    this.knex.from(this.dbTables.sits).select("*").where(column, rel, value).then((rows) => {
		if (rows.length == 0) {
                    resObj(null);
		} else {
                    resObj(rows);
                }
	    }).catch((err) => { rejObj(err) });
	});
    }
    createSit(id,
	      title,
	      year,
	      month,
	      date,
	      hour,
	      duration,
	      owner,
	      sitter) {
	var sitData = [{
	    id: id,
	    title: title,
	    year: year,
	    month: month,
	    date: date,
	    hour: hour,
	    duration: duration,
	    owner: owner,
	    sitter: sitter }];
	this.knex(this.dbTables.sits).insert(sitData).then(() => {console.log("successfuly inserted:"); console.log(sitData[0])});
    }
    createSits(sits_event_array) {
	this.knex(this.dbTables.sits).insert(sits_event_array).then(() => console.log("successfuly inserted " + sits_event_array.length + " sit events"));
    }
}
