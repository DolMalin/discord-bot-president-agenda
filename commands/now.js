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
        .setDescription("En ce moment")
        .setColor('#0099ff')
        .setURL('https://github.com/DolMalin/')
        .setImage('https://pbs.twimg.com/profile_images/711916465977466881/KpslvShn_400x400.jpg')

    if (agenda.length >= 1) {
            let title = formatTimestamp(agenda[0].time)
            let snippet = agenda[0].content
            embed.addField(title, snippet)
    } else {
        embed.addField('RIEN',"Notre bon président ne fait rien en ce moment")

    }
    return embed
}

const messageSend = (message, agenda) => message.channel.send(agenda)

const now = message => {
    fetch(`${process.env.API_URL}current`)
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

const currentDay = () => new Intl.DateTimeFormat("fr-CA", {year: "numeric", month: "2-digit", day: "2-digit"}).format(Date.now())

const currentTime = () => new Date()

const currentMoment = () => {
    let minutes
    if (currentTime().getMinutes() < 10) {
        minutes = '0' + currentTime().getMinutes()
    } else(
        minutes = currentTime().getMinutes()
    ) 
    return `${currentDay()}-${currentTime().getHours()}-${minutes}`
}

const currentHour = () => currentTime().getHours()

const checkIfCurrentTimestampIsNow = timestamp => {
    if (timestamp === currentMoment()) {
        return true
    } else {
        return false
    }
}

const testNow = channel => {
    fetch(`${process.env.API_URL}current`)
    .then( res => {
        return res.json()
    })
    .then ( (data) => {
        if(checkIfCurrentTimestampIsNow(data[0].time)) {
            channel.send(embed(data))
        }
    })
    .catch (err => {
        console.log(err)
    })
}

module.exports = {
    now:now,
    testNow:testNow
}