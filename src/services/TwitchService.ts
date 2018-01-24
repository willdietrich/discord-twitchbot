import * as bluebird from 'bluebird';
import * as rp from 'request-promise';
import * as url from 'url';

import {Streamer} from '../models/Streamer';
import {settingsService} from '../services/SettingsService';
import {twitchOAuthService} from "./TwitchOAuthService";
import Bluebird = require("bluebird");

class TwitchService {

    private readonly twitchWebhooksURI = "https://api.twitch.tv/helix/webhooks/hub";
    private readonly twitchStreamsTopicURI = "https://api.twitch.tv/helix/streams";
    private readonly twitchUserInfoURI= "https://api.twitch.tv/helix/users";

    public executeTwitchRequest(reqOptions: rp.Options) {
        return rp(reqOptions);
    }

    public subscribeStreamerForNotifications(streamer: Streamer) {
        this.generateSubscribeOptionsForStreamStatus(streamer.id).then((streamerStatusOpts) => {
            this.executeTwitchRequest(streamerStatusOpts).then(() => console.log("Subscribed streamer for notifications."));
        });
    }

    public subscribeStreamersForNotifications(streamers: Array<Streamer>): void {
        streamers.forEach((streamer) => {
            this.subscribeStreamerForNotifications(streamer);
        });
    }

    public getUserInformation(displayName: String): Bluebird<TwitchUserResponse> {
        return this.generateUserInfoOptions(displayName)
            .then(userInfoOpts => {
                return this.executeTwitchRequest(userInfoOpts)
                    .then(res => res.data[0]);
        });
    }

    private generateSubscribeOptionsForStreamStatus(streamerID: string): Bluebird<rp.Options> {
        let topicParamsObj = {
            user_id: streamerID
        };
        let topicParams = new url.URLSearchParams(topicParamsObj);

        let topicURL = new url.URL(this.twitchStreamsTopicURI);
        topicURL.search = topicParams.toString();

        return bluebird.resolve({
            uri: this.twitchWebhooksURI,
            method: 'POST',
            qs: {
                'hub.mode': 'subscribe',
                'hub.topic': topicURL.toString(),
                'hub.callback': 'http://walld.me/twitchbot/api/stream-status',
                'hub.lease_seconds': 60
            },
            headers: {
                "Client-ID": settingsService.getValue("twitch.client.id")
            },
            json: true
        });
    }

    private generateUserInfoOptions(displayName: String): Bluebird<rp.Options> {
        return twitchOAuthService.getAccessToken().then(token => {
            return {
                uri: this.twitchUserInfoURI,
                method: 'GET',
                qs: {
                    'login': displayName
                },
                headers: {
                    "Client-ID": settingsService.getValue("twitch.client.id"),
                    "Authorization": "Bearer " + token
                },
                json: true
            };
        });
    }
}

export const twitchService = new TwitchService();

export interface TwitchUserResponse {
    id: string,
    login: string,
    display_name: string
}
