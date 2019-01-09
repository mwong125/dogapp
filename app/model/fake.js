
var Faker = require('faker');
var DatabaseManager = require('../database/DatabaseManager.js');

var entry_num = 250

var appDB = new DatabaseManager();
var sitAcceptsArray = new Array();
var sitOffersArray = new Array();
var sitRequestsArray = new Array();

let animals = ['Cat', 'Dog', 'Rabbit', 'Guinea Pig'];
let animals_offer = ['home', 'drop-off', 'any'];

for (var index=1; index<=entry_num; index++) {
    sitAcceptsArray.push({
	id: Faker.random.alphaNumeric(256),
	title: Faker.lorem.words(),
	year: 2019,
	month: Faker.random.number(2),
	date: Faker.random.number(27) + 1,
	hour: Faker.random.number(23),
	duration: Faker.random.number(4) + 1,
	owner: Faker.name.firstName(),
	sitter: Faker.name.firstName(),
	animal: Faker.random.arrayElement(animals)
    });
    sitOffersArray.push({
	id: Faker.random.alphaNumeric(256),
	title: Faker.lorem.words(),
        year: 2019,
	month: Faker.random.number(2),
        date: Faker.random.number(27) + 1,
        hour: Faker.random.number(23),
        duration: Faker.random.number(4) + 1,
	sitter: Faker.name.firstName(),
        animal: Faker.random.arrayElement(animals_offer)
    });
    sitRequestsArray.push({
	id: Faker.random.alphaNumeric(256),
	title: Faker.lorem.words(),
        year: 2019,
	month: Faker.random.number(2),
	date: Faker.random.number(27) + 1,
	hour: Faker.random.number(23),
	duration: Faker.random.number(4) + 1,
	owner: Faker.name.firstName(),
	animal: Faker.random.arrayElement(animals)
    });
}
appDB.createSitAccepts(sitAcceptsArray);
appDB.createSitOffers(sitOffersArray);
appDB.createSitRequests(sitRequestsArray);

