
var Faker = require('faker');
var DatabaseManager = require('../database/DatabaseManager.js');

var entry_num = 100;

var appDB = new DatabaseManager();
var sit_event_array = new Array();

for (var index=1; index<=entry_num; index++) {
    sit_event_array.push({
	id: Faker.random.alphaNumeric(256),
	title: Faker.lorem.words(),
	year: 2019,
	month: Faker.random.number(1),
	date: Faker.random.number(27) + 1,
	hour: Faker.random.number(23),
	duration: Faker.random.number(2) + 1,
	owner: Faker.name.firstName(),
	sitter: Faker.name.firstName()
    });
}
appDB.createSits(sit_event_array);


console.log(sit_event_array);

