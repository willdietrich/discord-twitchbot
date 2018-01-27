import {Channel, Client, Guild, TextChannel} from 'discord.js';
import {CommandoClient} from 'discord.js-commando';
import * as path from 'path';

import {settingsService} from './SettingsService';
import {TwitchStreamResponse} from "./TwitchService";

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

    public start() {
        this.client.login(this.clientTokenID);
    }

    public getGuild(guildID: string): Guild {
        return this.client.guilds.get(guildID);
    }

    public getChannel(channelID: string): TextChannel {
        return this.guild.channels.get(channelID) as TextChannel;
    }

    public broadcastStreamStatus(streamStatus: Array<TwitchStreamResponse>) {
        this.responseChannel.send()
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
