define([], function() {
	var Router = Backbone.Router.extend({
		routes : {
			'play' : 'play',
			'home' : 'home',
			'result': 'result',
			'*path' : 'home'
		}
	});

	return Router;
});