/*global BBPractice, Backbone*/

BBPractice.Models = BBPractice.Models || {};

(function () {
    'use strict';

    BBPractice.Models.PersonModel = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
            "username"  : "",
            "first"     : "",
            "last"      : "",
            "status"    : "",
            "email"     : "",
            "birthday"  : "",
            "bio"       : "",
            "login"     : "",
            "l_onstage" : ""
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

            if( attrs.birthday.length == 0 )            { responsestring += "<li>ERROR: Birthdate input is required</li>"; }

            var rawdate = new Date( attrs.birthday );

            if( isNaN( rawdate.getTime() ) )            { responsestring += "<li>ERROR: Birthdate input is not a date</li>"; }

            if( this.calculateAge(rawdate) < 14 )       { responsestring += "<li>ERROR: User must be at least 14</li>"; }

            if( this.calculateAge(rawdate) > 150 )      { responsestring += "<li>ERROR: User must be younger than 150</li>"; }

            if( attrs.bio.length == 0 )                 { responsestring += "<li>ERROR: Bio input is empty</li>"; }

            if( attrs.bio.length > 350 )                { responsestring += "<li>ERROR: Bio input may not be more than 350 characters</li>"; }

            if( !["Available", 
                  "Busy", 
                  "Idle", 
                  "Offline"].indexOf( attrs.status ) )  { responsestring += "<li>ERROR: Status value is not valid</li>" ; }

            return responsestring;
        },

        parse: function(response, options)  {

            // INTERCEPT WHAT IS CAPTURED FROM THE RAW .JSON FILE AND CONVERT DATE FORMATTING
            var bd = new Date(response.birthday);
            var ld = new Date(response.login);

            // REDEFINE BIRTHDAY PROPERTIES IN FETCHED DATA OBJECT
            response.birthday = bd;
            response.login = ld;
            
            // RETURNED CONVERTED VERSION OF FETCHED DATA OBJECT
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
