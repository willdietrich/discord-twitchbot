import {Command, CommandMessage, CommandoClient} from 'discord.js-commando';
import {discordClientService} from "../services/DiscordClientService";
import {streamerService} from "../services/StreamerService";
import {twitchService, TwitchUserResponse} from "../services/TwitchService";

interface FollowCommandArgs {
    login: string;
}

export class Follow extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'follow',
            group: 'twitch',
            memberName: 'follow',
            description: 'Add a streamer to the registry.',
            examples: [
                '!twitchbot follow [twitch name]',
                '!twitchbot follow willeedee'
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

    public async run(msg: CommandMessage, args: FollowCommandArgs) {
        const streamerLogin = args.login;

        let response = `Unable to add streamer with login: ${streamerLogin}`;

        let newStreamer = await twitchService.getUserInformation(streamerLogin)
            .then((userInfo: TwitchUserResponse) => {
                return streamerService.addStreamer(userInfo);
            });

        response = `Added streamer: ${newStreamer.displayName}`;

        return discordClientService.responseChannel.send(response);
    }
}
