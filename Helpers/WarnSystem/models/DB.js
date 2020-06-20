var wait = ms => new Promise((r, j)=>setTimeout(r, ms))

module.exports = async (config) => {
    let DB = require('quick.db')
    let db;

    if(config.table) {

        return new DB.table(Buffer.from(config.table).toString('base64').split('=').join('_'))

    } else {

        return DB

    }
}