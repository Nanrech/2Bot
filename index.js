const Discord = require('discord.js')
const prefix = '.'
const client = new Discord.Client({
    allowedMentions:{
        parse:["users"],
        repliedUser: false
    },
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_PRESENCES",
        "GUILD_MEMBERS",
        "GUILD_MESSAGE_REACTIONS"
    ],
});

client.on("ready", () => {
    console.log(`I'm ready! Logged in as ${client.user.tag}!`);
    client.user.setActivity(
        "Hellcastle & Tylerrrr",
        {type: "WATCHING"}
        );
})

client.on('message', async message => {
    if (message.author.id == "399049916757966848" || message.author.id == "313350346724343809" || message.author.id == "291620843363106828") {
        if (message.mentions?.users?.first() != null) {
            if (message.content.includes("-")) {
                let msg = message.content.split("-")?.[1]?.split(" ")
                if (!isNaN(msg?.[0]) && parseInt(msg?.[0]) >= 1 && msg?.[0] != "") {
                    if (msg?.[1].toLowerCase() == "social" && msg?.[2].toLowerCase().startsWith("credit")) {
                        message.reply(new Discord.MessageEmbed()
                            .setColor("#FF0000")
                            .setDescription(`:rage: **${parseInt(msg?.[0])} Social Credit** has been deducted from <@${message.mentions?.users?.first().id}>!`)
                            .setTitle('Great Shame!'))
                    }
                }
            }
            if (message.content.includes("+")) {
                let msg = message.content.split("+")?.[1]?.split(" ")
                if (!isNaN(msg?.[0]) && parseInt(msg?.[0]) >= 1 && msg?.[0] != "") {
                    if (msg?.[1].toLowerCase() == "social" && msg?.[2].toLowerCase().startsWith("credit")) {
                        message.reply(new Discord.MessageEmbed()
                            .setColor("#00FF00")
                            .setDescription(`<:uwuangel:750761120377339955> **${parseInt(msg?.[0])} Social Credit** has been granted to <@${message.mentions?.users?.first().id}>!`)
                            .setTitle('Great Honor!'))
                    }
                }
            }
        }
    }
}
);

client.on("messageCreate", async message => {
    if (message.author.id == "399049916757966848" || message.author.id == "313350346724343809" || message.author.id == "291620843363106828" || message.author.id == "452954731162238987"){
        let msg = message.content.split("-")?.[1]?.split(" ")
        if (msg[1] != "social" || msg[2] != "credit" || msg[3]){
            return
        }
        if (message.mentions?.users?.first() != null){
            if (message.content.startsWith('-')){
                if (Number(msg[0] != NaN)){
                }
            }
        }
    }

});

client.login("")