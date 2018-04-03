'use strict';

const assert = require('chai').assert;
const app = require('../app');
const startTime = require("../app").startTime;
const finishTime = require("../app").finishTime;
const bedTime =  require("../app").bedTime;
const pay = require("../app").pay;
const startTimeToBedtimePay  = require("../app").startTimeToBedtimePay ;
const bedtimeToMidnightPay = require("../app").bedtimeToMidnightPay;
const midnightToEndOfJobPay = require("../app").midnightToEndOfJobPay;



describe('App Tests', ()=>{
    describe('The BabySitter', () => {

        it('should be paid $12 for one hour of work before bedtime and before midnight', () => {
          var results  = app(setHour(5), setHour(6), setHour(10));
      
          assert.equal(results, 12);
        });

        it('should be paid $24 for two hours of work before bedtime', () => {
            var results  = app (setHour(5), setHour(7), setHour(10));
        
            assert.equal(24, results);
          });

          it('should be paid $8 for one hour of work after bedtime', () => {
            var results  = app (setHour(7), setHour(8), setHour(6));
        
            assert.equal(8, results);
          });
        
          it('should be paid $20 for 1 hour before bedtime and 1 hour after bedtime', () => {
            var results  = app(setHour(5), setHour(7), setHour(6));
        
            assert.equal(20, results);
          });
        
          it('should be paid $28 for 1 hour before bedtime and 2 hours after bedtime', () => {
            var results  = app(setHour(5), setHour(8), setHour(6));
        
            assert.equal(28, results);
          });
        
          it('should be paid $16 for 1 hour after midnight', () => {
            var results  = app(setHour(12), setHour(1), setHour(1));
        
            assert.equal(16, results);
          });
        
          it('should be paid $28 for 1 hour awake before midnight and 1 hour after midnight', () => {
            var results  = app(setHour(11), setHour(1), setHour(12));
        
            assert.equal(28, results);
          });
        
          it('should be paid $24 for 1 hour in bed before midnight and 1 hour after midnight', () => {
            var results  = app(setHour(11), setHour(1), setHour(11));
        
            assert.equal(24, results);
          });
        
          it('should not be paid for not working any hours', () => {
            var results  = app(setHour(7), setHour(7), setHour(8));
        
            assert.equal(0, results);
        
        });
    });
});

function setHour(hour) {
    var date = new Date();
    date.setHours(hour);
    date.setMinutes(0);
    date.setSeconds(0);
    
    return date;
  }