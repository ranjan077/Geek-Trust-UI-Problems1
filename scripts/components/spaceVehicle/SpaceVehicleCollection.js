define(['SpaceVehicleModel'], function(SpaceVehicleModel) {
	var SpaceVehicleCollection = Backbone.Collection.extend({
		model: SpaceVehicleModel,
		modelId: function(attr) {
			return attr.name;
		}
	});

	return SpaceVehicleCollection; 
});