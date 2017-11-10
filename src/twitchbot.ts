import { CommandoClient } from 'discord.js-commando';
import * as path from 'path';

export class TwitchBot {

    private client: CommandoClient = new CommandoClient({
        owner: "347853274352844803",
        commandPrefix: "!twitchbot"
    });

    public start(): void {
        this.client.registry
            .registerGroups([
                ['twitch', 'Twitch']
            ])
            .registerDefaults()
            .registerCommandsIn(path.join(__dirname, 'commands'));
    }

}
