'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    xml = require('xml'),
    uuid = require('node-uuid'),
    request = require('request'),
    winston = require('winston'),
    expressWinston = require('express-winston');

var callbackDelivery = 'http://spp.dev/callback/smsdelivery';

// application logger
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            level: 'debug'
        }),
    ]
});

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// request logger
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        })
    ]
}));

app.all('*', function(req, res) {
    logger.info(req);
    var id = uuid.v1();
    var xmlres = xml({
        gatedr: [
            { id: id },
            { status: 201 },
            { statusMessage: { _cdata: 'OK: Sent to gateway' } },
            { operator: 'NO_TN' },
            { operatorStatusCode: 200 },
            { operatorStatusMessage: ''}
        ]
    }, { declaration: true });
    res.set('Content-Type', 'text/xml');
    res.send(200, xmlres);

    setTimeout(function() {
        var xmlres = xml({
            gatedr: [
                { id: id },
                { status: 202 },
                { statusMessage: { _cdata: 'OK: Sent to gateway' } },
                { operator: 'NO_TN' },
                { operatorStatusCode: 200 },
                { operatorStatusMessage: ''}
            ]
        }, { declaration: true });

        request.post({
            url: callbackDelivery,
            headers: { 'Content-Type': 'text/xml' },
            body: xmlres
        }, function(err, response, body) {
            logger.info('Callback 202 sent');
            logger.info(err, response, body);
        });

    }, 1000);

    setTimeout(function() {
        var xmlres = xml({
            gatedr: [
                { id: id },
                { status: 203 },
                { statusMessage: { _cdata: 'OK: Sent to gateway' } },
                { operator: 'NO_TN' },
                { operatorStatusCode: 200 },
                { operatorStatusMessage: ''}
            ]
        }, { declaration: true });

        request.post({
            url: callbackDelivery,
            headers: { 'Content-Type': 'text/xml' },
            body: xmlres
        }, function(err, response, body) {
            logger.info('Callback 203 sent');
            logger.info(err, response, body);
        });
    }, 2000);

});


var server = app.listen(process.env.PORT || 3010, function() {
    logger.info('Listening on port %d', server.address().port);
});