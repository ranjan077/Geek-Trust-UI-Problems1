define(['httpHelper',
	'api',
	'SpaceVehiclesView',
	'SpaceVehicleCollection',
	'text!SelectPlanetTemplate'],

	function (
	http,
	api,
	SpaceVehiclesView,
	SpaceVehicleCollection,
	selectPlanetTemplate) {
	
	var selectPlanetView = Backbone.View.extend({

		className: 'select-palnet',

		events: {
			'click label' : 'toggleList',
			'click li' : 'selectPlanet',
			'keyup input' : 'renderNewList'
		},

		initialize: function(options) {
			this.options = options || {};
			this.views = [];
			this.distanceToPlanet = 0;
			this.selectedPlanet = null;
			this.vehicles = this.cloneCollection(this.options.vehicles);
			this.render(this.options.planets.toJSON());
		},

		unAttachEvents: function() {
			this.$el.off();
		},

		toggleList: function(e, type) {
			e.preventDefault();
			if(type === 'expand') {
				this.$el.find('.planet-list').slideDown(addClass.bind(this));
				return;
			} else {
				this.$el.find('.planet-list').slideToggle(toggleClass.bind(this));
			}

			function toggleClass() {
				this.$el.find('label').toggleClass('expand');
			}

			function addClass() {
				this.$el.find('label').addClass('expand');
			}
		},

		cloneCollection: function(collection) {
			var clonedCollection = new SpaceVehicleCollection();
			collection.each(function(model) {
  				clonedCollection.add(new Backbone.Model(model.toJSON()));
			}.bind(this));
			return clonedCollection;
		},

		selectPlanet: function(e) {
			var view = null;
			e.preventDefault();
			this.distanceToPlanet = $(e.target).data('distance');
			this.selectedPlanet = $(e.target).data('value')
			this.$el.find('input').val(this.selectedPlanet);
			this.toggleList(e);

			view= new SpaceVehiclesView({
				vehicles: this.vehicles,
				distance: this.distanceToPlanet
			});

			this.listenTo(this.vehicles, 'change', function(changed) {
				var model;
				model = this.options.vehicles.get(changed.toJSON().name);
				model.set({total_no: changed.toJSON().total_no});
				this.disableSelection();
				this.setTimeTaken(changed);
				this.setSelectedDetails(this.selectedPlanet, changed.get('name'));
			}.bind(this));

			this.$el.find('.vehicle-section').html(view.el);
			this.views.push(view);
		},

		disableSelection: function() {
			this.$el.find('input').attr('disabled', true);
			this.$el.off();
		},

		setTimeTaken: function(model) {
			var vehicleSpeed = model.get('speed'), timeTaken;
			timeTaken = (this.distanceToPlanet / vehicleSpeed) + this.options.timeTaken.get('time');
			this.options.timeTaken.set({
				time: timeTaken
			});
		},

		setSelectedDetails: function(planet, vehicle) {
			var obj = {
				planet : planet,
				vehicle : vehicle
			}
			this.options.selectedTravelData.push(obj);
			this.options.selectedTravelData.trigger('change', obj);
		},

		renderNewList: function(e) {
			e.preventDefault();
			var str = e.target.value.trim(), filteredPlanets = [], regex;
			if(str) {
				var regex = new RegExp(str, "i");
				filteredPlanets = this.options.planets.models.filter(function(planet) {
					return planet.get('name').search(regex) !== -1;
				}).map(function(model) {
					return model.toJSON();
				});
				this.render(filteredPlanets);
				this.toggleList(e, 'expand');
			} else {
				this.render();
			}
		},

		render: function(planets) {
			var data = {};
			data.planets = planets || this.options.planets.toJSON();
			var template = _.template(selectPlanetTemplate);
			this.$el.find('.planet-search').removeAttr('disabled');
			this.$el.find('.planet-list').html(template(data));
		},

		clearCollection: function(collection) {
			collection.models.forEach(function(model) {
				model.destroy();
			});
		},

		destroy: function() {
			_.each(this.views, function(view) {
				view.destroy();
			});
			this.selectedPlanet = null;
			this.clearCollection(this.vehicles);
			this.views = [];
			this.unAttachEvents();
			this.remove();
		}
	});

	return selectPlanetView;
})