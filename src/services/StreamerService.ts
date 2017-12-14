import {Streamer} from "../models/Streamer";
import * as Bluebird from 'bluebird';

class StreamerService {

    public addStreamer(handle: String): Streamer {
        let newStreamer = new Streamer({name: handle});
        newStreamer.save();

        return newStreamer;
    }

    public findAll(): Bluebird<Array<Streamer>> {
        return Streamer.findAll();
    }
}

export const streamerService = new StreamerService();
