import {discordClientService} from "./DiscordClientService";
import {TwitchStreamResponse} from "./TwitchService";
import {URL} from "url";
import {Streamer} from "../models/Streamer";

class AnnounceService {
    private readonly twitchURLTemplate = "https://twitch.tv/";

    public announceStreamStatus(streamer: Streamer): void {
        let twitchURL = new URL(streamer.displayName, this.twitchURLTemplate);
        let message = `Streamer ${streamer.displayName} is online. Stream link: ${twitchURL.toString()}`;

        discordClientService.responseChannel.send(message);
    }
}

export const announceService = new AnnounceService();
