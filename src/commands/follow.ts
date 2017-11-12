import {Command, CommandMessage, CommandoClient} from 'discord.js-commando'
import { Models } from "../models";

let Streamer = Models.streamer;

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

    public async run(msg: CommandMessage, args: FollowCommandArgs) {
        const streamerHandle = args.handle;

        let response = `Unable to add streamer with handle ${streamerHandle}`;

        let streamerInst = Streamer.build({
            name: streamerHandle
        });

        console.log("Streamer: " + streamerInst.get({plain: true}).toString());

        await streamerInst.save()
            .then(() => response = `Added streamer: ${streamerHandle}`)
            .catch((err: any) => console.log("Encountered an error: " + err));

        return msg.reply(response)
    }
}
