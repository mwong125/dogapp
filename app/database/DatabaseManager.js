
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
    getAllSitAccepts() { //getAllSitAccepts
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
            this.knex.from(this.dbTables.sits.accept).select(select_options).then((rows) => {
                if (rows.length == 0) {
                    resObj(null);
                } else {
                    resObj(rows);
                }
            }).catch((err) => { rejObj(err) });
        });
    }
    getAllSitOffers() {
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
	    this.knex.from(this.dbTables.sits.offer).select(select_options).then((rows) => {
		if (rows.length == 0) {
		    resObj(null);
		} else {
		    resObj(rows);
		}
	    }).catch((err) => { rejObj(err) });
	});
    }
    getAllSitRequests() {
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
            this.knex.from(this.dbTables.sits.request).select(select_options).then((rows) => {
                if (rows.length == 0) {
                    resObj(null);
                } else {
                    resObj(rows);
                }
            }).catch((err) => { rejObj(err) });
        });
    }
    getSpecificSitAcceptByJson(jsonParams) {
	return new Promise((resObj, rejObj) => {
	    this.knex.from(this.dbTables.sits.accept).select("*").where(jsonParams).then((rows) => {
		if (rows.length == 0) {
		    resObj(null);
		} else {
		    resObj(rows);
		}
		
	    }).catch((err) => { rejObj(err) });
	});
    }
    getSpecificSitRequestByJson(jsonParams) {
        return new Promise((resObj, rejObj) => {
            this.knex.from(this.dbTables.sits.request).select("*").where(jsonParams).then((rows) => {
                if (rows.length == 0) {
                    resObj(null);
                } else {
                    resObj(rows);
                }

            }).catch((err) => { rejObj(err) });
        });
    }
    getSpecificSitOfferByJson(jsonParams) {
        return new Promise((resObj, rejObj) => {
            this.knex.from(this.dbTables.sits.offer).select("*").where(jsonParams).then((rows) => {
                if (rows.length == 0) {
                    resObj(null);
                } else {
                    resObj(rows);
                }

            }).catch((err) => { rejObj(err) });
        });
    }
    getSpecificSitAcceptBy(column, rel, value) {
	return new Promise((resObj, rejObj) => {
	    this.knex.from(this.dbTables.sits.accepts).select("*").where(column, rel, value).then((rows) => {
		if (rows.length == 0) {
                    resObj(null);
		} else {
                    resObj(rows);
                }
	    }).catch((err) => { rejObj(err) });
	});
    }
    createSitAccept(id, title, year, month, date, hour, duration, owner, sitter, animal) {
	var sitData = [{id: id, title: title, year: year, month: month, date: date,
			hour: hour, duration: duration,  owner: owner, sitter: sitter, animal: animal}];
	this.knex(this.dbTables.sits.accept).insert(sitData).then(() => {
	    console.log("successfuly inserted sit accept:"); console.log(sitData[0])});
    }
    createSitRequest(id, title, year, month, date, hour, duration, owner, animal) {
	var sitData = [{id: id, title: title, year: year, month: month, date: date,
			hour: hour, duration: duration, owner: owner, animal: animal }];
        this.knex(this.dbTables.sits.request).insert(sitData).then(() => {
	    console.log("successfuly inserted sit request:"); console.log(sitData[0])});
    }
    createSitOffer(id, title, year, month, date, hour, duration, sitter, animal) {
        var sitData = [{id: id, title: title, year: year, month: month, date: date,
			hour: hour, duration: duration, sitter: sitter, animal: animal }];
        this.knex(this.dbTables.sits.request).insert(sitData).then(() => {
	    console.log("successfuly inserted sit offer:"); console.log(sitData[0])});
    }
    createSitAccepts(sitAcceptsArray) {
	this.knex(this.dbTables.sits.accept).insert(sitAcceptsArray).then(() => {
	    console.log("successfuly inserted " + sitAcceptsArray.length + " sit accepts") });
    }
    createSitRequests(sitRequestsArray) {
	this.knex(this.dbTables.sits.request).insert(sitRequestsArray).then(() => {
	    console.log("successfuly inserted " + sitRequestsArray.length + " sit requests") });
    }
    createSitOffers(sitOffersArray) {
	this.knex(this.dbTables.sits.offer).insert(sitOffersArray).then(() => {
	    console.log("successfuly inserted " + sitOffersArray.length + " sit offers") });
    }
}
