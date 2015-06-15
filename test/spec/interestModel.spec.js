/*global beforeEach, describe, it, assert, expect  */
(function () {
	'use strict';

	describe('InterestModel Model', function () {

	    it("creates a global variable for the name space", function () {
			should.exist( Apple.Models );
		})

	    describe('InterestModel Model', function () {

		    beforeEach(function () {
		        this.InterestModel = new Apple.Models.InterestModel();
		    });

	    });

	});

})();
