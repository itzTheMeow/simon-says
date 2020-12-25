const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.roles.cache.has(bot.config.roles.admin)) return;
  let mem = message.mentions.members.first();
  if (!mem) return message.channel.send("Mention a user to remove!");
  let reason = args.slice(2).join(" ") || "No reason provided.";

  try {
    await mem.send(`You have been removed from the game for **${reason}**.`);
  } catch (e) {}
  await mem.kick(reason);

  message.channel.send(`Removed **${mem.user.tag}** for *${reason}*.`);
  message.delete();
};
module.exports.help = {
  name: "remove",
  description: "Removes a user from the server.",
  usage: "remove [user]",
  commandAliases: ["kick"],
};
