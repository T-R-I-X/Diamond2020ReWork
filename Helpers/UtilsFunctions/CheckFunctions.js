const botconfig = require('../../configs/botconfig.json');

module.exports = {

    CheckBotPerms: function(id) {
        if(botconfig.bot.owners.includes(id)) return true

        if(botconfig.bot.developers.includes(id)) return true

        return false
    }
}