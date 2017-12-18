import * as requestPromise from 'request-promise';
import * as url from 'url';

import {Streamer} from '../models/Streamer';
import {settingsService} from '../services/SettingsService';

class TwitchService {

    private readonly twitchWebhooksURI = "https://api.twitch.tv/helix/webhooks/hub";
    private readonly twitchStreamsTopicURI = "https://api.twitch.tv/helix/streams";

    public executeTwitchRequest(reqOptions: requestPromise.Options) {
        return requestPromise(reqOptions).value();
    }

    public subscribeStreamerForNotifications(streamer: Streamer) {
        let streamerStatusOpts = this.generateSubscribeOptionsForStreamStatus(streamer.name);
        this.executeTwitchRequest(streamerStatusOpts);
    }

    public subscribeStreamersForNotifications(streamers: Array<Streamer>) {
        streamers.forEach((streamer) => {
            this.subscribeStreamerForNotifications(streamer);
        });
    }

    public generateSubscribeOptionsForStreamStatus(streamer: string): requestPromise.Options {
        let topicParamsObj = {
            user_id: streamer
        };
        let topicParams = new url.URLSearchParams(topicParamsObj);

        let topicURL = new url.URL(this.twitchStreamsTopicURI);
        topicURL.search = topicParams.toString();

        return {
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
        };
    }
}

export const twitchService = new TwitchService();
