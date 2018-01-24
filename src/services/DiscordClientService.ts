import {Channel, Client, Guild, TextChannel} from 'discord.js';
import {CommandoClient} from 'discord.js-commando';
import * as path from 'path';

import {settingsService} from './SettingsService';

class DiscordClientService {

    private readonly _client: CommandoClient = new CommandoClient({
        owner: settingsService.getValue("discord.client.owner"),
        commandPrefix: "!twitchbot"
    });
    private readonly clientTokenID = settingsService.getValue('discord.client.token');
    private readonly guildID = settingsService.getValue("discord.client.guildID");
    private readonly responseChannelID = settingsService.getValue("discord.client.responseChannelID");

    constructor() {
        this.client.registry
            .registerGroups([
                ['twitch', 'Twitch']
            ])
            .registerDefaults()
            .registerCommandsIn(path.join(__dirname, '../commands'));
    }

    start() {
        this.client.login(this.clientTokenID);
    }

    getGuild(guildID: string): Guild {
        return this.client.guilds.get(guildID);
    }

    getChannel(channelID: string): TextChannel {
        return this.guild.channels.get(channelID) as TextChannel;
    }

    get client(): CommandoClient {
        return this._client;
    }

    get guild(): Guild {
        return this.getGuild(this.guildID);
    }

    get responseChannel(): TextChannel {
        return this.getChannel(this.responseChannelID);
    }

}

export const discordClientService = new DiscordClientService();
