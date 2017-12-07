import {Sequelize} from 'sequelize-typescript';
import * as path from "path";

export const sequelize = new Sequelize({
    database: '__',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: 'twitchbot.db3',
    modelPaths: [path.join(__dirname, 'models')]
});
