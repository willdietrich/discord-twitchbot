define(["require", "exports", "discord.js-commando"], function (require, exports, discord_js_commando_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TwitchBot {
        start() {
            this.client = new discord_js_commando_1.CommandoClient({
                owner: "347853274352844803",
                commandPrefix: "!twitchbot"
            });
        }
    }
    exports.TwitchBot = TwitchBot;
});
