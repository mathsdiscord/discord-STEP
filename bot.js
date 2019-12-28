require('dotenv').config();
const Discord = require('discord.js');
const step = require('./step')

const bot = new Discord.Client();
bot.login(process.env.TOKEN);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    // Check for the STEP trigger
    if (msg.content.toLowerCase().startsWith('step')) {

        const arguments = msg.content
            .split(' ')
            .slice(1)
            .map(s => s.replace(/\D/g,''))
            .filter(Boolean)

        if (arguments.length === 3) {
            const year = arguments[0].slice(-2)
            const question = arguments[2]
            const paper = arguments[1]

            q = new step.Question(year, paper, question)

            msg.channel.send(q.toString(), {
                file: q.toImage()
            }).catch(e => {
                msg.channel.send(`I couldn't find that question. Make sure your request is in the format \n\`\`\`step 2017 S2 Q3\`\`\``)
            })
        }
    } else if (msg.content.startsWith('!kick')) {
        if (msg.mentions.users.size) {
            const taggedUser = msg.mentions.users.first();
            msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
        } else {
            msg.reply('Please tag a valid user!');
        }
    }
});