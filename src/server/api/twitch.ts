import {Request, Response} from 'express';

import {discordClientService} from '../../services/DiscordClientService'
import {announceService} from "../../services/AnnounceService";
import {TwitchStreamResponse} from "../../services/TwitchService";
import {streamerService} from "../../services/StreamerService";

/**
 * GET /twitchbot/api/stream-status
 * Twitch callback for when a streamer goes online.
 */
export let getStreamStatus = (req: Request, res: Response) => {
    let challenge = req.query['hub.challenge'];
    console.log("Received request: " + JSON.stringify(req.query));
    res.send(challenge);
};

/**
 * POST /twitchbot/api/stream-status
 * Twitch callback for when a streamer goes online.
 */
export let postStreamStatus = (req: Request, res: Response) => {
    let streamStatus: Array<TwitchStreamResponse> = req.body['data'];
    console.log("Received notification: " + JSON.stringify(req.body));
    streamerService.getStreamersForStreamStatus(streamStatus)
        .then(streams => announceService.announceStreamsStatus(streams));
    res.send();
};
