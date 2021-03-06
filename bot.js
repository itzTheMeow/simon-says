const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
/* create client and require packages */

const config = require("./config.json");
bot.prefix = config.prefix;
bot.config = config;

bot.commands = new Discord.Collection();
bot.commandDescriptions = new Object();
bot.commandUsages = new Object();
bot.commandAliases = [];
bot.commandRequirements = new Object();
/* create command data objects */

fs.readdir("./cmds/", (err, files) => {
  if (err) throw err;

  let jsFiles = files.filter((f) => f.split(".").pop() === "js");

  jsFiles.forEach((f) => {
    let props = require(`./cmds/${f}`);
    bot.commands.set(props.help.name, props);
    bot.commandDescriptions[props.help.name] = props.help.description;
    bot.commandUsages[props.help.name] = "`" + bot.prefix + props.help.usage + "`";
    if (props.help.commandAliases.length >= 1)
      bot.commandAliases.push({
        for: props.help.name,
        aliases: props.help.commandAliases,
      });
  });
  console.log(`Loaded ${jsFiles.length} commands!`);
});
/* load commands */

bot.on("ready", () => {
  console.log(`Bot ${bot.user.username} is on!`);
  bot.user.setPresence({ activity: { name: "Simon Says", type: "PLAYING" } });

  bot.guild = bot.guilds.get(bot.config.guild);
});

bot.on("message", (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith(bot.prefix)) {
    /* if starts with prefix */
    let args = message.content.substring(bot.prefix.length).trim().split(/ +/g);

    let cmd = bot.commands.get(args[0].toLowerCase());

    if (!cmd) {
      let name;

      bot.commandAliases.forEach((a) => {
        if (a.aliases.includes(args[0].toLowerCase())) name = a.for;
        /* see if the command used is an alias of another one */
      });

      cmd = bot.commands.get(name);
      /* get the command using the name */
    }
    if (!cmd) return;

    cmd.run(bot, message, args);
  }
});

bot.on("guildMemberAdd", (member) => {
  if (member.guild.id !== bot.guild.id) return;
  member.roles.add(bot.config.roles.disqualified);
  bot.guild.channels.get(bot.config.channels.lobby).send("YEET, " + member + " is playing!");
});

bot.login(bot.config.token);
