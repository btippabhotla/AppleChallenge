/*global BBPractice, Backbone*/

BBPractice.Collections = BBPractice.Collections || {};

(function () {
    'use strict';

    BBPractice.Collections.PeopleCollection = Backbone.Collection.extend({

        model: BBPractice.Models.PersonModel,

	    url: "/scripts/data/challenge_two.json",

	    initialize: function(){
	    },

		parse: function(response){
	       return response.people;
	    },

	    comparator: 'status'

    });

})();
