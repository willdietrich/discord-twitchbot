import {Streamer} from "../models/Streamer";
import {announceService} from "./AnnounceService";
import {twitchService, TwitchStreamResponse, TwitchUserResponse} from "./TwitchService";
import * as Bluebird from 'bluebird';
import {Op} from "sequelize";

class StreamerService {

    public addStreamer(userInfo: TwitchUserResponse): Streamer {
        // TODO make sure we get a response
        let {id, login, display_name}  = userInfo;

        // TODO make sure we don't allow the same twitch ID to be added multiple times

        let newStreamer = new Streamer({
            twitchID: parseInt(id),
            login: login,
            displayName: display_name
        });
        newStreamer.save();

        return newStreamer;
    }

    public removeStreamer(displayName: string) {
        this.findStreamerByDisplayName(displayName)
            .then(streamer => streamer.destroy());
    }

    public findAllNotDeleted(): Bluebird<Array<Streamer>> {
        return Streamer.findAll();
    }

    public findStreamerByDisplayName(displayName: string): Bluebird<Streamer> {
        return Streamer.findOne({
            where: {
                displayName: displayName
            }
        });
    }

    public followedStreamersStatus(): Bluebird<Array<TwitchStreamResponse>> {
        return this.findAllNotDeleted()
            .then(streamers => {
                return twitchService.getStreamStatusForStreamers(streamers)
                    .then(streams => {
                        streams.forEach(stream => {
                            stream.streamer = streamers.find(streamer => streamer.twitchID === parseInt(stream.user_id))
                        });

                        return streams;
                    });
            });
    }
}

export const streamerService = new StreamerService();
