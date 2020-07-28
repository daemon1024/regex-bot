import { Bot } from "https://deno.land/x/telegram@v0.0.2/mod.ts";

const bot = new Bot(Deno.env.get("BOT_TOKEN") as string);

bot.on("message", (ctx) => {
  if (ctx.message?.text === "/start") {
    ctx.reply(
      "Hi, I am regex bot at your service. Reply to any message with the syntax \n\n/<regex string>/<replacement string",
    );
  }
  if (
    ctx.message?.text?.match(
      /\/((?![*+?])(?:[^\r\n\[/\\]|\\.|\[(?:[^\r\n\]\\]|\\.)*\])+)\//,
    ) && ctx?.message.reply_to_message?.text
  ) {
    let msg = ctx.message?.text.split("/");
    if (msg[0] == "s" && msg.length > 2) {
      try {
        let re = msg[3] ? new RegExp(msg[1], msg[3]) : new RegExp(msg[1]);
        let str = ctx?.message.reply_to_message?.text;
        let newtext = str.replace(re, msg[2]);
        newtext == str ? null : ctx.reply(newtext);
      } catch (error) {
        console.log(error);
        ctx.reply("Something went wrong");
      }
    }
  }
});

bot.launch();
