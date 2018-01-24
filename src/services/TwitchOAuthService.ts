import * as requestPromise from "request-promise";

import {settingsService} from './SettingsService';
import Bluebird = require("bluebird");

interface TwitchOAuthResponse {
    access_token: string,
    refresh_token: string,
    expires_in: number,
    scope: string
}

class TwitchOAuthService {
    private readonly clientID = settingsService.getValue("twitch.client.id");
    private readonly clientSecret = settingsService.getValue("twitch.client.secret");

    private readonly twitchOAuthURI = "https://api.twitch.tv/kraken/oauth2/token/";

    private readonly twitchOAuthOptions: requestPromise.Options;

    constructor() {
        this.twitchOAuthOptions = this.generateRequestOptions();
    }

    public getAccessToken(): Bluebird<string> {
        return requestPromise(this.twitchOAuthOptions)
            .then((res: TwitchOAuthResponse) => {
                return res.access_token;
            });
    }

    private generateRequestOptions(): requestPromise.Options {
        return {
            uri: this.twitchOAuthURI,
            method: 'POST',
            qs: {
                client_id: this.clientID,
                client_secret: this.clientSecret,
                grant_type: "client_credentials"
            },
            json: true
        };
    }
}

export const twitchOAuthService = new TwitchOAuthService();
