import {CommandoClient} from 'discord.js-commando';
import * as path from "path";

import {Server} from "./server";
import {sequelize} from "./sequelize";
import {settingsService} from "./services/SettingsService";

export class TwitchBot {

    private client: CommandoClient = new CommandoClient({
        owner: "347853274352844803",
        commandPrefix: "!twitchbot"
    });

    private server: Server;
    private sequelizeInst = sequelize;

    public start(): void {
        this.client.registry
            .registerGroups([
                ['twitch', 'Twitch']
            ])
            .registerDefaults()
            .registerCommandsIn(path.join(__dirname, 'commands'));

        this.client.login(settingsService.getValue('discord.client.token'));

        this.server = new Server(this.client);
    }
}
