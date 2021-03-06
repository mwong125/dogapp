
var NodeCalendar = require('node-calendar');

/* Schedule
 * for now the limits of the schedule will extend for rest of the month plus next month
 */

const _DAYS = Object.freeze({
    0: "Monday",
    1: "Tuesday",
    2: "Wednesday",
    3: "Thursday",
    4: "Friday",
    5: "Saturday",
    6: "Sunday"
});

const _MONTHS = Object.freeze({
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
});

module.exports = class ScheduleManager {
    
    constructor(schedule_length=2, 
		raw_date=new Date()
	       ) {
	this._raw_date = raw_date;
	this._current_year = raw_date.getFullYear(); // 2019
	this._current_month = raw_date.getMonth(); //0-11
	this._current_day = raw_date.getDay(); //0-6
	this._current_date = raw_date.getDate(); //1-31
	this._schedule_length = schedule_length; 
	NodeCalendar.setlocale('en_US');
    
	/* build the main schedule json object */
	var year_lap = 0;
	var month_lap = 0;
	this._schedule = new Array(schedule_length).fill().map((_,i) => {
	    if (this._current_month + i + 1 > 11) {
		year_lap++;
		month_lap += 11;
	    }
	    var mr = NodeCalendar.monthrange(this._current_year + year_lap, this._current_month + i + 1 - month_lap);
	    var start_date = (i == 0) ? this._current_date : 1;
	    return ({
		"dates": new Array(mr[1] - start_date + 1).fill().map((_,j) => {
		    return({ "date": start_date + j,
			     "day": NodeCalendar.weekday(this._current_year + year_lap, this._current_month + i + 1 - month_lap, start_date + j)
			   });
		}),
		"month": ScheduleManager.intToMonth(this._current_month + i - month_lap),
		"year": this._current_year + year_lap
	    });
	});
    }
    get current_year() {
	return this._current_year();
    }
    set current_year(year) {
	this._current_year = year;
    }
    get current_month() {
	return this._current_month;
    }
    set current_month(month) {
	this._current_month = month ; 
    }
    get current_day() {
	return this._current_day;
    }
    set current_day(day) {
	this._current_day = day;
    }
    updateCurrentTime(raw_date=new Date()) {
	this._raw_date = raw_date;
	this.current_year = raw_date.getFullYear();
	this.current_month = raw_date.getMonth();
	this.current_day = raw_date.getDay();
    }
    isValidDate(year, month, date) {
	for (var scheduleMonth of this._schedule) {
	    for (var scheduleDate of scheduleMonth.dates) {
		if (year == scheduleMonth.year && month == scheduleMonth && date == scheduleDate) { return true }
	    }
	}
	return false;
    }
    getFullSchedule() {
	return this._schedule;
    }
    getWeekFormat() {
	return ((new Array(7)).fill().map((_, i) => _DAYS[i]));
    }
    getMonthFormat() {
	let monthFormatArray = new Array();
	for (var month_num=0; month_num < this._schedule_length; month_num++) {
	    monthFormatArray.push((new NodeCalendar.Calendar().monthdayscalendar(this._schedule[month_num].year, month_num+1)));
	}
	return monthFormatArray;
    }
    /*
      static helper functions
    */
    static intToDay(day) {
	return _DAYS[day];
    }
    static intToMonth(month) {
	return _MONTHS[month];
    }
    static monthToInt(month) {
	for (var m in _MONTHS) {
	    if (_MONTHS[m] == month) return m; 
	}
    }
}
