import {CommandoClient} from "discord.js-commando";
import * as express from "express";
import {Express} from "express";

import * as bodyParser from 'body-parser';

import * as twitchApi from "./api/twitch";

export class Server {

    private client: CommandoClient;
    private app: Express;

    public constructor(client: CommandoClient) {
        this.client = client;

        this.app = express();
        this.app.disable("x-powered-by");
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));

        this.app.get("/twitchbot/api/stream-status", twitchApi.getStreamStatus);
        this.app.post("/twitchbot/api/stream-status", twitchApi.postStreamStatus);

        this.app.listen('3000', () => console.log('Listening on port 3000'));
    }
}
