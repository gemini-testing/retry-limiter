'use strict';

module.exports = class ConfigDecorator {
    static create(config) {
        return new ConfigDecorator(config);
    }

    constructor(config) {
        this._config = config;
    }

    disableRetries() {
        this._config.getBrowserIds().forEach((browserId) => {
            this._config.forBrowser(browserId).shouldRetry = (data) => typeof data.equal === 'undefined' && data.retriesLeft > 0;
        });
    }
};
