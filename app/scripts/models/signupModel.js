BBPractice.Models = BBPractice.Models || {};

(function () {
    'use strict';

    BBPractice.Models.SignupModel = Backbone.Model.extend({

        url: '',

        initialize: function() {
            
        },

        defaults: {
            username: '',
            password: '',
            confirm:  '',
            first:    '',
            last:     '',
            birth:    ''
        },

        // VALIDATION CONDITIONS THAT RETURN STRING ACCUMULATION TO PRESENT UNDERNEATH FORM
        validate: function(attrs, options) {

            // DEFINING RETURNSTRING THAT WILL EITHER END UP EMPTY OR ROLLED WITH ERRORS
            var responsestring = "";

            // REGULAR EXPRESSION VARIABLE TO TEST WITH BELOW
            var patt;

            if( attrs.username.length == 0 )            { responsestring += "<li>ERROR: Username input is empty</li>"; }

            if( attrs.username.length > 56 )            { responsestring += "<li>ERROR: Username input cannot be longer than 56 characters</li>"; }

            if( !this.checkEmail( attrs.username ) )    { responsestring += "<li>ERROR: Must add a valid email address to username input</li>"; }

            if( attrs.password.length == 0 )            { responsestring += "<li>ERROR: Password input is empty</li>"; }

            if( attrs.confirm.length == 0 )             { responsestring += "<li>ERROR: Confirm input is empty</li>"; }

            patt = new RegExp("[A-Za-z0-9]{6}");

            if( !patt.test( attrs.password ) )          { responsestring += "<li>ERROR: Password input must be at least 6 characters</li>"; }

            if( !patt.test( attrs.confirm ) )           { responsestring += "<li>ERROR: Confirm input must be at least 6 characters</li>"; }

            if( attrs.password !== attrs.confirm )      { responsestring += "<li>ERROR: Password and Confirm must match</li>"; }

            if( attrs.first.length == 0 )               { responsestring += "<li>ERROR: First Name input is empty</li>"; }

            if( attrs.first.length > 50 )               { responsestring += "<li>ERROR: First Name input may not be more than 50 characters</li>"; }

            if( attrs.last.length > 50 )                { responsestring += "<li>ERROR: Last Name input may not be more than 50 characters</li>"; }

            patt = new RegExp("^[a-zA-Z]*$"); // * to allow empty strings

            if( !patt.test( attrs.first ) )             { responsestring += "<li>ERROR: First Name input is letters only</li>"; }

            if( !patt.test( attrs.last ) )              { responsestring += "<li>ERROR: Last Name input is letters only</li>"; }

            if( attrs.birth.length == 0 )               { responsestring += "<li>ERROR: Birthdate input is required</li>"; }

            var rawdate = new Date( attrs.birth );

            if( isNaN( rawdate.getTime() ) )            { responsestring += "<li>ERROR: Birthdate input is not a date</li>"; }

            if( this.calculateAge(rawdate) < 14 )       { responsestring += "<li>ERROR: User must be at least 14</li>"; }

            if( this.calculateAge(rawdate) > 150 )      { responsestring += "<li>ERROR: User must be younger than 150</li>"; }

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
        },

        calculateAge: function (birthday) {                     // ARGUMENT IS A DATE
        // http://stackoverflow.com/questions/4060004/calculate-age-in-javascript

            if( !(birthday instanceof Date) ) {                 // TYPE CHECK ASSURANCE
                return false;
            }

            var today = new Date();
            var age = today.getFullYear() - birthday.getFullYear();
            var m = today.getMonth() - birthday.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
                age--;
            }

            return age;
        }
    });

})();