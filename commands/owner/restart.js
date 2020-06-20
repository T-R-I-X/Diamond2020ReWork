const { RichEmbed } = require('discord.js');
const commando = require('discord.js-commando');

module.exports = class RestartCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'restart',
      aliases: ['restartbot'],
      group: 'owner',
      memberName: 'restart',
      description: 'Owner only command.',
      examples: ['restart'],
      guildOnly: false,
    });
  }

  async run(msg) {
    let user = msg.author

    const MessageFuncs = require('../../Helpers/UtilsFunctions/MessageFunctions')

    const botconfig = require('../../configs/botconfig.json')

    const Checks = require('../../Helpers/UtilsFunctions/CheckFunctions').CheckBotPerms(user.id)

    if (Checks == true) {
    // Setting up the embed
    const Embed = new RichEmbed()
    .setDescription(`:white_check_mark: restarted Diamond`)
    .setColor('BLUE')
    .setTimestamp();
    
    this.client.destroy().then(ok => {
        this.client.login(botconfig.bot.token)
        return msg.embed(Embed)        
    })
                
    } else {
        let Embed = MessageFuncs.CreateCommandWarning('you are not a developer!')
        return msg.embed(Embed)
    }
  }
};