const dbCreator = require('../models/DB')

module.exports = async (config, id, warnid) => {
        let db = await dbCreator(config) 

        if(!id) return 

        let info = db.fetch(id)
           for(var i=0; i < info.warns.length; i++) {
                if (info.warns[i].id == warnid) {
                info.warns.splice(i,1)
                if (!Array.isArray(info.warns) || !info.warns.length) {
                 await db.delete(id)
                 return true    
                }
                await db.set(id,info)
                 return true  
                }
             } return false
}