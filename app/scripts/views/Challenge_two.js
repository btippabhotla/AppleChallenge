/*global BBPractice, Backbone, JST*/

BBPractice.Views = BBPractice.Views || {};

(function () {
    'use strict';

    BBPractice.Views.ChallengeTwo = Backbone.View.extend({

        template: '/scripts/templates/challenge_two.html',

        tagName: 'div',

        id: 'chal-two',

        className: 'container',

        accordionWidget: null, // defined in appRouter

        dialogelement: null,

        currentsortcriteria: 'status',

        events: {
            "click #add-person"       : "promptAddPersonModal",
            "click .delete-person"    : "promptDeletePersonModal",
            "click .table-heading li" : "sortByProperty",
            'drop'                    : 'drop'
        },

        initialize: function() {

            this.listenTo(this.model, 'sort add remove', this.render); // TO AUTOMATICALLY UPDATE VIEW ON EVENT FIRING

            this.render();
        },

        render: function() {

            var _self = this; // STORE CONTEXT IN LOCAL VARIABLE USED IN BODY OF BELOW CALLBACKS

            $.ajax({
                url: this.template,
                dataType: "html",
                success: function (data) { // TRADIONAL PROMISE CALLBACKS
                    
                    _self.$el.html( Mustache.to_html(data, {
                        torender_peoplelist : _self.model.toJSON() // NON-EMPTY LIST                     
                    }) ); // MUSTACHE WILL ITERATE AN RENDER EACH INDEX IN THE VIEW

                    // THERE IS A RACE CONDITION RELATIVE TO BINDING THE JQUERY UI ACCORDION TO THE MUSTACHE TEMPLATE
                    // IF I DO IT BELOW WITH A TIMEOUT, THERE IS A FLICKR ISSUE AND IT LOOKS MORE LIKE A HACK
                    // IF I DO IT INLINE IN THE TEMPLATE, IT LOOKS MORE AMATEUR BUT NO FLICKER
                    // I CHOSE INLINE IN THE TEMPLATE FOR REASONS OF PRESENTATION

                    // , function() {
                    // setTimeout(function() { // SEE CALLBACK NOTES BELOW DESCRIBING MUSTACHE CALLBACKS
                    // $('#accordion').html(rendered).promise().done(function() {  
                    // $( "#accordion" ).ready(function() {

                            // .. accordian markup currently found in template ...
                            
                    // });
                    // }) ); 
                    // }, 10); 
                    // HACK THAT WAITS SO JQUERY UI ACCORDIAN BINDS TO #ID DOM ELEMENT
                    // CAN'T FIND A CALLBACK FOR MUSTACHE: 
                    // https://github.com/janl/mustache.js/commit/c6aef7ea1299273038a033ed96adc6dd8237d329
                    // http://stackoverflow.com/questions/14666557/how-to-run-a-callback-when-mustache-js-has-finished-rendering-template
                    // ONLY OTHER CHOICE WAS PUTTING A SCRIPT TAG AT THE BOTTOM OF THE TEMPLATE FILE ITSELF WITH THE ACCORDIAN BINDING BUT THEN I CAN"T REFERENCE STORED PROPERTY VARIABLE 

                },
                error: function (data) {

                    console.log("error fetching html template from views/Challenge_two.js"); 
                }
            });

            return this;
        },

        promptAddPersonModal: function() {

            this.dialogelement = new BBPractice.Views.DialogView({
                model: {
                    modaltype           : "create",
                    modalheight         : 475,
                    modalwidth          : 400,
                    modaltitle          : "Add New Person",
                    peoplecollection    : this.model
                }
            });

            // IMPORTANT TO USE empty() SO YOU DON'T CONTINUE APPENDING NEW MODALS FOR EVERY NEW ADD OR DELETE IN SESSION
            $(this.el).find("#dialogmodal").empty().append(this.dialogelement.$el); 
        },

        promptDeletePersonModal: function(ev) {

            this.dialogelement = new BBPractice.Views.DialogView({
                model: {
                    modaltype           : "delete",
                    modalheight         : 150,
                    modalwidth          : 400,
                    modaltitle          : "Confirm Delete Person",
                    rowindex            : $(ev.target).parents( ".group" ).index(),
                    peoplecollection    : this.model
                }
            });

            // IMPORTANT TO USE empty() SO YOU DON'T CONTINUE APPENDING NEW MODALS FOR EVERY NEW ADD OR DELETE IN SESSION
            $(this.el).find("#dialogmodal").empty().append(this.dialogelement.$el); 
        },

        sortByProperty: function(ev) {

            var _self = this;

            var sortcriteria = $(ev.target).attr('sort');

            if( this.currentsortcriteria === sortcriteria ) {  // DESCENDING
            // http://stackoverflow.com/questions/5636812/sorting-strings-in-reverse-order-with-backbone-js/5639070#5639070

                // UPDATE THE COMPARATOR FUNCTION OF THE personobject WITH DECENDING FUNCTION
                this.model.comparator = function(personA, personB) {
                    
                    if (personA.get( sortcriteria ) > personB.get( sortcriteria )) return -1; // before
                    if (personB.get( sortcriteria ) > personA.get( sortcriteria )) return 1; // after
                    return 0; // equal
                }

                // SET TO NULL FOR FUTURE TOGGLING
                this.currentsortcriteria = null;

            } else { // ASCENDING

                // UPDATE THE COMPARATOR FUNCTION OF THE personobject
                this.model.comparator = function(model) {
                    return model.get( sortcriteria );
                }

                // SET TO VALUE FOR FUTURE DESCENDING
                this.currentsortcriteria = sortcriteria;
            }

            this.model.sort();
        },

        drop: function(event, endindex) {

            // startindex IS THE ORIGINAL POSITION OF THE TARGET OBJECT
            // endindex IS THE DESTINATION POSITION OF THE TARGET OBJECT

            // STORE TARGET OBECT IN LOCAL VARIABLE FOR USE IN SWAP MANEUVER
            var targetobject = this.model.at( $(event.target).attr('startindex') );

            this.model.remove( targetobject );
            this.model.add( targetobject, {at: endindex});

            // SET TO NULL FOR FUTURE SORT TOGGLING
            this.currentsortcriteria = null;
        }

    });

})();