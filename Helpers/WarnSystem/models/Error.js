class Warns_Error extends TypeError {

    constructor(err) {
        super()
        this.name = "Test errors"
        this.message = `${err}`
    }

}

//
//
//  This is really un needed
//
//

module.exports = Warns_Error;