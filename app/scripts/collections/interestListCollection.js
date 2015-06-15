/*global BBPractice, Backbone*/

BBPractice.Collections = BBPractice.Collections || {};

(function () {
    'use strict';

    BBPractice.Collections.InterestListCollection = Backbone.Collection.extend({

        model: BBPractice.Models.InterestModel

    });

})();
