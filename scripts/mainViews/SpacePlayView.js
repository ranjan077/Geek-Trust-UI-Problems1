define(['SelectPlanetView',
	'SpaceTotalTimeView',
	'text!SpacePlayTemplate'], 

	function(
	SelectPlanetView,
	SpaceTotalTimeView,
	SpacePlayTemplate) {
	var SpacePlayView = Backbone.View.extend({

		className: 'space-play',

		initialize: function(options) {
			var that = this;
			that = _.extend(that, options);
			this.views = [];
			
			this.destinationID = 1;
			this.$el.html(SpacePlayTemplate);
			$('#main-view').html(this.el);
			this.setupViews();
			this.attachEvents();
		},

		setupViews: function() {
			this.setUpPlanetsViews(this.planets);
			this.setUpTimeTakenView();
		},
		
		setUpPlanetsViews: function(planets) {
			var view,totalTimeView;
			view = new SelectPlanetView({
				'el' : '#destination' + this.destinationID,
				'planets' : planets,
				'vehicles' : this.vehicles,
				'timeTaken' : this.timeTakenModel,
				'selectedTravelData' : this.selectedTravelData,
			});
			this.views.push(view);
		},

		setUpTimeTakenView: function() {
			var view;
			view = new SpaceTotalTimeView({'timeTaken' : this.timeTakenModel});
			this.$el.find('.time-taken').append(view.el);
			this.views.push(view);
		},

		attachEvents: function() {
			this.selectedTravelData.on('change', function selectedTravelDataHandler(obj) {
				this.planets.remove(obj.planet);
				_.each(this.views, function(view) {
					view.$el.addClass('disabled');
				});
				if(this.destinationID < 4) {
					this.destinationID = this.destinationID + 1;
					this.setUpPlanetsViews(this.planets);
				}
			}.bind(this));
		},

		unAttachEvents: function() {
			this.selectedTravelData.off();
		},

		render: function() {
			return this;
		},

		destroy: function() {
			_.each(this.views, function(view) {
				view.destroy();
			});
			this.views = [];
			this.unAttachEvents();
			this.remove();
		}
	});

	return SpacePlayView;
});