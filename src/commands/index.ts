import {Services} from "../services";
import {Command} from "discord.js-commando";

export class Commands {

    private commandNames = Array.of(
        'follow',
        'list'
    );

    public readonly commands: Array<Command> = [];

    constructor(services: Services) {
        this.commandNames.forEach(commandName => {
            const newCommand = require(__dirname + '/' + commandName);
            let newCommandClass = newCommand();

            this.commands.push(newCommandClass);
        });
    }
}