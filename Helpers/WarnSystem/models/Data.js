const dbCreator = require('./DB')

class Data {
    constructor (data, datebase, id) {
      
        for(var key of Object.keys(data)) this[key] = data[key]
      
        Object.defineProperty(this, "id", { value: id })

        Object.defineProperty(this, "_datebase", { value: datebase })

    }

    async save() {

        let id = this.id

        let db = dbCreator(this._datebase)

         await db.set(id, this)
         return this

    }

}

module.exports = Data;