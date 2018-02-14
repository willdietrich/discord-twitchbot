import {Sequelize} from 'sequelize-typescript';
import * as path from "path";

export const sequelize = new Sequelize({
    database: 'twitchbot',
    dialect: 'mysql',
    username: 'twitchbotapp',
    password: 'abcd123',
    modelPaths: [path.join(__dirname, 'models')]
});
