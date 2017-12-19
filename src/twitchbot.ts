import {Server} from './server';
import {sequelize} from './sequelize';
import {discordClientService} from './services/DiscordClientService';

export class TwitchBot {

    private server: Server;
    private sequelizeInst = sequelize;

    public start(): void {
        discordClientService.start();

        this.server = new Server();
        this.server.start();

        // let streamers = streamerService.findAll().value();
        // twitchService.subscribeStreamersForNotifications(streamers);
    }
}
