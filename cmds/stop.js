const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (
    !message.member.roles.cache.has(bot.config.roles.admin) &&
    !message.member.roles.cache.has(bot.config.roles.simon)
  )
    return;

  let limit = 500;
  let pr = new Promise(async (resolve, reject) => {
    const sum_messages = [];
    let last_id;

    while (true) {
      const options = { limit: 100 };
      if (last_id) {
        options.before = last_id;
      }

      const messages = await bot.guild.channels.cache
        .get(bot.config.channels.gameplay)
        .fetchMessages(options);
      if (!messages.last()) {
        resolve(sum_messages);
        break;
      }
      sum_messages.push(...messages.array());
      last_id = messages.last().id;

      if (messages.size != 100 || sum_messages >= limit) {
        resolve(sum_messages);
        break;
      }
    }
  });
  pr.then((msgs) => {
    msgs.forEach((m) => {
      m.delete();
    });
  });

  bot.guild.members.forEach((m) => {
    if (m.roles.has(bot.config.roles.bot) || m.roles.has(bot.config.roles.simon)) return;
    m.roles.add(bot.config.roles.disqualified);
    m.roles.add(bot.config.roles.playing);
    m.setNickname(m.user.username);
  });

  bot.guild.channels.cache.get(bot.config.channels.lobby).send("The game is over!");
};
module.exports.help = {
  name: "stop",
  description: "Stop the game.",
  usage: "stop",
  commandAliases: ["end"],
};
