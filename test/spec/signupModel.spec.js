/*global beforeEach, describe, it, assert, expect  */
(function () {
    'use strict';

    describe('SignupModel Model', function () {

        it("creates a global variable for the name space", function () {
            should.exist( Apple.Models );
        })

        describe('SignupModel Model', function () {

            beforeEach(function () {
                this.SignupModel = new Apple.Models.SignupModel();
            });

            // it('has a password with an empty string', function() {
            //     expect( this.SignupModel.set('password', '' ) ).toEqual( '<li>ERROR: Password input is empty</li>' );
            // });

            // it('has a confirm with an empty string', function() {
            //     expect( this.SignupModel.set('confirm', '' ) ).toEqual( '<li>ERROR: Confirm input is empty</li>' );
            // });

            // it('has a first with an empty string', function() {
            //     expect( this.SignupModel.set('first', '' ) ).toEqual( '<li>ERROR: First Name input is empty</li>' );
            // });

            // it('has a first with too many characters', function() {
            //     expect( this.SignupModel.set('first', 'fiftyfiftyfiftyfiftyfiftyfiftyfiftyfiftyfiftyfiftyfifty' ) ).toEqual( '<li>ERROR: First Name input may not be more than 50 characters</li>' );
            // });

            // it('has a last with too many characters', function() {
            //     expect( this.SignupModel.set('last', 'fiftyfiftyfiftyfiftyfiftyfiftyfiftyfiftyfiftyfiftyfifty' ) ).toEqual( '<li>ERROR: Last Name input may not be more than 50 characters</li>' );
            // });

        });

    });
    
})();

