'use strict';

define([], function() {
	var SpaceTotalTimeView = Backbone.View.extend({

		template: '<span class="time-taken">Time taken:</span><h3><%= value %></h3>',

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