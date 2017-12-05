import { CommandoClient } from 'discord.js-commando';
import * as path from 'path';
import {Server} from "./server";

const settings: { [key: string]: string } = require('../settings.json');

export class TwitchBot {

    private client: CommandoClient = new CommandoClient({
        owner: "347853274352844803",
        commandPrefix: "!twitchbot"
    });

    private server: Server;

    public start(): void {
        this.client.registry
            .registerGroups([
                ['twitch', 'Twitch']
            ])
            .registerDefaults()
            .registerCommandsIn(path.join(__dirname, 'commands'));

        this.client.login(settings.token);

        this.server = new Server(this.client);
    }
}
