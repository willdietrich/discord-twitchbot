import {Streamer} from "../models/Streamer";
import * as Bluebird from 'bluebird';
import {TwitchUserResponse} from "./TwitchService";

class StreamerService {

    public addStreamer(userInfo: TwitchUserResponse): Streamer {
        let newStreamer = new Streamer({
            twitchID: parseInt(userInfo.id),
            login: userInfo.login,
            displayName: userInfo.display_name
        });
        newStreamer.save();

        return newStreamer;
    }

    public findAll(): Bluebird<Array<Streamer>> {
        return Streamer.findAll();
    }
}

export const streamerService = new StreamerService();
