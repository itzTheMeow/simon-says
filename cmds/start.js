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

      const messages = await bot.guild.channels
        .cache(bot.config.channels.lobby)
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
    if (m.roles.cache.has(bot.config.roles.bot) || m.roles.cache.has(bot.config.roles.simon))
      return;
    m.roles.remove(bot.config.roles.disqualified);
    m.roles.add(bot.config.roles.playing);
  });

  let invs = await bot.guild.fetchInvites();
  invs.forEach((i) => {
    i.delete();
  });

  bot.guild.channels.cache
    .get(bot.config.channels.gameplay)
    .send("[@everyone]\nWelcome to Simon Says!", {
      embed: {
        description:
          bot.guild.members.find((m) => m.roles.has(bot.config.roles.simon)) +
          " is Simon! There are **" +
          bot.guild.members.cache.filter(
            (m) => !m.roles.has(bot.config.roles.bot) && !m.roles.has(bot.config.roles.simon)
          ).size +
          "** people playing this time.",
        fields: [
          {
            name: "Rules",
            value:
              "You are NOT allowed to use lowercase L (l) and uppercase I (I) in `simon`. They are literally impossible to tell apart! Here are them next to eachother: Il",
          },
        ],
        color: 3092790,
      },
    });
};
module.exports.help = {
  name: "start",
  description: "Start the game.",
  usage: "start",
  commandAliases: ["play"],
};
