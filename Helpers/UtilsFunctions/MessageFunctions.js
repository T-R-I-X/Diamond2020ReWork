const { RichEmbed } = require('discord.js')

module.exports = {

    CreateCommandWarning: function(content) {
        const Embed = new RichEmbed()
        .setColor('RED')
        .setTimestamp()
        .setDescription(`:no_entry: ${content}`);
        return Embed 
    },

    ConsoleLogWarn: function(content) {
        console.log(`WARNING: ${content}`)
    }
}