const mysql = require('../lib/mysql');

const getAllTours = async () => {
    const statement = 'select * from tours;';
    const parameters = [];
    return await mysql.query(statement, parameters);
}

const getMatchesByTourName = async params => {
    //Left join could be a costly operation, the below query avoids join directly
    // filter matches based on tourId. It can be efficient more if  toudId and name have indexes.
    const statement = 'SELECT * FROM matches WHERE tourId = (SELECT id FROM tours WHERE name = ?)';
    const parameters = [ params.name ];
    return await mysql.query(statement, parameters);
}

module.exports = {
    getAllTours: getAllTours,
    getMatchesByTourName: getMatchesByTourName
}