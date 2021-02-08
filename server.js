const Discord = require('discord.js')
const now = require('./commands/now')
const daily = require('./commands/daily')
const client = new Discord.Client()
require('dotenv').config()

client.on('ready', () => console.log('Logged in'))

client.on('message', message => {
    const prefix = process.env.DISCORD_PREFIX
    if (!message.content.startsWith(prefix) || message.author.bot) return
    const args = message.content.slice(prefix.length).trim().split(" ")
    const command = args.shift().toLowerCase()

    if (command === 'today') { daily(message) }

    if (command === 'now') { now.now(message) }

    if(command ==='salut') {
        console.log('salut')
        client.channels.cache.get('785454711347609610').send(`Text`)
    }

})

setInterval( () => {
    const channel = client.channels.cache.get(process.env.CHANNEL_ID)
    now.testNow(channel)
}, 1000 * 60)

client.login(process.env.TOKEN)