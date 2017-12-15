import {Promise} from 'bluebird';
import * as http from 'http';
import * as querystring from 'querystring';
import * as url from 'url';

import {settingsService} from './SettingsService';

class TwitchOAuthService {
    private readonly clientID = settingsService.getValue("twitch.client.id");
    private readonly clientSecret = settingsService.getValue("twitch.client.secret");

    private readonly twitchOAuthHost = "https://api.twitch.tv";
    private readonly twitchOAuthPath = "/kraken/oauth2/token/";

    private readonly twitchOAuthURL;

    constructor() {
        this.twitchOAuthURL = this.generateURL();
    }

    public getAccessToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            let req = http.get(this.twitchOAuthURL, (res) => {
                let {statusCode} = res;

                if (statusCode !== 200) reject(new Error("Unable to retrieve access token."))

                let rawData = [];
                res.on('data', (chunk) => body.push(chunk));
                res.on('end', () => {
                    let body = body.join('');
                    console.log(body);
                    resolve(body);
                });
            });

            req.on('error', () => reject(err));
        });
    }

    private generateURL(): URL {
        let url = new url.URL(this.twitchOAuthPath, this.twitchOAuthHost);

        let queryString = querystring.stringify({
            client_id: this.clientID,
            client_sercret: this.clientSecret,
            grant_type: "client_credentials"
        });
        url.search = queryString;

        return url;
    }
}

export const twitchOAuthService = new TwitchOAuthService();
