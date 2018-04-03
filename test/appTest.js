'use strict';

//Constants
const assert = require('chai').assert;
const app = require('../app');
const startTime = require('../app').startTime;
const finishTime = require('../app').finishTime;
const bedTime = require('../app').bedTime;
const pay = require('../app').pay;
const startTimeToBedtimePay = require('../app').startTimeToBedtimePay;
const bedtimeToMidnightPay = require('../app').bedtimeToMidnightPay;
const midnightToEndOfJobPay = require('../app').midnightToEndOfJobPay;
const moment = require('moment');
require('moment-round');

describe('App Tests', () => {
    describe('The BabySitter', () => {

        it('should be paid $12 for one hour of work before bedtime and before midnight', () => {
            var results = app(setMoment(5), setMoment(6), setMoment(10));

            assert.equal(results, 12);
        });

        it('should be paid $24 for two hours of work before bedtime', () => {
            var results = app(setMoment(5), setMoment(7), setMoment(10));

            assert.equal(24, results);
        });

        it('should be paid $8 for one hour of work after bedtime', () => {
            var results = app(setMoment(7), setMoment(8), setMoment(6));

            assert.equal(8, results);
        });

        it('should be paid $20 for 1 hour before bedtime and 1 hour after bedtime', () => {
            var results = app(setMoment(5), setMoment(7), setMoment(6));

            assert.equal(20, results);
        });

        it('should be paid $28 for 1 hour before bedtime and 2 hours after bedtime', () => {
            var results = app(setMoment(5), setMoment(8), setMoment(6));

            assert.equal(28, results);
        });

        it('should be paid $16 for 1 hour after midnight', () => {
            var results = app(setMoment(12), setMoment(1), setMoment(1));

            assert.equal(16, results);
        });

        it('should be paid $28 for 1 hour awake before midnight and 1 hour after midnight', () => {
            var results = app(setMoment(11), setMoment(1), setMoment(12));

            assert.equal(28, results);
        });

        it('should be paid $24 for 1 hour in bed before midnight and 1 hour after midnight', () => {
            var results = app(setMoment(11), setMoment(1), setMoment(11));

            assert.equal(24, results);
        });

        it('should not be paid for not working any hours', () => {
            var results = app(setMoment(7), setMoment(7), setMoment(8));

            assert.equal(0, results);

        });
    });
    describe('The Time', () => {
       
    });
});

//creates the times used in the results variable in the test cases.
function setMoment(hour) {
    //console.log(hour.toString());
    var m = moment(new Date()).hour(Number);
    console.log(m.hours().toString());
    //var nextM = m.clone().add(1,'day').FromNow();
    //onsole.log(nextM.toString());
    //var m = moment().add(hour, 'h');

    return m;
};