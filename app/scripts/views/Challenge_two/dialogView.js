/*global BBPractice, Backbone, JST*/

BBPractice.Views = BBPractice.Views || {};

(function () {
    'use strict';

    BBPractice.Views.DialogView = Backbone.View.extend({

        createTemplate: '/scripts/templates/Challenge_two/create-dialog.html',

        deleteTemplate: '/scripts/templates/Challenge_two/delete-dialog.html',

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {

            this.render();
        },

        render: function () {
                        
            var _self = this; // STORE CONTEXT IN LOCAL VARIABLE USED IN BODY OF BELOW CALLBACKS

            // TRYING TO KEEP THIS VIEW GENERIC && INTERPRATIVE
            var templateconditional;
            this.model.modaltype === 'create'
            ? templateconditional = this.createTemplate
            : templateconditional = this.deleteTemplate

            $.ajax({
                url: templateconditional,
                dataType: "html",
                success: function (data) { // TRADIONAL PROMISE CALLBACKS

                    _self.$el.html( Mustache.render(data, { } ) ); 

                    _self.instantiateJquery();
                },
                error: function (data) {

                    console.log("error fetching html template from views/Challenge_two/createDialog.js"); 
                }
            });

            return this;
        },

        instantiateJquery: function() {

            var _self = this;

            this.createDialog = $( this.el ).find( "#dialog-form" ).dialog({

                autoOpen: true,
                height: this.model.modalheight,
                width: this.model.modalwidth,
                modal: true,
                draggable: false,
                buttons: [
                    {
                        text: this.model.modaltitle,
                        click: function() { 

                            if( _self.model.modaltype == 'delete') { // TRYING TO KEEP THIS VIEW GENERIC && INTERPRATIVE

                                _self.removePerson( _self.model.rowindex );
                                $( this ).dialog( "destroy").remove(); // WITHOUT DESTROY & REMOVE, JQUERY UI LEAVES AN ACCUMALATED MESS
                                // http://stackoverflow.com/questions/2864740/jquery-how-to-completely-remove-a-dialog-on-close

                            } else {

                                // POPULATE TEMP person OBJECT WITH PROPERTY VALUES RETURNED FROM createPerson FUNCTION
                                var tempperson = _self.createPersonFactory();

                                if( tempperson.isValid() ) {

                                    // ADD TO newperson OBJECT TO peoplecollection
                                    _self.model.peoplecollection.unshift( tempperson );

                                    // IF NO ERROR, THEN DESTROY DIALOG MODAL
                                    $( this ).dialog( "destroy").remove(); // WITHOUT DESTROY & REMOVE, JQUERY UI LEAVES AN ACCUMALATED MESS
                                    // http://stackoverflow.com/questions/2864740/jquery-how-to-completely-remove-a-dialog-on-close
                                }
                            }
                        }
                    }
                ],
                close: function() {
                    $(this).dialog( "destroy" ).remove();  // WITHOUT DESTROY & REMOVE, JQUERY UI LEAVES AN ACCUMALATED MESS
                    // http://stackoverflow.com/questions/2864740/jquery-how-to-completely-remove-a-dialog-on-close
                }
            });
        },

        removePerson: function( index ) {
            this.model.peoplecollection.remove( this.model.peoplecollection.at( index ) );
        },

        // INSTANTIATES NEW PERSON OBJECT AND RETURNS IT TO THE CALLER
        createPersonFactory: function() {

            var newperson = new BBPractice.Models.PersonModel({});
            
            // STORE CONTEXT IN LOCAL VARIABLE TO BE USED IN BELOW CALLBACK LISTENNER            
            var _self = this;

            // BIND A LISTEN EVENT TO THE registrant OBJECT TO READ ANY ERROR MESSAGES
            Backbone.listenTo( newperson, 'invalid', function(model,error,options){ // 

                if( error.length != 0 ) {

                    // IF ERROR, THEN BIND ERROR MESSAGE TO DOM
                    _self.printInvalid( error );
                } 
            });

            newperson.set('username',  $("#username").val() );                  // LAZY -> $(this.el).find("#username").val()
            newperson.set('first',     $("#first").val() );                     // LAZY -> $(this.el).find("#first").val(),
            newperson.set('last',      $("#last").val() );                      // LAZY -> $(this.el).find("#last").val(),
            newperson.set('status',    "Offline" );
            newperson.set('email',     $("#email").val() );                     // LAZY -> $(this.el).find("#email").val(),
            newperson.set('bio',       $("#bio").val() );                       // LAZY -> $(this.el).find("#bio").val(),
            newperson.set('login',     new Date("2015-06-02T07:00:00.000Z") );  // WASHING DATE FORMATTING AS INSTRUCTED - AMBIGUITY AMONGST MEMORY VS MOCK SERVER POST
            newperson.set('l_onstage', true );                                  // WHERE IS THE CONTEXT?? NEED TO SPEND MORE TIME INVESTIGATING NESTED CONTEXT

            // FIRST WASH birthday INPUT // NEED TO SUBMIT BIRTHDATE AS ISO 8601
            if( $("#birthday").val().length != 0 ) {                   
                var rawdate = new Date( $("#birthday").val() );        // LAZY -> $(this.el).find("#birthday").val(),
                newperson.set('birthday', rawdate.toISOString() );     // WE CAN SEND AN ISO 8601 STRING
            } else {
                newperson.set('birthday', '' ); // STRING OF ZERO LENGTH TO BE CAUGHT BY MODEL VALIDATOR
            }

            // RETURN DEEP COPY
            return newperson;
        },

        printInvalid: function(errors) {

            // GENERATE ERRORS STRING
            var errorstring = "<ul class='incorrect reponse-message'>" + 
                                    "<li>YOU HAVE MADE THE FOLLOWING ERRORS:</li>" + errors + 
                              "<ul>";

            // CONVERT TO HTML OBJECT & APPEND TO DOM
            $("#statusmessage").empty().append( $.parseHTML( errorstring ) );  // LAZY -> $(this.el).find("#statusmessage")
            // empty first so we don't double msgs
        }

    });

})();
