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
    )
  ) {
    let msg = ctx.message?.text.split("/");
    let regex = ctx.message?.text?.match(
      /\/((?![*+?])(?:[^\r\n\[/\\]|\\.|\[(?:[^\r\n\]\\]|\\.)*\])+)\//,
    );
    if (regex) {
      let re = new RegExp(regex[1], "g");
      let newtext = ctx?.message.reply_to_message?.text?.replaceAll(
        re,
        msg.slice(-1)[0],
      );
      ctx.reply(newtext ? newtext : "Something went wrong.");
    }
    console.log(regex);
  }
});

bot.launch();
