const BASE_URL = "https://stepdatabase.maths.org/database/db";


module.exports = function(controller) {
  controller.hears(
    "q!",
    ["direct_mention", "mention", "ambient"],
    (bot, message) => {
      const args = message.text
        .split(/[ -\/]+/)
        .slice(1)
        .map(s => s.replace(/\D/g, ""))
        .filter(Boolean);
      
      if (args.length === 3 && message.user.id !== '659825835758452758') {
        const year = args[0].slice(-2);
        const question = args[2];
        const paper = args[1];
        
        const fullYear = (parseInt(year) < 50 ? "20" : "19") + year;
        const paperUrl = `${BASE_URL}/${year}/${year}-S${paper}-Q${question}.png`;
        
        const embed = new controller.RichEmbed()
          .addField("Year", fullYear, true)
          .addField("Paper", `STEP ${paper}`, true)
          .addField("Question", `Q${question}`, true)
          .setColor("#dd4156");
          // .setImage(paperUrl);
        
        // const img = new controller.Attachment(paperUrl, `${year}-S${paper}-Q${question}`)
        
        bot.reply(message, {
          files: [{
            attachment: paperUrl,
            name: `SPOILER_${year}-S${paper}-Q${question}.png`
          }]
        })
        bot.reply(message, embed);
        
      } else if (message.user.id !== '659825835758452758') {
        bot.reply(message, 'I didn\'t understand that! To get me to post a STEP question, make sure your request is in the format `q! 18-S3-Q10`')
      }
    }
  );
};
