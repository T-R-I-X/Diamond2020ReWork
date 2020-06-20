//-- Activitys
const Active = [
    ['with Trix'],
    ['with Meex'],
    ['with Kermitov'],
    ['with Discord'],
    ['with Wumpus'],
    ['with Apis'],
    ['with Users'],
    ['with Money']
]


module.exports = {
    disabled:false,
    run: (client) => {
        client.logger.info(`Logged in as ${client.user.username}#${client.user.discriminator} ${client.user.id}`)
        client.user.setActivity('with Discord');

        setInterval(function(){
            let random = Math.floor(Math.random()*Active.length)
            let reply = Active[random]
            client.user.setActivity(reply)
        },7000)
    }
}