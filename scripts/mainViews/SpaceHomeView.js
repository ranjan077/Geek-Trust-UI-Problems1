define([
	'text!SpaceHomeTemplate'],
	function(
	SpaceHomeTemplate) {
	var SpaceHomeView = Backbone.View.extend({
		
		className: 'space-home',

		initialize: function() {
			this.views = [];
			this.$el.html(SpaceHomeTemplate);
		},

		render: function() {
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

	return SpaceHomeView;
});