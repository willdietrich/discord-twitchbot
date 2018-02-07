import * as bodyParser from 'body-parser';
import * as express from 'express';

import * as twitchApi from "./api/twitch";

export class Server {
    private app: express.Express;

    public constructor() {
        this.app = express();
        this.app.disable("x-powered-by");
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));

        this.app.get("/twitchbot/api/stream-status", twitchApi.getStreamStatus);
        this.app.post("/twitchbot/api/stream-status", twitchApi.postStreamStatus);
    }

    public start() {
        this.app.listen('3030', () => console.log('Listening on port 3000'));
    }
}
