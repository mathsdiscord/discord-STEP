// STEP 1: 9 June 2020
// STEP 2: 15 June 2020
// STEP 3: 19 June 2020
// Results: 13 August 2020

const moment = require('moment')

function formatRemaining(days) {
  const remaining = days + 1
  const weeks = Math.floor(remaining/7)
  const shortDays = remaining % 7
  
  let result = `${weeks} weeks`
  if (shortDays !== 0) {
    result += `, ${shortDays} days`
  }
  
  return result
}

function daysRemaining() {
  const today = moment()
  
  const step_1 = moment('2020-06-09').diff(today, 'days')
  const step_2 = moment('2020-06-15').diff(today, 'days')
  const step_3 = moment('2020-06-19').diff(today, 'days')
  
  return {
    STEP_1: formatRemaining(step_1),
    STEP_2: formatRemaining(step_2),
    STEP_3: formatRemaining(step_3),
    RESULTS: moment('2020-08-13').diff(today, 'days'),
  }
  
}

module.exports = function(controller) {
  controller.hears(
    "remaining!",
    ["direct_mention", "mention", "ambient"],
    (bot, message) => {
      const args = message.text
        .split(/[ -\/]+/)
        .slice(1)
        .map(s => s.replace(/\D/g, ""))
        .filter(Boolean);
      
      
      
      if (message.user.id !== '659825835758452758') {
        const remaining = daysRemaining()
        
        const embed = new controller.RichEmbed()
          .setTitle('Time Remaining Until STEP :ghost: :scream:')
          .addField("STEP 1", `.....`, true)
          .addField("STEP 2", `${remaining.STEP_2}`, true)
          .addField("STEP 3", `${remaining.STEP_3}`, true)
          .setFooter(`Oh, and results are only ${remaining.RESULTS} days away... You should probably get off discord and start doing questions`)
          .setColor("#dd4156");
          // 
          // .addField("STEP 1", 'It\'s gone fam', true)
          // .addField("STEP 2", 'Yep still don\'t know', true)
          // .addField("STEP 3", 'No idea pal', true)
          // .setFooter(`Oh, and results are only... eh.... fuck`)

        
        // const embed = JSON.stringify(daysRemaining())
        
        // bot.reply(message, {
        //   files: [{
        //     attachment: paperUrl,
        //     name: `SPOILER_${year}-S${paper}-Q${question}.png`
        //   }]
        // })
        bot.reply(message, embed);
        
      }
    }
  );
};
