import {CommandoClient} from "discord.js-commando";
import * as path from "path";

import {settingsService} from "./SettingsService";

class DiscordClientService {

    private client: CommandoClient = new CommandoClient({
        owner: settingsService.getValue("discord.client.owner"),
        commandPrefix: "!twitchbot"
    });

    constructor() {
        this.client.registry
            .registerGroups([
                ['twitch', 'Twitch']
            ])
            .registerDefaults()
            .registerCommandsIn(path.join(__dirname, 'commands'));
    }

    start() {
        this.client.login(settingsService.getValue('discord.client.token'));
    }

}

export const discordClientService = new DiscordClientService();
