import {Command, CommandMessage, CommandoClient} from 'discord.js-commando';
import {streamerService} from '../services/StreamerService';

export class List extends Command {
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
        streamerService.findAll();
        let streamers = await streamerService.findAll();

        let responseStr = "Following streamers:\n";
        streamers.forEach((streamer) => {
            let streamerName = streamer.name;
            responseStr += `• ${streamerName}\n`;
        });

        return msg.reply(responseStr);
    }
}
