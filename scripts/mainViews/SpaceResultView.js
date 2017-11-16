define([
	'text!SpaceResultTemplate'],
	function(
	SpaceResultTemplate) {
	var SpaceResultView = Backbone.View.extend({
		
		className: 'space-result',

		initialize: function(data) {
			this.views = [];
			this.render(data);
		},

		render: function(data) {
			var template = _.template(SpaceResultTemplate);
			this.$el.html(template(data));
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

	return SpaceResultView;
});