
let _eventId = 0;

module.exports = class SitEvent {
    constructor(id,
		title,
		year,
		month,
		day,
		owner,
		sitter,
		doggo) {
	
    }
    /*
     * static helper methods   
     */
    static fakeIdGen() {
	return _eventId++;
    }
    static getEmptySitEvent() {
	return ({
	    "id": SitEvent.fakeIdGen(),
	    "title": "",
	    "year": 0,
	    "month": 0,
	    "day": 0,
	    "owner": "",
	    "sitter": "",
	    "doggo": ""
	});
    }
    static sqlToJson(sqlResult) {
	let sitsArray = new Array();
	for (let rawSit of sqlResult) {
            sitsArray.push({
                id: rawSit.id,
                title: rawSit.title,
                year: rawSit.year,
                month: rawSit.month,
                date: rawSit.date,
                hour: rawSit.hour,
                duration: rawSit.duration,
                owner: rawSit.owner,
                sitter: rawSit.sitter,
		animal: rawSit.animal
	    });
	}
	return sitsArray;
    }
}
