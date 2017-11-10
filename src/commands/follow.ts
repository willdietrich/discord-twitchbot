import {Command, CommandMessage, CommandoClient} from 'discord.js-commando'

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
                'follow [twitch name]',
                'follow willeedee'
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

    run(msg: CommandMessage, args: FollowCommandArgs) {
        const streamerHandle = args.handle;
        // TODO process the add
        return msg.reply(`Added streamer ${streamerHandle}`)
    }
}
