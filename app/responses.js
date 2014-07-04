'use strict';

module.exports = {
    '201': 'OK: Sent to gateway',
    '202': 'OK: Aknowledged by operator',
    '203': 'OK: Billed and delivered',
    '204': 'OK: Billed',

    '901': 'ERROR: Low credit',
    '902': 'ERROR: Message expired',
    '903': 'ERROR: Temporarily barred',
    '904': 'ERROR: Permanently barred',
    '905': 'ERROR: Barred from overcharged messages',
    '906': 'ERROR: Wrong operator',
    '907': 'ERROR: Billed but not delivered',
    '908': 'ERROR: Configuration error or error in message dat...',
    '909': 'ERROR: Message format error',
    '911': 'Error: Wrong operator retrying..',
    '916': 'ERROR: User is not registered in payment system',
    '917': '',
    '918': '',
    '951': 'ERROR: Blacklisted user',
    '998': '',
    '999': 'ERROR: Delivery/Billing failed'
};