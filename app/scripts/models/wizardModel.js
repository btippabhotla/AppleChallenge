/*global BBPractice, Backbone*/

BBPractice.Models = BBPractice.Models || {};

(function () {
    'use strict';

    BBPractice.Models.WizardModel = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
            username        : 'bmcferren',
            first           : 'Benjamin',
            last            : 'McFerren',
            email           : 'mcferren@seasidesyndication.com',
            account         : '',
            summaryState    : true
        },

        validate: function(attrs, options) {

            // DEFINING RETURNSTRING THAT WILL EITHER END UP EMPTY OR ROLLED WITH ERRORS
            var responsestring = "";

            // REGULAR EXPRESSION VARIABLE TO TEST WITH BELOW
            var patt;

            if( attrs.username.length == 0 )            { responsestring += "<li>ERROR: Username input is empty</li>"; }

            if( attrs.username.length > 50 )            { responsestring += "<li>ERROR: Username input may not be more than 50 characters</li>"; }

            if( attrs.first.length == 0 )               { responsestring += "<li>ERROR: First Name input is empty</li>"; }

            if( attrs.first.length > 50 )               { responsestring += "<li>ERROR: First Name input may not be more than 50 characters</li>"; }

            if( attrs.last.length == 0 )                { responsestring += "<li>ERROR: Last Name input is empty</li>"; }

            if( attrs.last.length > 50 )                { responsestring += "<li>ERROR: Last Name input may not be more than 50 characters</li>"; }

            patt = new RegExp("^[a-zA-Z]*$"); // * to allow empty strings

            if( !patt.test( attrs.username ) )          { responsestring += "<li>ERROR: Username input is letters only</li>"; }

            if( !patt.test( attrs.first ) )             { responsestring += "<li>ERROR: First Name input is letters only</li>"; }

            if( !patt.test( attrs.last ) )              { responsestring += "<li>ERROR: Last Name input is letters only</li>"; }

            if( !this.checkEmail( attrs.email ) )       { responsestring += "<li>ERROR: Email input must be a valid email address</li>"; }

            return responsestring;
        
        },

        parse: function(response, options)  {
            return response;
        },

        checkEmail: function validateEmail(email) {             // ARGUMENT IS A STRING

            if(typeof email != 'string') {                      // TYPE CHECK ASSURANCE - - instanceof IS BUNK!!
                return false;
            }

            return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(email);
        }
    });

})();
