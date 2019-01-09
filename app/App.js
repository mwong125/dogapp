
var DatabaseManager = require('./database/DatabaseManager.js');
var ScheduleManager = require('./model/ScheduleManager.js');
var SitEvent = require('./model/SitEvent.js');

const _SIT_TYPES = Object.freeze({
    0: "accept",
    1: "offer",
    2: "request",
    3: "all"
});

module.exports = class App {
    
    constructor(appSchedule=new ScheduleManager(3),
		appDatabase=new DatabaseManager()) {
	this._appSchedule = appSchedule;
	this._appDatabase = appDatabase;
    }
    get appSchedule() {
	return this._appSchedule;
    }
    get appDatabase() {
	return this._appDatabase;
    }
    getFullSchedule() {
	return this._appSchedule.getFullSchedule();
    }
    getWeekFormat() {
	return this._appSchedule.getWeekFormat();
    }
    getMonthFormat() {
	return this._appSchedule.getMonthFormat();
    }
    getAllSitsAllTypes() {
	return new Promise((resObj, rejObj) => {
	    this._appDatabase.getAllSitAccepts().then((getAcceptResult) => {
		this._appDatabase.getAllSitOffers().then((getOfferResult) => {
		    this._appDatabase.getAllSitRequests().then((getRequestResult) => {
			resObj({ "accept": (getAcceptResult == null) ? false : SitEvent.sqlToJson(getAcceptResult),
				 "offer": (getOfferResult == null) ? false : SitEvent.sqlToJson(getOfferResult),
				 "request": (getRequestResult == null) ? false : SitEvent.sqlToJson(getRequestResult) });
		    }).catch((err) => {
			console.log(err);
			rejObj("a database error has occured");
		    });
		}).catch((err) => {
		    console.log(err);
                    rejObj("a database error has occured");
		});
	    }).catch((err) => {
		console.log(err);
                rejObj("a database error has occured");
	    });
	});
    }
    
    getAllSits(sitType) {
	return new Promise((resObj,rejObj) => {
	    if (sitType == _SIT_TYPES[0]) { 
		this._appDatabase.getAllSitAccepts().then((getResult) => {
		    if (getResult == null) {
			resObj(false);
		    } else {
			resObj(SitEvent.sqlToJson(getResult));
		    }
		}).catch((err) => {
		    console.log(err);
		    rejObj("a database error has occured");
		});
	    } else if (sitType == _SIT_TYPES[1]) {
		this._appDatabase.getAllSitOffers().then((getResult) => {
                    if (getResult == null) {
                        resObj(false);
                    } else {
                        resObj(SitEvent.sqlToJson(getResult));
                    }
                }).catch((err) => {
                    console.log(err);
                    rejObj("a database error has occured");
                });
	    } else if (sitType == _SIT_TYPES[2]) {
		this._appDatabase.getAllSitRequests().then((getResult) => {
                    if (getResult == null) {
                        resObj(false);
                    } else {
                        resObj(SitEvent.sqlToJson(getResult));
                    }
                }).catch((err) => {
                    console.log(err);
                    rejObj("a database error has occured");
                });
	    } else {
		console.log("get request for unknown sit type");
		rejObj("a database error has occured");
	    }
	});
    }
    getSpecificSitByJsonAllTypes(jsonParams) {
        return new Promise((resObj, rejObj) => {
            this._appDatabase.getSpecificSitAcceptByJson(jsonParams).then((getAcceptResult) => {
                this._appDatabase.getSpecificSitOfferByJson(jsonParams).then((getOfferResult) => {
                    this._appDatabase.getSpecificSitRequestByJson(jsonParams).then((getRequestResult) => {
			console.log(getRequestResult);
			resObj({ "accept": (getAcceptResult == null) ? false : SitEvent.sqlToJson(getAcceptResult),
                                 "offer": (getOfferResult == null) ? false : SitEvent.sqlToJson(getOfferResult),
                                 "request": (getRequestResult == null) ? false : SitEvent.sqlToJson(getRequestResult) });
                    }).catch((err) => {
                        console.log(err);
                        rejObj("a database error has occured");
                    });
                }).catch((err) => {
                    console.log(err);
                    rejObj("a database error has occured");
                });
            }).catch((err) => {
                console.log(err);
                rejObj("a database error has occured");
            });
        });

    }
    getSpecificSitByJson(sitType, jsonParams) {
	return new Promise((resObj,rejObj) => {
            if (sitType == _SIT_TYPES[0]) {
                this._appDatabase.getSpecificSitAcceptByJson(jsonParams).then((getResult) => {
                    if (getResult == null) {
                        resObj(false);
                    } else {
                        resObj(SitEvent.sqlToJson(getResult));
                    }
                }).catch((err) => {
                    console.log(err);
                    rejObj("a database error has occured");
                });
            } else if (sitType == _SIT_TYPES[1]) {
                this._appDatabase.getSpecificSitAcceptByJson(jsonParams).then((getResult) => {
                    if (getResult == null) {
                        resObj(false);
                    } else {
                        resObj(SitEvent.sqlToJson(getResult));
                    }
                }).catch((err) => {
                    console.log(err);
                    rejObj("a database error has occured");
                });
            } else if (sitType == _SIT_TYPES[2]) {
                this._appDatabase.getSpecificSitOfferByJson().then((getResult) => {
                    if (getResult == null) {
                        resObj(false);
                    } else {
                        resObj(SitEvent.sqlToJson(getResult));
                    }
                }).catch((err) => {
                    console.log(err);
                    rejObj("a database error has occured");
                });
            } else {
                console.log("get request for unknown sit type");
                rejObj("a database error has occured");
            }
        });
    }
    getSpecificSitBy(column, rel, value) {
	return new Promise((resObj, rejObj) => {
	    this._appDatabase.getSpecificSitBy(column, rel, value).then((getResult) => {
                if (getResult == null) {
                    resObj(false);
                } else {
		    resObj(SitEvent.sqlToJson(getResult));
		}
            }).catch((err) => {
		console.log(err);
                rejObj("a database error has occured");
            });
	});
    }
    createSit(id, title, year, month, date, hour, duration, owner, sitter) {
	if (this._appSchedule.isValidDate(year, month, date)) {
	    let currentSits = [this._appDatabase.getSpecificSitBy('sitter', '=', owner),
			       this._appDatabase.getSpecificSitBy('owner', '=', owner)];
	    for (let userSits of currentSits) {
		if (userSits) {
		    for (var sitterSitEvent of sitterCurrentSits) {
			if (sitterSitEvent.year == year &&
			    sitterSitEvent.month == month &&
			    sitterSitEvent.date == date && (sitterSitEvent.hour == sitterSitEvent.hour ||
							    sitterSitEvent.hour + duration > hour ||
							    hour + duration > sitterSitEvent.hour
							   )) {
			    return false;
			}
		    }
		}
	    }
	    this._appDatabase.createSit(id, title, year, month, date, hour, duration, owner, sitter);
	    return true;
	} else {
	    return false;
	}	    
    }
    static monthToInt(month) {
	return ScheduleManager.monthToInt(month);
    }
}
