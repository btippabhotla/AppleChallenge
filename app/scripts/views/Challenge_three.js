/*global BBPractice, Backbone, JST*/

BBPractice.Views = BBPractice.Views || {};

(function () {
    'use strict';

    BBPractice.Views.ChallengeThree = Backbone.View.extend({

        tagName: 'div',

        id: 'chal-three',

        className: 'container',

        events: {},

        challengeThreeBody: null, // defined in appRouter

        challengeThreeSummary: null, // defined in appRouter

        initialize: function () { 
        },
     
        render: function() {

            // accumnulate markup before passing back up to caller for appending to DOM
            this.$el.html(this.challengeThreeBody.$el); 
            this.$el.append(this.challengeThreeSummary.$el); 
            
            return this;
        }

    });

})();