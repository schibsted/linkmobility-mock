'use strict';

var request = require('request');

module.exports = function(opts) {

    if(!opts.url) { throw new Error('url is required'); }
    if(!opts.logger) { throw new Error('logger is required'); }

    return function(message) {
        request.post(
            {
                url: opts.url,
                headers: { 'Content-Type': 'text/xml' },
                body: message
            },
            function(err/*, response, body*/) {
                opts.logger.info('Callback sent');
                if(err) {
                    opts.logger.error('Callback endpoint responded with: ' + err);
                }
            }
        );
    };
};