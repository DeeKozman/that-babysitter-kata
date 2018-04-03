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



        it('should be paid $24 for two hours of work before bedtime at the rate of $12 an hour', () => {
            var results = app(new moment('2018-01-01T17:00:00'), new moment('2018-01-01T19:00:00'));
            assert.equal(24, results);
        });

        it('should be paid $8 for one hour of work after bedtime at the rate of $8 an hour', () => {
            var results = app(new moment('2018-01-01T21:00:00'), new moment('2018-01-01T22:00:00'));

            assert.equal(8, results);
        });

        it('should be paid $20 for 1 hour before bedtime at the rate of $12 an hour and 1 hour after bedtime at the rate of $8 an hour', () => {
            var results = app(new moment('2018-01-01T19:00:00'), new moment('2018-01-01T21:00:00'));

            assert.equal(20, results);
        });

        it('should be paid $28 for 1 hour before bedtime at the rate of $12 an hour and 2 hours after bedtime at the rate of $8 an hour', () => {
            var results = app(new moment('2018-01-01T19:00:00'), new moment('2018-01-01T22:00:00'));

            assert.equal(28, results);
        });

        it('should be paid $68 for 3 hour before bedtime at the rate of $12 an hour and 4 hours after bedtime at the rate of $8 an hour', () => {
            var results = app(new moment('2018-01-01T17:00:00'), new moment('2018-01-01T24:00:00'));

            assert.equal(68, results);
        });

        it('should be paid $16 for 1 hour after midnight at the rate of $16 an hour', () => {
            var results = app(new moment('2018-01-02T00:00:00'), new moment('2018-01-02T01:00:00'));

            assert.equal(16, results);
        });

        it('should be paid $24 for 1 hour after bedtime before midnight and 1 hour after midnight', () => {
            var results = app(new moment('2018-01-01T23:00:00'), new moment('2018-01-02T01:00:00'));

            assert.equal(24, results);
        });

        it('should be paid $64 for 4 hours after midnight at the rate of $16 an hour', () => {
            var results = app(new moment('2018-01-02T00:00:00'), new moment('2018-01-02T04:00:00'));

            assert.equal(64, results);
        });

        it('should not be paid for not working any hours', () => {
            var results = app(new moment('2018-01-01T17:00:00'), new moment('2018-01-01T17:00:00'));

            assert.equal(0, results);

        });

        xit('should be paid $132 for 3 hours before bedtime at the rate of $12 an hour and 4 hours after bedtime at the rate of $8 an hour and 4 hours after midnight at the rate of $16 an hour', () => {
            var results = app(new moment('2018-01-01T17:00:00'), new moment('2018-01-02T04:00:00'));

            assert.equal(132, results);
        });
    });
    describe('The App', () => {

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
    });
});