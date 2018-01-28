import {Server} from './server';
import {sequelize} from './sequelize';
import {discordClientService} from './services/DiscordClientService';
import {streamerService} from "./services/StreamerService";
import {twitchService} from "./services/TwitchService";
import {announceService} from "./services/AnnounceService";

export class TwitchBot {

    private server: Server;
    private sequelizeInst = sequelize;

    public start(): void {
        discordClientService.start()
            .then(status => {
                streamerService.followedStreamersStatus()
                    .then(streams => {
                        announceService.announceStreamsStatus(streams);
                    });
            });

        this.server = new Server();
        this.server.start();
        // twitchService.subscribeStreamersForNotifications(streamers);
    }
}
