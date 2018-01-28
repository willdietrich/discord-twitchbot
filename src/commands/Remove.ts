import {Command, CommandMessage, CommandoClient} from 'discord.js-commando';
import {announceService} from "../services/AnnounceService";
import {streamerService} from "../services/StreamerService";
import {twitchService, TwitchUserResponse} from "../services/TwitchService";

interface RemoveCommandArgs {
    login: string;
}

export class Remove extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'remove',
            group: 'twitch',
            memberName: 'remove',
            description: 'Remove a streamer from the registry.',
            examples: [
                '!twitchbot remove [twitch name]',
                '!twitchbot remove 3v0luti0ns'
            ],
            args: [
                {
                    key: 'login',
                    prompt: 'streamer login',
                    type: 'string'
                }
            ]
        });
    }

    public async run(msg: CommandMessage, args: RemoveCommandArgs) {
        const displayName = args.login;
        streamerService.removeStreamer(displayName);

        return announceService.announceRemovedStreamer(displayName);
    }
}
