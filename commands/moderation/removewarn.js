const { RichEmbed } = require('discord.js');
const commando = require('discord.js-commando');

module.exports = class RemoveWarnCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'removewarn',
      aliases: ['rwarn'],
      group: 'moderation',
      memberName: 'removewarn',
      description: 'Removes a warn from a user.',
      examples: ['removewarn @randomuser warnid', 'rwarn @randomuser warnid'],
      guildOnly: false,
      args: [
        {
          key: 'member',
          label: 'user',
          prompt: 'What user are you trying to remove the warn from?',
          type: 'member'
        },
        {
          key: 'warnid',
          label: 'warnid',
          prompt: 'What is the warnid?',
          type:'string'
        }
      ]
    });
  }

  async run(msg, args) {
    const member = args.member;
    const user = member.user;
    const warnid = args.warnid;

    const warns = this.client.warnsystem

    const removeWarn = await warns.Delete(user.id, warnid);

    if (removeWarn != false) {
    // Setting up the embed
    const Embed = new RichEmbed()
    .setDescription(`:white_check_mark: removed warn \`${warnid}\``)
    .setColor('BLUE')
    .setTimestamp();

    return msg.embed(Embed);
    } else {
        return msg.reply('Warn not found!')
    }
  }
};