'use strict';

define([], function() {
	var SpaceTotalTimeView = Backbone.View.extend({

		template: '<h3>Time Taken: <%= value %>',

		className: 'space-time',
		
		initialize: function(options) {
			this.views = [];
			this.options = options || {};
			this.attacheEvents();
			this.render();
		},

		attacheEvents: function() {
			this.listenTo(this.options.timeTaken, 'change', function() {
				this.render();
			}.bind(this)); 
		},

		render: function() {
			var time = this.options.timeTaken.get('time');
			
			this.$el.html(_.template(this.template)({
				value : time
			}));
			
			return this;
		},

		destroy: function() {
			_.each(this.views, function(view) {
				view.destroy();
			});

			this.views = [];

			this.remove();
		}
	});

	return SpaceTotalTimeView;
});