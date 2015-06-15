/*global BBPractice, Backbone, JST*/

BBPractice.Views = BBPractice.Views || {};

(function () {
    'use strict';

    BBPractice.Views.ChallengeOne = Backbone.View.extend({

        template: '/scripts/templates/challenge_one.html',

        tagName: 'div',

        id: 'chal-one',

        className: 'container',

        events : {      
          "click #signUpButton" : "writeToMemory"
        },

        initialize: function() {

            // INSTANTIATE NEW SignupModel INTO registrant OBECT TO VALIDATE DATA GATHERED
            this.registrant = new BBPractice.Models.SignupModel();

            // STORE CONTEXT IN LOCAL VARIABLE TO BE USED IN BELOW CALLBACK LISTENNER            
            var _self = this;

            // BIND A LISTEN EVENT TO THE registrant OBJECT TO READ ANY ERROR MESSAGES
            Backbone.listenTo(this.registrant, 'invalid', function(model,error,options){

                if( error.length != 0 ) {

                    // IF ERROR, THEN BIND ERROR MESSAGE TO DOM
                    _self.printInvalid(error);
                } 
            });

            // INVOKE RENDER FUNCTION TO GENERATE HTML OBJECT FROM template PROPERTY & APPEND TO DOM
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

                    console.log("error fetching html template from views/Challenge_one.js"); 
                }
            });

            return this;
        },

        writeToMemory: function(e) { // e STORES EVENT DATA OBJECT FROM SUBMIT GESTURE

            // ROLLED MY OWN VALIDATION BUT WITH MORE TIME, I MIGHT HAVE IMPLEMENTED ONE OF THESE LIBRARIES:
            // -> http://amiliaapp.github.io/backform/
            // -> https://github.com/thedersen/backbone.validation

            // CAN'T USE ALL HTML5 FORM RULES BECAUSE 
            //      (1) SAFARI CAN'T USE PATTERNS
            //      (2) PASSWORD AND CONFIRM NEED TO MATCH
            e.preventDefault();

            // PERFORM SET OPERATIONS ON THE registrant OBJECT WITH VALUES SELECTED FROM DOM INPUTS
            // IF ERROR IS DISCOVERED, CONCATENATE WHAT RECEIVED WITH validationcheckstring
            this.registrant.set('username', $(this.el).find("#username").val() );
            this.registrant.set('password', $(this.el).find("#password").val() );
            this.registrant.set('confirm',  $(this.el).find("#repeatPassword").val() );
            this.registrant.set('first',    $(this.el).find("#first").val() );
            this.registrant.set('last',     $(this.el).find("#last").val() );

            
            // NEED TO SUBMIT BIRTHDATE AS ISO 8601
            if( $(this.el).find("#date").val().length != 0 ) {              // FIRST WASH INPUT SO 
                var rawdate = new Date( $(this.el).find("#date").val() );   // WE CAN SEND AN ISO 8601 STRING
                this.registrant.set('birth', rawdate.toISOString() ); 
            } else {
                this.registrant.set('birth', '' ); // STRING OF ZERO LENGTH TO BE CAUGHT BY MODEL VALIDATOR
            }

            if( this.registrant.isValid() ) {

                // IF NO ERROR, THEN BIND SUCCESS MESSAGE TO DOM
                this.printSuccess();

                // REFRESH DOM
                this.clearForm();
            }
        },

        printSuccess: function() {

            // GENERATE RETURN STRING FROM OBJECT ACCESSORS
            var successstring = "<ul class='correct reponse-message'>" + 
                                    "<li>Great Job!!</li>" + 
                                    "<li>Username: "    + this.registrant.get('username')    + "</li>" + 
                                    "<li>Password: "    + this.registrant.get('password')    + "</li>" + 
                                    "<li>Confirm: "     + this.registrant.get('confirm')     + "</li>" + 
                                    "<li>First Name: "  + this.registrant.get('first')       + "</li>" + 
                                    "<li>Last Name: "   + this.registrant.get('last')        + "</li>" + 
                                    "<li>Birthdate: "   + this.registrant.get('birth')       + "</li>" +  
                                "</ul>";

            // CONVERT TO HTML OBJECT & APPEND TO DOM
            $(this.el).find("#statusmessage").empty().append( $.parseHTML( successstring ) ); 
            // EMPTY FIRST SO WE CON'T DOUBLE MSGS
        },

        printInvalid: function(errors) {

            // GENERATE ERRORS STRING
            var errorstring = "<ul class='incorrect reponse-message'>" + 
                                    "<li>YOU HAVE MADE THE FOLLOWING ERRORS:</li>" + errors + 
                              "<ul>";

            // CONVERT TO HTML OBJECT & APPEND TO DOM
            $(this.el).find("#statusmessage").empty().append( $.parseHTML( errorstring ) ); 
            // EMPTY FIRST SO WE CON'T DOUBLE MSGS
        },

        clearForm: function() {

            // CLEAR STRINGS FROM EACH INPUT
            $(this.el).find("#username").val('');
            $(this.el).find("#password").val('');
            $(this.el).find("#repeatPassword").val('');
            $(this.el).find("#first").val('');
            $(this.el).find("#last").val('');
            $(this.el).find("#date").val('');
        }

    });

})();
