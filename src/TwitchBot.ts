import { CommandoClient } from "discord.js-commando";


export class TwitchBot {

    private client: CommandoClient;

    public start(): void {
        this.client = new CommandoClient({
            owner: "347853274352844803",
            commandPrefix: "!twitchbot"
        });
    }

}
