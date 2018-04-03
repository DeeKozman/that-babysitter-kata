const assert = require('chai').assert;
const sayHelloWorld = require('../app').sayHelloWorld;
//const app = require('../app');

describe('App', function(){
    it('app should return hello world', function(){
        let result = sayHelloWorld();
        assert.equal(result, 'hello world');
    });
});