import {Request, Response} from "express";

/**
 * GET /api/streamer/online
 * Twitch callback for when a streamer goes online.
 */
export let getOnline = (req: Request, res: Response) => {
    res.render("api/streamer/online", {
        title: "streamers callback"
    })
};
