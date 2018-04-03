'use strict'

// Const
const startTimeToBedtimePay = 12;
const bedtimeToMidnightPay = 8;
const midnightToEndOfJobPay = 16;
//Vars
var moment = require('moment');
require('moment-round');


module.exports = function (start, finish, bed) {
    var m = new moment();
    var startTime = m.ceil(start, 'hours').format( 'YYYY-MM-DD HH:mm:ss.SSS' ); ; //transformHours(start.getHours());
    var finishTime = moment.ceil(finish, 'hours').format( 'YYYY-MM-DD HH:mm:ss.SSS' ); ; //transformHours(finish.getHours());
    var bedTime = moment.ceil(bed, 'hours').format( 'YYYY-MM-DD HH:mm:ss.SSS' ); ; //transformHours(bed.getHours());
    var pay = 0;
    for (var i = startTime; i < finishTime; i++) {
        pay += findTheRate(i, bedTime);
    };

    /*console.info('Start-time: ' + transformHours(start.getHours()));
    console.info('Finish-time: ' + transformHours(finish.getHours()));
    console.info('Bedtime:    ' + transformHours(bed.getHours()));
    console.info('-----------------')
    console.info(`Total Pay:   $${pay}`)*/
    return pay;

};

function findTheRate(hour, bedTime) {
    if (hour < 12 && hour < bedTime) {
        return startTimeToBedtimePay;
    } else if (hour < 12 && bedTime <= hour) {
        return bedtimeToMidnightPay
    } else {
        return midnightToEndOfJobPay;
    }
};

function transformHours(time) {
    return time < 5 ? time + 12 : time;
};