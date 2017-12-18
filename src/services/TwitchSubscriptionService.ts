import * as requestPromise from 'request-promise';
import * as url from 'url';
import {UriOptions} from 'request';

import {Streamer} from '../models/Streamer';

class TwitchService {

    private readonly twitchWebhooksURI = "https://api.twitch.tv/helix/webhooks/hub";
    private readonly twitchStreamsTopicURI = "https://api.twitch.tv/helix/users/streams";

    public executeTwitchRequest(reqOptions: UriOptions) {
        return requestPromise(reqOptions).value();
    }

    public subscribeStreamersForNotifications(streamers: Array<Streamer>) {
        streamers.forEach((streamer) => {
            let streamerStatusOpts = this.generateSubscribeOptionsForStreamStatus(streamer.name);
            this.executeTwitchRequest(streamerStatusOpts);
        })
    }

    public generateSubscribeOptionsForStreamStatus(streamer: string) {
        let topicParamsObj = {
            user_login: streamer
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
                'hub.callback': 'http://walld.me/twitchbot/stream-status',
                'hub.lease_seconds': 60
            },
            json: true
        };
    }
}

export const twitchService = new TwitchService();
