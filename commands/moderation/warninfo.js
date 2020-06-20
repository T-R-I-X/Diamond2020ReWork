const { RichEmbed } = require('discord.js');
const commando = require('discord.js-commando');

module.exports = class WarnInfoCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'warninfo',
      aliases: ['userwarns','warns'],
      group: 'moderation',
      memberName: 'warninfo',
      description: 'Gets all the user warns.',
      examples: ['warninfo @randomuser', 'userwarns @randomuser'],
      guildOnly: false,
      args: [
        {
          key: 'member',
          label: 'user',
          prompt: 'What user are you trying to find?',
          type: 'member'
        }
      ]
    });
  }

  async run(msg, args) {
    const member = args.member;
    const user = member.user;

    const warns = this.client.warnsystem

    const getWarn = await warns.Get(user.id);

    if (getWarn != false) {
    // Setting up the embed
    const Embed = new RichEmbed()
    .addField(`**▶ User warns**`,`‎‏‏‎ ‎‎`)
    .addField(`‎‏‏‎ `, `${getWarn.warns.map(warn => `\`${warn.id}\`: **${warn.reason}**\n By <@${warn.moderator}>\n`).join('\n')}`)
    .setColor('BLUE')
    .setTimestamp()
    .setThumbnail(user.displayAvatarURL);

    return msg.embed(Embed);
    } else {
      const Embed = new RichEmbed()
      .addField(`**▶ User warns**`,`‎‏‏‎ ‎‎`)
      .addField(`‎‏‏‎ ‎‎`, `‎‏‏‎‎‏‏‎No warns on record‎‎`)
      .setColor('BLUE')
      .setTimestamp()
      .setThumbnail(user.displayAvatarURL);
        return msg.embed(Embed)
    }
  }
};