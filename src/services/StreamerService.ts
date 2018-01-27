import {Streamer} from "../models/Streamer";
import {announceService} from "./AnnounceService";
import {twitchService, TwitchStreamResponse, TwitchUserResponse} from "./TwitchService";
import * as Bluebird from 'bluebird';
import {Op} from "sequelize";

class StreamerService {

    public addStreamer(userInfo: TwitchUserResponse): Streamer {
        let {id, login, display_name}  = userInfo;

        let newStreamer = new Streamer({
            twitchID: parseInt(id),
            login: login,
            displayName: display_name
        });
        newStreamer.save();

        return newStreamer;
    }

    public findAll(): Bluebird<Array<Streamer>> {
        return Streamer.findAll();
    }

    public findAllNotDeleted(): Bluebird<Array<Streamer>>{
        return Streamer.findAll({
            where: {
                deletedAt: {
                    [Op.eq]: null
                }
            }
        })
    }

    public announceSavedStreamers() {
        this.findAllNotDeleted().then(streamers => {
            twitchService.getStreamStatusForStreamers(streamers)
                .then(streams => {
                    let streamStatusWithStreamers = streams.map(stream => streamers.find(streamer => streamer.twitchID === parseInt(stream.user_id)));
                    streamStatusWithStreamers.forEach(stream => announceService.announceStreamStatus(stream));
                });
        });
    }
}

export const streamerService = new StreamerService();
