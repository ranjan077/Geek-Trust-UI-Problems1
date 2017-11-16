'use strict';

define([
	'httpHelper',
	'api',
	'Router',
	'SpacePlayView',
	'SpaceHomeView',
	'SpaceResultView',
	'SpaceTimeModel',
	'SpaceVehicleCollection'
	],

	function(
	http,
	api,
	Router,
	SpacePlayView,
	SpaceHomeView,
	SpaceResultView,
	SpaceTimeModel,
	SpaceVehicleCollection
	) {

	var App = function() {
		this.planets = new SpaceVehicleCollection();
		this.vehicles = new SpaceVehicleCollection();
		this.timeTakenModel = new SpaceTimeModel();
		this.cachedPlanets = [];
		this.cachedVehicles = [];
		this.selectedTravelData = [];
		this.views = [];
		this.selectedTravelData = _.extend(this.selectedTravelData, Backbone.Events);
		this.result = null;
	};

	App.prototype.fetchData = function() {
		var promises = [];

		// get planets and vehicles data
		promises.push(http.get(api.planets));
		promises.push(http.get(api.vehicles));
		promises.push(http.post(api.token));

		Promise.all(promises).then(function(responses) {
			this.cachedPlanets = responses[0];
			this.cachedVehicles = responses[1];
			this.planets.set(this.cloneData(this.cachedPlanets));
			this.vehicles.set(this.cloneData(this.cachedVehicles));
			this.token = responses[2].token;
			Backbone.history.start();
		}.bind(this));

		return promises;
	}

	App.prototype.init = function() {
		this.router = new Router();
		this.attachEvents();
		this.initRoutes();
		this.fetchData();
	}

	App.prototype.initRoutes = function() {
		this.router.on("route:play", function() {
			this.reset();
		}.bind(this));
		this.router.on("route:home", function() {
			this.destroy();
			this.setupHomeView();
		}.bind(this));
		this.router.on("route:result", function() {
			this.destroy();
			this.setupResultView();
		}.bind(this));
	}

	App.prototype.setupPlayView = function() {
		var view;
		view = new SpacePlayView({
			'planets': this.planets,
			'vehicles': this.vehicles,
			'selectedTravelData': this.selectedTravelData,
			'timeTakenModel' : this.timeTakenModel
		});
		this.views.push(view);
	}

	App.prototype.setupHomeView = function() {
		var view;
		view = new SpaceHomeView();
		this.views.push(view);
		$('#main-view').html(view.el);
	}

	App.prototype.setupResultView = function() {
		var view;
		view = new SpaceResultView(this.result);
		this.views.push(view);
		$('#main-view').html(view.el);
	}

	App.prototype.attachEvents = function() {
		this.selectedTravelData.on('change', function() {
			if(this.selectedTravelData.length === 4) {
				$('#findbtn').removeAttr('disabled');
			}
		}.bind(this));
		$('#main-view').off('click', '#findbtn').on('click','#findbtn', function(e) {
			e.preventDefault();
			this.getResult(); 
		}.bind(this));
		$('#reset').off('click').on('click', function(e) {
			e.preventDefault();
			Backbone.history.navigate('#play');
			this.router.trigger('route:play');
		}.bind(this));
	}

	App.prototype.unAttachEvents = function() {
		this.selectedTravelData.off();
		$('#main-view').off();
		$('#reset').off();
	}

	App.prototype.getResult = function() {
		var planetNames = [];
		var vehicleNames = [];
		var payload = this.selectedTravelData.reduce(function(curr, next) {
			planetNames.push(next.planet);
			vehicleNames.push(next.vehicle);
			return {
				'planet_names' : planetNames,
				'vehicle_names' : vehicleNames
			}
		}, {});
		http.post(api.find, payload, this.token).then(function(resp) {
			if(resp.status === 'success') {
				resp.timeTakenModel = this.timeTakenModel;
			}
			this.result = resp;
			this.router.navigate('#result', {trigger : true});
		}.bind(this), function(resp) {
			alert(resp.responseJSON.error);;
		});
	}

	App.prototype.cloneData = function(data) {
		var arr = [];
		data.forEach(function(item) {
			arr.push(_.clone(item));
		});

		return arr;
	},

	App.prototype.reset = function() {
		this.destroy();
		this.timeTakenModel.set('time', 0);
		this.planets.set(this.cachedPlanets);
		this.vehicles.set(this.cachedVehicles);
		this.attachEvents();
		this.setupPlayView();
	},

	App.prototype.destroy = function() {
		_.each(this.views, function(view) {
			view.destroy();
		});
		this.planets.set([]);
		this.vehicles.set([]);
		while(this.selectedTravelData.length) {
			this.selectedTravelData.pop();
		}
		this.unAttachEvents();
		this.views = [];
	}

	return new App();
	
});