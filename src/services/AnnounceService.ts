import {Streamer} from "../models/Streamer";
import {discordClientService} from "./DiscordClientService";
import {URL} from "url";
import {Message} from "discord.js";
import {TwitchStreamResponse} from "./TwitchService";

class AnnounceService {
    private readonly twitchURLTemplate = "https://twitch.tv/";

    public announceNewFollow(newStreamer: Streamer): Promise<Message | Message[]> {
        let message = `Added streamer: ${newStreamer.displayName}`;

        return discordClientService.responseChannel.send(message);
    }

    public announceRemovedStreamer(displayName: string): Promise<Message | Message[]> {
        let message = `Removed streamer: ${displayName}`;

        return discordClientService.responseChannel.send(message);
    }

    public announceFollowedStreamers(streamers: Array<Streamer>): Promise<Message | Message[]> {
        let message = Array("Following streamers:");

        message = message.concat(streamers.map(streamer => {
            return`• ${streamer.displayName}`;
        }));

        return discordClientService.responseChannel.send(message.join('\n'));
    }

    public announceStreamsStatus(streams: Array<TwitchStreamResponse>): Promise<Message | Message[]> {
        if (streams.length > 0) {
            let messageComponents = Array("Streamers online:");
            messageComponents = messageComponents.concat(streams.map(stream => {
                let {streamer} = stream;
                let twitchURL = new URL(streamer.displayName, this.twitchURLTemplate);

                return `• ${streamer.displayName}. Stream Link: ${twitchURL.toString()}`;
            }));

            return discordClientService.responseChannel.send(messageComponents.join('\n'));
        } else {
            let message = "No followed streamers are online. Get started with twitchbot using !twitchbot help";

            return discordClientService.responseChannel.send(message);
        }
    }


    public announceStreamStatus(streamStatus: TwitchStreamResponse): Promise<Message | Message[]> {
        let {streamer} = streamStatus;
        let twitchURL = new URL(streamer.displayName, this.twitchURLTemplate);
        let message = `Streamer ${streamer.displayName} is online. Stream link: ${twitchURL.toString()}`;

        return discordClientService.responseChannel.send(message);
    }
}

export const announceService = new AnnounceService();
