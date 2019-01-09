
const dbInfo = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "pupup",
}

const dbTables = {
    sits: {
	accept: "sit_accepts",
	offer: "sit_offers",
	request: "sit_requests"
    }
}

module.exports = {
    dbInfo: dbInfo,
    dbTables: dbTables
};
