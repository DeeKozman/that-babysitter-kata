'use strict'

// Const
const startTimeToBedtimePay = 12;
const bedtimeToMidnightPay = 8;
const midnightToEndOfJobPay = 16;

module.exports = function (start, finish, bed) {
    var startTime = transformHours(start.getHours());
    var finishTime = transformHours(finish.getHours());
    var bedTime = transformHours(bed.getHours());
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