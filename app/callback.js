'use strict';

var request = require('request');

module.exports = function(opts) {

    request.post(
        {
            url: opts.url,
            headers: { 'Content-Type': 'text/xml' },
            body: opts.message
        },
        function(err/*, response, body*/) {
            opts.logger.info('Callback sent');
            if(err) {
                opts.logger.error('Callback endpoint responded with: ' + err);
            }
        }
    );

};