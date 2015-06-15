/*global BBPractice, Backbone, JST*/

BBPractice.Views = BBPractice.Views || {};

(function () {
    'use strict';

    BBPractice.Views.StepTwoView = Backbone.View.extend({

        template: '/scripts/templates/Challenge_three_steps/step_two.html',

        tagName: 'div',

        id: '',

        className: 'container steptwo',

        events: {
          "click #opt_in_Button"    : "optin",
          "click #opt_out_Button"   : "optout",
          "click #proceed_Button"   : "proceed"
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

                    _self.$el.html( Mustache.render(data, { }) ); 
                },
                error: function (data) {

                    console.log("error fetching html template from views/Challenge_three_steps/stepTwoView.js"); 
                }
            });

            return this;
        },

        optin: function(ev) {

            $(ev.target).prop("disabled", true);
            $(this.el).find("#opt_out_Button").prop("disabled", false);
            $(this.el).find("#proceed_Button").prop("disabled", false);

            this.model.set('account', 'Standard' );
        },

        optout: function() {

            this.model.set('account', 'Light' );

            Backbone.history.navigate('/challenge_three/stepone', {trigger:true});
        },

        proceed: function() {

            Backbone.history.navigate('/challenge_three/stepthree', {trigger:true});
        }

    });

})();
