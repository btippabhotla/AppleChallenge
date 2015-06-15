/* global describe, it */

(function () {
  'use strict';

	describe('McFerren Apple Exam: Testing', function () {

		it("creates a global variable for the name space", function () {
			should.exist( Apple.Models );
		})

	});
  
})();






/* global describe, it */

// (function (global, _, Apple.Models, undefined) {

//   'use strict';


// 	describe('McFerren Apple Exam: Testing', function () {


// 		describe('SignupModel Model', function () {

// 			beforeEach(function () {

// 			    this.SignupModelModel = new Apple.Models.SignupModel();
// 			});

// 		    it('has a username with an empty string', function() {
// 		        expect( this.SignupModelModel.set('username', '' ) ).toEqual( '<li>ERROR: Username input is empty</li>' );
// 		    });
// 		});

// 	});

// })();










// (function () {
//   'use strict';

//   Apple.Models = Apple.Models || {};

//   describe('McFerren Apple Interview Tests', function () {

// 		describe('SignupModel Model', function () {

// 		    beforeEach(function () {

// 		        this.SignupModelModel = new Apple.Models.SignupModel();
// 		    });

// 		    it('has a username with an empty string', function() {
// 		        expect( this.SignupModelModel.set('username', '' ) ).toEqual( '<li>ERROR: Username input is empty</li>' );
// 		    });

// 		    it('has a username with too many characters', function() {
// 		        expect( this.SignupModelModel.set('username', '56_56_56_56_56_56_56_56_56_56_56_56_56_56_56_56_56_56_56_56_' ) ).toEqual( '<li>ERROR: Username input cannot be longer than 56 characters</li>' );
// 		    });

// 		    it('has a password with an empty string', function() {
// 		        expect( this.SignupModelModel.set('password', '' ) ).toEqual( '<li>ERROR: Password input is empty</li>' );
// 		    });

// 		    it('has a confirm with an empty string', function() {
// 		        expect( this.SignupModelModel.set('confirm', '' ) ).toEqual( '<li>ERROR: Confirm input is empty</li>' );
// 		    });

// 		    it('has a first with an empty string', function() {
// 		        expect( this.SignupModelModel.set('first', '' ) ).toEqual( '<li>ERROR: First Name input is empty</li>' );
// 		    });

// 		    it('has a first with too many characters', function() {
// 		        expect( this.SignupModelModel.set('first', 'fiftyfiftyfiftyfiftyfiftyfiftyfiftyfiftyfiftyfiftyfifty' ) ).toEqual( '<li>ERROR: First Name input may not be more than 50 characters</li>' );
// 		    });

// 		    it('has a last with too many characters', function() {
// 		        expect( this.SignupModelModel.set('last', 'fiftyfiftyfiftyfiftyfiftyfiftyfiftyfiftyfiftyfiftyfifty' ) ).toEqual( '<li>ERROR: Last Name input may not be more than 50 characters</li>' );
// 		    });
// 		});
//     });
// })();
