import {Request, Response} from "express";

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
    // TODO receive the response
};
