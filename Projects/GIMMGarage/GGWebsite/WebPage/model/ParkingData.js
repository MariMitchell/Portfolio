const connection = require('./connection');

async function getAllData(){
    let selectSql = 'SELECT * FROM SmartParking ';

    return await connection.query(selectSql);
}

module.exports = {
    getAllData
}