'use strict';

//Constants
const assert = require('chai').assert;
const expect = require('chai').expect;
const app = require('../app');

const bedTimeHour = require('../app').bedTimeHour;
const pay = require('../app').pay;
const startTimeToBedtimePay = require('../app').startTimeToBedtimePay;
const bedtimeToMidnightPay = require('../app').bedtimeToMidnightPay;
const midnightToEndOfJobPay = require('../app').midnightToEndOfJobPay;
const moment = require('moment');
require('moment-round');

describe('App Tests', () => {
    describe('The BabySitter', () => {

        it('should be paid $12 for one hour of work before bedtime and before midnight', () => {
            var results = app(new moment('2018-01-01T17:00:00'), new moment('2018-01-01T18:00:00'));

            assert.equal(results, 12);
        });

        it('should error on invalid start time', () => {
            expect(app.bind(null, new moment('2018-01-01T14:00:00'), new moment('2018-01-02T18:00:00'))).to.throw('Invalid shift start.');
        });

        it('should error on invalid end time', () => {
            expect(app.bind(null, new moment('2018-01-01T17:00:00'), new moment('2018-01-01T06:00:00'))).to.throw('Invalid shift end.');
        });

        it('should error on invalid shift', () => {
            // Long shift:
            expect(app.bind(null, new moment('2018-01-01T17:00:00'), new moment('2018-01-02T18:00:00'))).to.throw('Invalid shift length.');
            // End before start:
            expect(app.bind(null, new moment('2018-01-02T17:00:00'), new moment('2018-01-01T18:00:00'))).to.throw('Invalid shift length.');
        });

        it('should be paid $24 for two hours of work before bedtime', () => {
            var results = app(setMoment(5), setMoment(7), bedTimeHour);

            assert.equal(24, results);
        });

        it('should be paid $8 for one hour of work after bedtime', () => {
            var results = app(setMoment(7), setMoment(8), bedTimeHour);

            assert.equal(8, results);
        });

        it('should be paid $20 for 1 hour before bedtime and 1 hour after bedtime', () => {
            var results = app(setMoment(5), setMoment(7), bedTimeHour);

            assert.equal(20, results);
        });

        it('should be paid $28 for 1 hour before bedtime and 2 hours after bedtime', () => {
            var results = app(setMoment(5), setMoment(8), bedTimeHour);

            assert.equal(28, results);
        });

        it('should be paid $16 for 1 hour after midnight', () => {
            var results = app(setMoment(12), setMoment(1), bedTimeHour);

            assert.equal(16, results);
        });

        it('should be paid $28 for 1 hour awake before midnight and 1 hour after midnight', () => {
            var results = app(setMoment(11), setMoment(1), bedTimeHour);

            assert.equal(28, results);
        });

        it('should be paid $24 for 1 hour in bed before midnight and 1 hour after midnight', () => {
            var results = app(setMoment(11), setMoment(1), bedTimeHour);

            assert.equal(24, results);
        });

        it('should not be paid for not working any hours', () => {
            var results = app(setMoment(7), setMoment(7), bedTimeHour);

            assert.equal(0, results);

        });
    });
    describe('The Time', () => {
       
    });
});

//creates the times used in the results variable in the test cases.
function setMoment(hour) {
    //console.log(hour.toString());
    var m = moment(new Date()).hour(hour);
    console.log(m.hours().toString());
    //var nextM = m.clone().add(1,'day').FromNow();
    //onsole.log(nextM.toString());
    //var m = moment().add(hour, 'h');

    return m;
};