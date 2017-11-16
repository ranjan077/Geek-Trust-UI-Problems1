define(['httpHelper',
	'api',
	'text!SpaceVehiclesTemplate'],

	function (
	http,
	api,
	spaceVehiclesTemplate) {
	
	var spaceVehiclesView = Backbone.View.extend({

		className: 'space-vehicles',

		events: {
			'click li': 'selectVehicle'
		},

		views: [],
		
		initialize: function(options) {
			this.options = options || {};
			this.setupViews();
			this.attachEvents();
			this.render(this.options.vehicles.toJSON());
		},

		setupViews: function() {
			this.$el.html('<ul class="space-vehicles-list"></ul>')
		},

		attachEvents: function() {
			this.listenTo(this.options.vehicles,'change', function(changed){
				this.render(this.options.vehicles.toJSON(), changed);
			}.bind(this));
		},

		unAttachEvents: function() {
			this.$el.off();
		},

		selectVehicle: function(e) {
			var count;
			e.stopPropagation();
			if($(e.currentTarget).hasClass('enable')) {
				_.each(this.options.vehicles.models, function(model) {
					if(model.get('name') === $(e.currentTarget).data('value')) {
						count = model.get('total_no') - 1;
						model.set('total_no', count);
					}
				}.bind(this));
			}
		},

		render: function(vehicles, changed) {
			var data = {};
			data.vehicles = vehicles;
			data.distance = this.options.distance;
			data.cid = this.cid;
			data.selectedOption = '';
			if(changed) {
				data.selectedOption = changed.get('name');
			}
			var template = _.template(spaceVehiclesTemplate);
			this.$el.find('.space-vehicles-list').html(template(data));
		},

		destroy: function() {
			_.each(this.views, function(view) {
				view.remove();
			});

			this.views = [];
			this.unAttachEvents();
			this.remove();
		}
	});

	return spaceVehiclesView;
});