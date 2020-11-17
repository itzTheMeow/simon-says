const http = require("http");
const express = require("express");
const app = express();
app.use(express.static("site"));
app.get("/", (request, response) => {
  console.log(Date.now() + " ping received!");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
/* create HTTP server (for keeping the bot online with uptimerobot) */

const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
/* create client and require packages */

const config = require("./config.json");
bot.prefix = config.prefix;
/* set config data */

bot.commands = new Discord.Collection();
bot.commandDescriptions = new Object();
bot.commandUsages = new Object();
bot.commandAliases = [];
bot.commandRequirements = new Object();
/* create command data objects */

fs.readdir("./cmds/", (err, files) => {
  if (err) throw err;

  let jsFiles = files.filter(f => f.split(".").pop() === "js");

  jsFiles.forEach(f => {
    let props = require(`./cmds/${f}`);
    bot.commands.set(props.help.name, props);
    bot.commandDescriptions[props.help.name] = props.help.description;
    bot.commandUsages[props.help.name] =
      "`" + bot.prefix + props.help.usage + "`";
    if (props.help.commandAliases.length >= 1)
      bot.commandAliases.push({
        for: props.help.name,
        aliases: props.help.commandAliases
      });
  });
  console.log(`Loaded ${jsFiles.length} commands!`);
});

bot.on("ready", () => {
  console.log(`Bot ${bot.user.username} is on!`);
  bot.user.setActivity("Simon Says", { type: "PLAYING" });
  bot.user.setStatus("online", null);

  bot.guild = bot.guilds.get('601190120749793290')
  bot.rolez = {
    admin: "601227042314518528",
    simon: "601192111148367903",
    bot: "601208267204722719",
    playing: "601190491886977034",
    disqualified: "601190513806278666"
  };
  bot.channelz = {
    gameplay: bot.channels.get("601190440959606804"),
    lobby: bot.channels.get("601190459993358337")
  };
});

bot.on("message", message => {
  if (message.author.bot) return;
  /*  ignore bots */
  if (message.content.startsWith(bot.prefix)) {
    /* if starts with prefix (tcc ) */
    let args = message.content
      .substring(bot.prefix.length)
      .trim()
      .split(/ +/g);
    /* get args */

    let cmd = bot.commands.get(args[0].toLowerCase());
    /* fetch command */

    if (!cmd) {
      let name;
      /* declare name variable */

      bot.commandAliases.forEach(a => {
        if (a.aliases.includes(args[0].toLowerCase())) name = a.for;
        /* see if the command used is an alias of another one */
      });

      cmd = bot.commands.get(name);
      /* get the command using the name */
    }
    if (!cmd) return
    /* command not found message */

    cmd.run(bot, message, args);
    /* run the command */
  }
});

bot.on('guildMemberAdd', member => {
  if(member.guild.id !== bot.guild.id) return
  member.addRole(bot.rolez.disqualified)
  bot.channelz.lobby.send("YEET, " + member + " is playing!")
})

bot.login(process.env.TOKEN);
