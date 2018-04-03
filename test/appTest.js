const assert = require('chai').assert;
const app = require('../app');

describe('App', function(){
    it('app should return hello world', function(){
        assert.equal(app(), 'hello world');
    });
});