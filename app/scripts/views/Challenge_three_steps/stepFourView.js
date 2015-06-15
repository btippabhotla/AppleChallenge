/*global BBPractice, Backbone, JST*/

BBPractice.Views = BBPractice.Views || {};

(function () {
    'use strict';

    BBPractice.Views.StepFourView = Backbone.View.extend({

        template: '/scripts/templates/Challenge_three_steps/step_four.html',

        tagName: 'div',

        id: '',

        className: 'container stepfour',

        events: {
          "click #opt_in_Button"    : "optin"
        },

        initialize: function() {

            this.render();
        },

        render: function() {

            var _self = this; // STORE CONTEXT IN LOCAL VARIABLE USED IN BODY OF BELOW CALLBACKS

            $.ajax({
                url: this.template,
                dataType: "html",
                success: function (data) { // TRADIONAL PROMISE CALLBACKS

                    _self.$el.html( Mustache.render(data, {}) ); 
                },
                error: function (data) {

                    console.log("error fetching html template from views/Challenge_three_steps/stepFourView.js"); 
                }
            });

            return this;
        },

        optin: function(ev) {

            $(ev.target).prop("disabled", true);

            this.model.set('account', 'Premium' );
        }

    });

})();

