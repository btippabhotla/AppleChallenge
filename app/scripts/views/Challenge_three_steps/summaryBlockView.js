/*global BBPractice, Backbone, JST*/

BBPractice.Views = BBPractice.Views || {};

(function () {
    'use strict';

    BBPractice.Views.SummaryBlockView = Backbone.View.extend({

        template: '/scripts/templates/Challenge_three_steps/summary_block.html',

        tagName: 'div',

        id: '',

        className: 'summary-block',

        events: {
          "click span" : "hideSummary",
          "click em"   : "showSummary"
        },

        initialize: function(){

            this.listenTo(this.model, "change", this.render); // REFRESH VIEW WHEN wizardModel PROPERTOES ARE MODIFIED 

            this.render();
        },

        render: function() {

            var _self = this; // STORE CONTEXT IN LOCAL VARIABLE USED IN BODY OF BELOW CALLBACKS

            $.ajax({
                url: this.template,
                dataType: "html",
                success: function (data) { // TRADIONAL PROMISE CALLBACKS

                    _self.$el.html( Mustache.render(data, { 
                        username    : _self.model.get('username'),
                        first       : _self.model.get('first'),
                        last        : _self.model.get('last'),
                        email       : _self.model.get('email'),
                        account     : _self.model.get('account')
                    }) ); 

                    if( _self.model.get('summaryState') == false ) {
                        $(_self.el).find("em").show();
                        $(_self.el).find("#summary").hide();
                    } // RERENDER INSIDE showSummary NEEDS TO FALL THROUGH HERE
                },
                error: function (data) {

                    console.log("error fetching html template from views/Challenge_three_steps/summaryBlockView.js"); 
                }
            });

            return this;
        },

        showSummary: function() { // TRIED TO STAY LOYAL TO MODIFYING DATA INSTEAD OF DOM MANIPULATION 

            this.model.set('summaryState', true );
            $(this.el).find("em").hide();

            this.render(); // HAVE TO RERENDER BECAUSE MUSTACHE LOOSES VARIABLE UPON JQUERY HIDE
        },

        hideSummary: function() { // TRIED TO STAY LOYAL TO MODIFYING DATA INSTEAD OF DOM MANIPULATION 
            
            this.model.set('summaryState', false );
        }

    });

})();
