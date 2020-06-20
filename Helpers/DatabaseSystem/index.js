const quickdb = require('quick.db');

module.exports = async () => {
    function AddToArray(store,value){
        return new Promise( async (resolve, reject) => {
        quickdb.push(store, value)
        return resolve(true)
        });
    }
    function RemoveFromArray(store,value) {
        return new Promise( async (resolve, reject) => {
        let Info = await quickdb.fetch(store)
        for(var i=0; i < Info.length; i++) {
            if (Info[i] == value) {
                     Info.splice(i,1)
                    if (!Array.isArray(Info) || !Info.length) {
                        await db.delete(store)
                    return resolve(true)  
                    }
                    await db.set(store,Info)
                    return resolve(true)
            }
         } return reject(false)
        });
    }
    function AddNumber(store,toAdd){
        return new Promise( async (resolve, reject) => {
        let Info = await quickdb.fetch(store)
        if (Info != null) {
            let AddNum = await quickdb.add(store,toAdd)
            return resolve(true)
        } return reject(false)
    });
    }
    function SubtractNumber(store,toSubtract){
        return new Promise( async (resolve, reject) => {
        let Info = quickdb.fetch(store)
        if (Info != null) {
            let SubNum = quickdb.subtract(store.toSubtract)
            return resolve(true)
        } return reject(false)
    });
    }
    function ChangeString(store,value){
        return new Promise( async (resolve, reject) => {
        let Info = await quickdb.fetch(store)
        if (Info != null && (typeof Info) == "string" || "object") {
            let StringSet = await quickdb.set(store,value)
            return resolve(true)
        } return reject(false)
    });
    }
    function RemoveString(store){
        return new Promise( async (resolve, reject) => {
        let Info = await quickdb.fetch(store)
        if (Info != null && (typeof Info) == "string" || "object") {
            let Remove = quickdb.delete(store)
            return resolve(true)
        } return reject(false)
    });
    }
}