const dbCreator = require('../models/DB')
const Data = require('../models/Data')

module.exports = async (config, params) => {
        if(!params.id) return

        let db = await dbCreator(config)

        let info = await db.fetch(params.id)
            
        if(!info) info = {
             warns: [],
             _id: Buffer.from(`${config.datebase.toLowerCase()}${config.table ? `_${config.table}` : ''}.${params.id}`).toString('base64')
        }
            
        if(!info._id) info._id = Buffer.from(`${config.datebase.toLowerCase()}${config.table ? `_${config.table}` : ''}.${params.id}`).toString('base64')

        await info.warns.push({
             id: info.warns.length + 1,
             reason: params.reason || "No reason",
             at: params.day ? typeof params.day == "string" ? Date.parse(params.day) : Date.now() : Date.now(),
             moderator: params.mod || "Diamond"
            })
            
        await db.set(params.id, info)

        let k = {
         db: "sqlite"
        }
        if(config.table) k.table = config.table

        return new Data(info, k, params.id)
	
}