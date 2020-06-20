const dbCreator = require('../models/DB')
const Data = require('../models/Data')
const timeObj = require('./parse')

module.exports = async (config, id) => {
        let db = await dbCreator(config)

        if(!id) return

        let info;
        let k = {}

        k.db = "sqlite"
        info = await db.fetch(id)

        if(!info) return []
        
        for(var i=0; i < info.warns.length; i++) {
            let t = info.warns[i].at
            delete info.warns[i].at
            info.warns[i].ago = timeObj(Date.now() - t)
        }
        if(config.table) k.table = config.table
        return new Data(info, k, id)

}