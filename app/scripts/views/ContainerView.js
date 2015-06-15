/*global BBPractice, Backbone, JST*/

BBPractice.Views = BBPractice.Views || {};

(function () {
    'use strict';

    BBPractice.Views.ContainerView = Backbone.View.extend({

        template: '/scripts/templates/container_view.html',

        tagName: 'div',

        id: '',

        className: '',

        events : { 
            "click .header h3"       : "returnHome"
        },

        childView: null,

        initialize: function() {

            this.render();
        },

        render: function() {

            var _self = this; // STORE CONTEXT IN LOCAL VARIABLE USED IN BODY OF BELOW CALLBACKS

            $.ajax({
                url: this.template,
                dataType: "html",
                success: function (data) { // TRADIONAL PROMISE CALLBACKS

                    _self.$el.html( Mustache.render(data, {}) ); 

                    if( _self.childView ) { // NOT NULL
                        _self.$el.append(_self.childView.$el); // ROOT ENDPOINT HAS NO CHILD TO APPEND
                    }

                },
                error: function (data) {

                    console.log("error fetching html template from views/ContainerView.js"); 
                }
            });

            return this;
        },

        returnHome: function() {
            Backbone.history.navigate('/', {trigger:true});
        }

    });

})();

