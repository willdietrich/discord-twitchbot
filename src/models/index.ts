import * as Sequelize from "sequelize";

const modelNames = Array.of(
    'streamer'
);

interface ModelsInterface {
    [key: string]: Sequelize.Model<any, any>;
}

export class Models {

    private readonly _models: ModelsInterface = {};
    private sqlize = new Sequelize('twitchbot', null, null, {
        dialect: 'sqlite',
        storage: 'twitchbot.db3'
    });

    constructor() {
        modelNames.forEach(model => {
            const newDataModel = this.sqlize.import(__dirname + '/' + model);
            newDataModel.sync();
            this._models[model] = newDataModel;
        });

        (function (m) {
            // TODO
        })(Models);
    }

    get models() {
        return this._models;
    }
}

