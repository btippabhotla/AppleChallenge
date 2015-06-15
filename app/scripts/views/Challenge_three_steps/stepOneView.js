/*global BBPractice, Backbone, JST*/

BBPractice.Views = BBPractice.Views || {};

(function () {
    'use strict';

    BBPractice.Views.StepOneView = Backbone.View.extend({

        template: '/scripts/templates/Challenge_three_steps/step_one.html',

        tagName: 'div',

        id: '',

        className: 'container stepone',

        events: {
            "click #confirmButton" : "proceed"
        },

        initialize: function() {

            // IMPORTANT TO SET MODEL TO DEFAULT JUST IN CASE THE USER LEAVES AND RETURNS TO STEP ONE
            this.model.set('account', '' );
            this.model.set('summaryState', true );

            // STORE CONTEXT IN LOCAL VARIABLE TO BE USED IN BELOW CALLBACK LISTENNER            
            var _self = this;

            // BIND A LISTEN EVENT TO THE model OBJECT TO READ ANY ERROR MESSAGES
            Backbone.listenTo(this.model, 'invalid', function(model,error,options){


                if( error.length != 0 ) {

                    // IF ERROR, THEN BIND ERROR MESSAGE TO DOM
                    _self.printInvalid(error);
                } 
            });

            this.render();
        },

        render: function() {

            var _self = this; // STORE CONTEXT IN LOCAL VARIABLE USED IN BODY OF BELOW CALLBACKS

            $.ajax({
                url: this.template,
                dataType: "html",
                success: function (data) { // TRADIONAL PROMISE CALLBACKS

                    _self.$el.html( Mustache.render(data, {}) ); 

                    _self.populateInputs();
                },
                error: function (data) {

                    console.log("error fetching html template from views/Challenge_three_steps/stepOneView.js"); 
                }
            });

            return this;
        },

        populateInputs: function() {

            $(this.el).find("#username").val( this.model.get('username') );
            $(this.el).find("#first").val( this.model.get('first') );
            $(this.el).find("#last").val( this.model.get('last') );
            $(this.el).find("#email").val( this.model.get('email') );
        },

        proceed: function() {

            // FIRST TRY TO MODIFY wizard OBJECT WITH VALUES SELECTED FROM INPUTS
            this.model.set('username', $(this.el).find("#username").val() );
            this.model.set('first',    $(this.el).find("#first").val() );
            this.model.set('last',     $(this.el).find("#last").val() );
            this.model.set('email',    $(this.el).find("#email").val() );


            // NOW CHECK IF wizrd OBJECT IS VALID
            if( !this.model.isValid() ) { // IF THE INPUT VALUES AREN'T VALID THEN STAY PUT
                return;
            }

            // ELSE FALL THROUGH, UPDATE wizard OBJECT'S ACCOUNT PROPERTY AND PROCEED TO NEXT STEP
            this.model.set('account', 'Light' );

            Backbone.history.navigate('/challenge_three/steptwo', { trigger:true, replace: true });
        },

        printInvalid: function(errors) {

            // GENERATE ERRORS STRING
            var errorstring = "<ul class='incorrect reponse-message'>" + 
                                    "<li>YOU HAVE MADE THE FOLLOWING ERRORS:</li>" + errors + 
                              "<ul>";

            // CONVERT TO HTML OBJECT & APPEND TO DOM
            $(this.el).find("#statusmessage").empty().append( $.parseHTML( errorstring ) ); 
            // empty first so we don't double msgs
        }

    });

})();
