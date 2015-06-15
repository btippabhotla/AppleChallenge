/*global BBPractice, Backbone, JST*/

BBPractice.Views = BBPractice.Views || {};

(function () {
    'use strict';

    // JUST FOR EXPERIMENTAL PURPOSES RELATIVE TO THE ACCORDION FLICKER & RACE CONDITION
    // ISSUE DISCUESSED IN Challenge_two.js - LINE 50
    BBPractice.Views.AccordionView = Backbone.View.extend({

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.render(); 
        },
     
        render: function() {

            $('#accordion').accordion({ 
                header          : ".accordion-handle",
                active          : false,
                collapsible     : true,
                beforeActivate  : function( event, ui ) {

                    if( $(event.originalEvent.target).hasClass('delete-person') ) { 

                        event.preventDefault(); 
                        $( this ).accordion( "disable" );
                    }
                }
            })
            .sortable({ 
                placeholder : "ui-sortable-placeholder",
                axis        : "y",
                start       : function (event, ui) {

                                // BINDING ATTR TO DRAGGED ELEMENT AS A MANNER TO PASS STARTING INDEX
                                $(ui.item).attr("startindex", ui.item.index()); 
                },
                stop        : function( event, ui ) {
                                // IE doesn't register the blur when sorting
                                // so trigger focusout handlers to remove .ui-state-focus
                                ui.item.children( ".accordion-handle" ).triggerHandler( "focusout" );

                                // THE STOP EVENT IS BOUND TO A FUNCTION THAT TRIGGERS DROP ON THE DOM NODE WITH INDEX ARG
                                ui.item.trigger('drop', ui.item.index());

                                // REFRESH ACCORDIAN TO HANDLE NEW ORDER
                                $( this ).accordion( "refresh" );
                }
            });

            return this;
        }

    });

})();
