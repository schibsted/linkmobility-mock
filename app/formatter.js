'use strict';

var xml = require('xml'),
    _ = require('underscore'),
    responses = require('./responses.js');

module.exports = function(opts) {

    var defaults = {
        operator: 'NO_TN',
        operatorStatusCode: 200,
        operatorStatusMessage: ''
    };

    opts = _.defaults(opts, defaults);

    if(!opts.id) { throw new Error('id is required'); }
    if(!opts.status) { throw new Error('status is required'); }

    var message = responses[opts.status] ? responses[opts.status] : '';

    var res = xml({
        gatedr: [
            { id: opts.id },
            { status: opts.status },
            { statusMessage: { _cdata: message } },
            { operator: opts.operator },
            { operatorStatusCode: opts.operatorStatusCode },
            { operatorStatusMessage: opts.operatorStatusMessage }
        ]
    }, { declaration: true });

    return res;
};