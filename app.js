'use strict'

// Const
const startTimeToBedtimePay = 12;
const bedtimeToMidnightPay = 8;
const midnightToEndOfJobPay = 16;
const startTimeHour = 17;
const bedTimeHour = 20;
const endTimeHour = 4;
//Vars
var moment = require('moment');
require('moment-round');


module.exports = function (start, finish) {
    // console.log('Time Inputs:')
    //console.log(start);
    //console.log(finish);

    var roundedStart = start.floor(start, 'minutes');
    var roundedFinish = finish.ceil(finish, 'minutes');

    //console.log('Rounded Times:')
    console.log(roundedStart);
    console.log(roundedFinish);

    var shiftLength = roundedFinish.unix() - roundedStart.unix();

    console.log('Shift Length:')
    console.log(shiftLength);

    // Check if the shift starts in between the correct hours:
    if (isInvalidShiftTime(roundedStart))
        throw new Error('Invalid shift start.');

    // Check if the shift ends in between the correct hours:
    if (isInvalidShiftTime(roundedFinish))
        throw new Error('Invalid shift end.');

    // Check if the shift spans multiple days:
    if (shiftLength >= 11.001 * 60 * 60 || shiftLength < 0)
        throw new Error('Invalid shift length.');

    var duration = moment.duration(shiftLength, 'seconds');
    console.log('Duration:');
    console.log(duration.asHours());

    var pay = 0;

    for (var hour = 0; hour < duration.asHours(); hour++) {
        var hourTime = roundedStart.clone().add(hour, 'hours');

        console.log("hourtime:"+hourTime);
        if (hourTime.hours() < bedTimeHour && hourTime.hours() > endTimeHour)
            pay += startTimeToBedtimePay;
        else if (hourTime.hours() >= bedTimeHour && hourTime.hours() < 24)
            pay += bedtimeToMidnightPay;
        else
            pay += midnightToEndOfJobPay;
    }

    console.log("pay= $"+pay);
    return pay;
};

function isInvalidShiftTime(time) {
    return time.hours() < startTimeHour && time.hours() > endTimeHour;
}

function findTheRate(hour, bedTimeHour) {
    if (hour < 12 && hour < bedTimeHour) {
        return startTimeToBedtimePay;
    } else if (hour < 12 && bedTimeHour <= hour) {
        return bedtimeToMidnightPay
    } else {
        return midnightToEndOfJobPay;
    }
};