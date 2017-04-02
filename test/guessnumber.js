/**
 * Created by Jon Snow on 3/22/2017.
 */

var GuessNumber = artifacts.require("./GuessNumber.sol");

contract('GuessNumber', function(accounts) {
    it("should set a number and correctly guess it", function() {
        var setNumber = 10;
        var guessNumberInstance;
        return GuessNumber.deployed().then(function(instance) {
            guessNumberInstance =  instance;
            return guessNumberInstance.setNumber(setNumber);
        }).then(function() {
             return guessNumberInstance.guessNumber(setNumber);
        }).then(function(booleanResult){
             assert.equal(booleanResult, true, "Number guessed didn't match set number!");
        });
    });
});