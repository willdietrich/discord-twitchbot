import * as Sequelize from "sequelize";

const sqlize = new Sequelize('twitchbot', null, null, {
    dialect: 'sqlite',
    storage: 'twitchbot.db3'
});

let modelNames = Array.of(
    'streamer'
);

export const Models: {[key: string]: Sequelize.Model<any, any>} = {};

modelNames.forEach(model => {
    const newDataModel = sqlize.import(__dirname + '/' + model);
    newDataModel.sync();
    Models[model] = newDataModel;
});

// Model relationships
(function (m) {
    // TODO
})(Models);
