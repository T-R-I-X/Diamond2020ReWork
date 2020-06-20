const Warns_Error = require('./models/Error')
const timeObj = require('./functions/parse')
const dbCreator = require('./models/DB')

class Warns {

    constructor(options) {
        if(!options) return
        if(typeof options !== "object") return
        this.config = options
    }

    /**
     * Function Add
     * @param {Object} params (id, mod, reason)
     * @returns {Promise(<Data>)}
     */

    async Add(params) {

    	let Add = require('./functions/Add')

    	return new Promise(async (resolve, reject) => {

    		let value = await Add(this.config, params)

    		if(value) return resolve(value);
    		else return reject(new Warns_Error(`¯\_(ツ)_/¯`))

    	})

    }
    /**
     * Function Delete
     * @param {String} id The id of the user
     * @param {int} warnid The id of the users warn
     * @returns {Promise(<Boolean>)}
     */

    async Delete(id,warnid) {

    	let Delete = require('./functions/Delete')

    	return new Promise(async (resolve, reject) => {

    		let value = await Delete(this.config, id, warnid)

    		if(value) return resolve(value);
    		else return reject(new Warns_Error(`¯\_(ツ)_/¯`))

    	})

    }

    /**
     * Function Get
     * @param {String} id id of the user
     * @returns {Promise(<Data>)}
     */

    async Get(id) {

    	let Get = require('./functions/Get')

    	return new Promise(async (resolve, reject) => {

    		let value = await Get(this.config, id)

    		if(value) return resolve(value);
    		else return reject(new Warns_Error(`¯\_(ツ)_/¯`))

    	})

    }

    /**
     * Function Leaderboard (Still a work in progress)
     * @param {Object} params Params (filter, sort)
     * @returns {Promise(<Data>)}
     */

    async Leaderboard(params) {

    	let Leaderboard = require('./functions/Leaderboard')       

    	return new Promise(async (resolve, reject) => {

    		let value = await Leaderboard(this.config, params)

    		if(value) return resolve(value);
    		else return reject(new Warns_Error(`¯\_(ツ)_/¯`))

    	})

    }

}

module.exports = {
    Warns: Warns
}
