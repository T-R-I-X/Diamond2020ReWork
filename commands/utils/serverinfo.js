const { RichEmbed } = require('discord.js');
const commando = require('discord.js-commando');

module.exports = class ServerInfoCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'serverinfo',
      aliases: [],
      group: 'utils',
      memberName: 'serverinfo',
      description: 'Gets information about the current server.',
      examples: ['serverinfo'],
      guildOnly: false
    });
  }

  async run(msg, args) {
    const guild = msg.guild

    // Setting up the embed
    const Embed = new RichEmbed()
    .setDescription(`**${guild.name}** ID: ${guild.id}`)
    .addField(`**▶ Server details**`,`‎‏‏‎ ‎‎`)
    .addField(`• Member Count:`,`${guild.members.size - guild.members.filter(m => m.user.bot).size}`,true)
    .addField(`• Bot Count:`,`${guild.members.filter(m => m.user.bot).size}`,true)
    .addField(`• Channel Count:`,`${guild.channels.filter(ch => ch.type != 'category').size}`,true)
    .addField(`• Verification:`,`${checkVerification(guild)}`,true)
    .addField(`• Boosters:`,`${guild.premiumSubscriptionCount}`,true)
    .addField(`• Partnered:`,`${checkPartnered(guild)}`,true)
    .addField(`• Boost Level:`,`${getBoostLevel(guild)}`,true)
    .addField(`• Large Guild:`,`${checkLarge(guild)}`,true)
    .addField(`• Banner Url:`,`${getBanner(guild)}`,true)
    .addField(`• Roles:`, `${guild.roles.filter(role => role.name != '@everyone').map(roles => `<@&${roles.id}>` ).join(' ')}`)
    .setColor('BLUE')
    .setTimestamp()
    .setThumbnail(guild.iconURL); 

    return msg.embed(Embed);
  }
};


function checkPartnered(guild){
    let info;
    if(guild.partnered == true) {
        info = "Yes"
    } else {
        info = "No"
    }
    return info
}

function checkVerification(guild){
    let info;
    let vernum = guild.verificationLevel

    let verarray = ["None","Low","Medium","High","Highest"]

    return verarray[vernum]
}

function getBoostLevel(guild){
    let level;
    let boostnum = guild.premiumSubscriptionCount
    if (boostnum <= 1) boostnum = 0
    if (boostnum >= 2) boostnum = 1
    if (boostnum >= 15) boostnum = 2
    if (boostnum >= 30) boostnum = 3
    
    let levelarray = ["No level","Level 1","Level 2","Level 3"]
    return levelarray[boostnum]
}

function getBanner(guild) {
    let banner;
    let bannerinfo = guild.bannerURL
    if (bannerinfo != null) {
        banner = `[Here](${bannerinfo})`
    } else {
        banner = "None"
    }
    return banner
}

function checkLarge(guild){
    let info;
    if(guild.large == true){
        info = "Yes; 250 or more members"
    } else {
        info = "No; less than 250 members"
    }
    return info
}