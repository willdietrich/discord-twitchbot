
const settings: { [key: string]: string } = require('../../settings.json');

class SettingsService {
    public getValue(key: string): string {
        return settings[key];
    }
}

export const settingsService = new SettingsService();
