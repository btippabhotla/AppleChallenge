/*global BBPractice, Backbone, JST*/

BBPractice.Views = BBPractice.Views || {};

(function () {
    'use strict';

    BBPractice.Views.StepThreeView = Backbone.View.extend({

        template: '/scripts/templates/Challenge_three_steps/step_three.html',

        childView: null,

        tagName: 'div',

        id: '',

        className: 'container stepthree',

        events: {
          "click .interest"       : "toggleSelection",
          "click #proceed_Button" : "proceed"
        },

        initialize: function() {

            // SHOULD ADD SOMETHING THAT SENDS THE USER BACKWARD IF MODEL CRITERIA IS NOT MET
            var interest_one    = new BBPractice.Models.InterestModel({ title: 'Backbone', idattr: 'backbone'});
            var interest_two    = new BBPractice.Models.InterestModel({ title: 'Angularjs', idattr: 'angular'});
            var interest_three  = new BBPractice.Models.InterestModel({ title: 'JQuery', idattr: 'jquery'});
            var interest_four   = new BBPractice.Models.InterestModel({ title: 'CommonJS', idattr: 'common'});
            var interest_five   = new BBPractice.Models.InterestModel({ title: 'Underscore', idattr: 'underscore'});
            var interest_six    = new BBPractice.Models.InterestModel({ title: 'React', idattr: 'react'});
            var interest_seven  = new BBPractice.Models.InterestModel({ title: 'Node', idattr: 'node'});
            var interest_eight  = new BBPractice.Models.InterestModel({ title: 'Meteor', idattr: 'meteor'});

            this.interestlist = new BBPractice.Collections.InterestListCollection([ 

                interest_one,
                interest_two,
                interest_three,
                interest_four,
                interest_five,
                interest_six,
                interest_seven,
                interest_eight

            ]);

            this.render();
        },

        render: function() {

            var _self = this; // STORE CONTEXT IN LOCAL VARIABLE USED IN BODY OF BELOW CALLBACKS

            $.ajax({
                url: this.template,
                dataType: "html",
                success: function (data) { // TRADIONAL PROMISE CALLBACKS

                    _self.$el.html( Mustache.render(data, { 
                        torender_interestlist : _self.interestlist.toJSON() // NON-EMPTY LIST
                    }) ); // MUSTACHE WILL ITERATE AN RENDER EACH INDEX IN THE VIEW
                },
                error: function (data) {

                    console.log("error fetching html template from views/Challenge_three_steps/stepThreeView.js"); 
                }
            });

            return this;
        },

        toggleSelection: function(ev) {

            if( $(ev.target).parent().hasClass("selected")) {
                $(ev.target).parent().removeClass("selected");
            } else {
                $(ev.target).parent().addClass("selected");
            }

            this.updateSummary();
        },

        updateSummary: function() {

            if( $('.selected').length >= 4) {
                this.model.set('account', "Plus" );
                this.goPremium();
            } else {
                this.model.set('account', "Standard" );
                this.$el.children("button").remove();
            }
        },

        goPremium: function () {
            if( $(this.el).find("#proceed_Button").length == 0 ) {    
                
                this.$el.append('<button class="btn btn-success btn-block" id="proceed_Button" type="button">Go Premium</button>');
            }
        },

        proceed: function() {

            Backbone.history.navigate('/challenge_three/stepfour', { trigger:true });
        }

    });

})();