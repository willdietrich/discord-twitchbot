import {Command, CommandMessage, CommandoClient} from 'discord.js-commando'
import {streamerService} from "../services/StreamerService";

interface FollowCommandArgs {
    handle: string;
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
                    key: 'handle',
                    prompt: 'streamer handle',
                    type: 'string'
                }
            ]
        });
    }

    public async run(msg: CommandMessage, args: FollowCommandArgs) {
        const streamerHandle = args.handle;

        let response = `Unable to add streamer with handle ${streamerHandle}`;

        let newStreamer = streamerService.addStreamer(streamerHandle);
        response = `Added streamer: ${newStreamer.name}`;

        return msg.reply(response)
    }
}
