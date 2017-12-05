import {Command, CommandMessage, CommandoClient} from 'discord.js-commando'
import { Models } from "../models";
import {Services} from "../services";

let Streamer = Models.streamer;

export default function(services: Services) {
    class List extends Command {
        constructor(client: CommandoClient) {
            super(client, {
                name: 'list',
                group: 'twitch',
                memberName: 'list',
                description: 'List all followed streamers.',
                examples: [
                    '!twitchbot list'
                ]
            });
        }

        public async run(msg: CommandMessage) {
            let streamers = await Streamer.findAll();

            let responseStr = "Following streamers:\n";
            streamers.forEach((streamer) => {
                let streamerName = streamer.get({simple: true}).name;
                responseStr += `• ${streamerName}\n`;
            });

            return msg.reply(responseStr);
        }
    }
}
