/*global beforeEach, describe, it, assert, expect  */
(function () {
	'use strict';

	describe('WizardModel Model', function () {

	    it("creates a global variable for the name space", function () {
			should.exist( Apple.Models );
		})

	    describe('WizardModel Model', function () {

		    beforeEach(function () {
		        this.WizardModel = new Apple.Models.WizardModel();
		    });

            // it('has a username with an empty string', function() {
            //     expect( this.SignupModel.set('username', '' ) ).toEqual( '<li>ERROR: Username input is empty</li>' );
            // });

            // it('has a username with too many characters', function() {
            //     expect( this.SignupModel.set('username', '56_56_56_56_56_56_56_56_56_56_56_56_56_56_56_56_56_56_56_56_' ) ).toEqual( '<li>ERROR: Username input cannot be longer than 56 characters</li>' );
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
