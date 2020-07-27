import { Bot } from "https://deno.land/x/telegram@v0.0.2/mod.ts";
import { serve } from "https://deno.land/std/http/server.ts";
import { parse } from "https://deno.land/std/flags/mod.ts";

const { args } = Deno;
const DEFAULT_PORT = 8000;
const argPort = parse(args).port;

serve({ port: argPort ? Number(argPort) : DEFAULT_PORT });

const bot = new Bot(Deno.env.get("BOT_TOKEN") as string);

bot.on("message", (ctx) => {
  if (ctx.message?.text === "/start") {
    ctx.replyWithMarkdownV2(
      "Hi, I am regex bot at your service. Reply to any message with the syntax ```/<regex string>/<replacement string```",
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
      let re = new RegExp(regex[1]);
      let newtext = ctx?.message.reply_to_message?.text?.replace(
        re,
        msg.slice(-1)[0],
      );
      ctx.reply(newtext ? newtext : "invalid regex");
    }
    console.log(regex);
  }
});

bot.launch();
