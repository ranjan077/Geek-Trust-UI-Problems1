define([], function() {
	var SpaceTimeModel = Backbone.Model.extend({
		defaults: {
			time: 0
		}
	});

	return SpaceTimeModel; 
});