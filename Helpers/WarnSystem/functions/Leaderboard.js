const dbCreator = require('../models/DB')
const timeObj = require('./parse')
module.exports = async (config, params) => {
  //
  //
  //
  // This part is still a work in progress, the next github post I might have it done.
  //
  //
  //
        let db = await dbCreator(config)

        let array;

        array = db.all()
        let temp = []
          for(var date of array) temp.push({
              ID: date.ID,
              data: JSON.parse(date.data)
          })
        array = temp;

        for(var i=0; i < array.length; i++) {
          for(var x=0; x < array[i].data.warns.length; x++) {
            let t = array[i].data.warns[x].at
            delete array[i].data.warns[x].at
            array[i].data.warns[x].ago = timeObj(Date.now() - t)
          }
        }
        if(params && params.sort) array = array.sort(params.sort)
        if(params && params.filter) array = array.filter(params.filter)

        return array
}