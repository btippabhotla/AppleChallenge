/*global BBPractice, Backbone*/

BBPractice.Models = BBPractice.Models || {};

(function () {
    'use strict';

    BBPractice.Models.InterestModel = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
            title: null,
            idattr: null,
            state: 'unselected'
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
