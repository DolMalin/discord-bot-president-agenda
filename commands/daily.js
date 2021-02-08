const fetch = require('node-fetch')
const Discord = require('discord.js')
require('dotenv').config()

const formatTimestamp = timestamp => {
    const arr = timestamp.split('-')
    return `${arr[3]}h${arr[4]}`
}

const embed = agenda => {
    let embed = new Discord.MessageEmbed()
        .setTitle('Que fait le président? 👑')
        .setDescription("Aujourd'hui")
        .setColor('#0099ff')
        .setURL('https://github.com/DolMalin/')
        .setImage('https://pbs.twimg.com/profile_images/711916465977466881/KpslvShn_400x400.jpg')


    if (agenda.length >= 1) {
        for (let i = 0; i < agenda.length; i++) {
            let title = formatTimestamp(agenda[i].time)
            let snippet = agenda[i].content
            embed.addField(title, snippet)
        }
    } else {
        embed.addField('RIEN',"Notre bon président n'a pour l'instant rien de prévu aujourd'hui")

    }
    return embed
}

const messageSend = (message, agenda) => message.channel.send(agenda)

const daily = (message) => {
    fetch(`${process.env.API_URL}day`)
    .then( res => {
        return res.json()
    })
    .then ( (data) => {
        messageSend(message, embed(data))
        console.log(data)
    })
    .catch (err => {
        console.log(err)
    })
}

// [{"time":"2021-02-08-17-40","content":"Se fait un petit caf oklm"}]
module.exports = daily