import {streamerService} from '../services/StreamerService';
import {Command, CommandMessage, CommandoClient} from 'discord.js-commando';
import {announceService} from "../services/AnnounceService";


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
        return streamerService.findAllNotDeleted()
            .then(streamers => {
                return announceService.announceFollowedStreamers(streamers);
            });
    }
}
