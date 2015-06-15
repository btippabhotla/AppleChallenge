/*global BBPractice, Backbone*/

BBPractice.Routers = BBPractice.Routers || {};

(function () {
    'use strict';

    BBPractice.Routers.AppRouter = Backbone.Router.extend({

	    // BINDING FUNCTIONS TO ENDPOINTS
	    routes: {
	    	''								: 'handle_index',
	        'challenge_one'					: 'handle_challenge_one',
	        'challenge_two'					: 'handle_challenge_two', 
	        'challenge_three'				: 'handle_challenge_three',
	        'challenge_three/stepone'		: 'handle_step_one',
	        'challenge_three/steptwo'		: 'handle_step_two',
	        'challenge_three/stepthree'		: 'handle_step_three',
	        'challenge_three/stepfour'		: 'handle_step_four',
	        '*other': 'default'
	    },

	    initialize: function() {

	    	// HOLDS RULESET TO CHECK AND VALIDATE INPUT FROM CHALLENGE ONE
	    	this.validationobject = new BBPractice.Models.SignupModel();

	    	// HOLDS PEOPLE DATA IN MEMORY FOR PRESENTATION IN CHALLENGE TWO
	    	this.peopleobject = new BBPractice.Collections.PeopleCollection();

	    	// HOLDS PERSISTENT DATA FROM MEMORY TO SUPPORT STEPS IN CHALLENGE THREE
	    	this.wizardobject = new BBPractice.Models.WizardModel();

	        // SUMMARY BLOCK DISPLAYED ON EACH STEP OF CHALLENGE THREE - LISTENER BOUND TO MODEL SO UPDATE VIEW WHEN CHANGED
	    	// this.accordian = new BBPractice.Views.AccordionView( { } ); EXPERIMENT DISCUESSED IN Challenge_two.js - LINE 50

	        // SUMMARY BLOCK DISPLAYED ON EACH STEP OF CHALLENGE THREE - LISTENER BOUND TO MODEL SO UPDATE VIEW WHEN CHANGED
	    	this.summaryblock = new BBPractice.Views.SummaryBlockView( { model: this.wizardobject } );

	    	// OUTER CHROME USED HOUSE NESTED VIEWS BOUND IN THE ENDPOINTS DEFINED BELOW
	        this.container = new BBPractice.Views.ContainerView({ el: $("#AppContainer") });
	    },

	    handle_index: function() {

			this.home_view = new Backbone.View({ className: 'container spec' });

			var spec = '<object src="/spec.pdf"><embed height="600px" width="100%" src="/scripts/templates/spec.html"></embed></object>';
			
			this.home_view.$el.append( spec );
			
	    	this.container.childView = this.home_view; // BIND ELEMENT AS NESTED TO PARENT IN DOM
	    	this.container.render();
	    },

	    handle_challenge_one: function() {
	        
	        this.one_view = new BBPractice.Views.ChallengeOne({ model: this.validationobject });

	        this.container.childView = this.one_view; // BIND ELEMENT AS NESTED TO PARENT IN DOM
	        this.container.render();
	    },

	    handle_challenge_two: function() {

	    	var _self = this;
	    	
			this.peopleobject.fetch( // STUB OUT DUMMY DATA FROM STATIC JSON FILE AS IF IT WERE AN API RESPONSE
			{
			    success: function () { // TRADITIONAL PROMISE
			        
					_self.two_view = new BBPractice.Views.ChallengeTwo({ model: _self.peopleobject });

			        _self.container.childView = _self.two_view; // BIND ELEMENT AS NESTED TO PARENT IN DOM

			        // _self.container.childView.accordionWidget = _self.accordian; // jquery ui accordian binding issues

			        _self.container.render();
			    },
			    error: function() {
			         console.log('Failed to fetch!');
			    }
			});
	    },

	    handle_challenge_three: function() {
	        
	        this.three_view = new BBPractice.Views.ChallengeThree();

	        this.container.childView = this.three_view; // BIND ELEMENT AS NESTED TO PARENT IN DOM
	        this.container.render();
	    },

	    handle_step_one: function() {

	    	this.handle_challenge_three();
	        
	        this.substep_one = new BBPractice.Views.StepOneView({ model: this.wizardobject });

	        this.three_view.challengeThreeBody = this.substep_one; // BIND ELEMENT AS NESTED TO PARENT IN DOM
	        this.three_view.challengeThreeSummary = this.summaryblock;

	        this.three_view.challengeThreeSummary.delegateEvents();
	        // http://stackoverflow.com/questions/18552478/backbone-view-event-firing-only-once-after-view-is-rendered

	        this.three_view.render();
	    },

	    handle_step_two: function() {

	    	this.handle_challenge_three();
	        
	        this.substep_two = new BBPractice.Views.StepTwoView({ model: this.wizardobject });

	        this.three_view.challengeThreeBody = this.substep_two; // BIND ELEMENT AS NESTED TO PARENT IN DOM
	        this.three_view.challengeThreeSummary = this.summaryblock;

	        this.three_view.challengeThreeSummary.delegateEvents();
	        // http://stackoverflow.com/questions/18552478/backbone-view-event-firing-only-once-after-view-is-rendered

	        this.three_view.render();
	    },

	    handle_step_three: function() {

	    	this.handle_challenge_three();
	        
	        this.substep_three = new BBPractice.Views.StepThreeView({ model: this.wizardobject });

	        this.three_view.challengeThreeBody = this.substep_three; // BIND ELEMENT AS NESTED TO PARENT IN DOM
	        this.three_view.challengeThreeSummary = this.summaryblock;

	        this.three_view.challengeThreeSummary.delegateEvents();
	        // http://stackoverflow.com/questions/18552478/backbone-view-event-firing-only-once-after-view-is-rendered

	        this.three_view.render();
	    },

	    handle_step_four: function() {

	    	this.handle_challenge_three();
	        
	        this.substep_four = new BBPractice.Views.StepFourView({ model: this.wizardobject });

	        this.three_view.challengeThreeBody = this.substep_four; // BIND ELEMENT AS NESTED TO PARENT IN DOM
	        this.three_view.challengeThreeSummary = this.summaryblock;

	        this.three_view.challengeThreeSummary.delegateEvents();
	        // http://stackoverflow.com/questions/18552478/backbone-view-event-firing-only-once-after-view-is-rendered

	        this.three_view.render();
	    },

	    default: function(other) {
	        $(document.body).html("Default route has been called...");
	    }

    });

    new BBPractice.Routers.AppRouter;
	Backbone.history.start();

})();