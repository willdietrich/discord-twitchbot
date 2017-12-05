import {CommandoClient} from "discord.js-commando";
import {Express} from "express";
import {Models} from "../models";

import * as bodyParser from 'body-parser';
import * as express from 'express';

import * as twitchApi from "./api/twitch";

export class Server {

    private client: CommandoClient;
    private app: Express;

    public constructor(client: CommandoClient, services: Services) {
        this.client = client;

        const app = express();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        app.set('models', Models);

        app.get("/api/streamer/online", twitchApi.getOnline);

        app.listen('3000', () => console.log('Listening on port 3000'));
    }
}
