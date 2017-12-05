import { CommandoClient } from 'discord.js-commando';
import * as path from 'path';
import {Server} from "./server";
import {Services} from "./services";
import {Commands} from "./commands";
import {Models} from "./models";

const settings: { [key: string]: string } = require('../settings.json');

export class TwitchBot {

    private client: CommandoClient = new CommandoClient({
        owner: "347853274352844803",
        commandPrefix: "!twitchbot"
    });

    private server: Server;
    private services: Services;

    public start(): void {
        const models = new Models();
        // TODO import services that utilize models and pass them to commands
        const commands = new Commands();

        this.client.registry
            .registerGroups([
                ['twitch', 'Twitch']
            ])
            .registerDefaults()
            .registerCommands(commands.commands);

        this.client.login(settings.token);

        // this.services = new Services(settings.secret);

        this.server = new Server(this.client);
    }
}
