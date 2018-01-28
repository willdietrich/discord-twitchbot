import {Command, CommandMessage, CommandoClient} from 'discord.js-commando';
import {announceService} from "../services/AnnounceService";
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

        return twitchService.getUserInformation(streamerLogin)
            .then((userInfo: TwitchUserResponse) => {
                let newStreamer = streamerService.addStreamer(userInfo);

                return announceService.announceNewFollow(newStreamer);
            });
    }
}
