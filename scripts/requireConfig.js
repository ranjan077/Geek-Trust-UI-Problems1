require.config({
	base: '/Scripts',
	paths: {
		/* ROUTER */
		'Router': 'router/spaceRouter',

		/* VIEWS */
		'SpacePlayView': 'mainViews/SpacePlayView',
		'SpaceHomeView': 'mainViews/SpaceHomeView',
		'SpaceResultView': 'mainViews/SpaceResultView',
		'SelectPlanetView': 'components/selectPlanet/SelectPlanetView',
		'SpaceVehiclesView': 'components/spaceVehicle/SpaceVehiclesView',
		'SpaceTotalTimeView' : 'components/spaceTime/SpaceTotalTimeView',

		/* MODELS */
		'SpaceVehicleModel': 'components/spaceVehicle/SpaceVehicleModel',
		'SpaceTimeModel' : 'components/spaceTime/SpaceTimeModel',
		
		/* COLLECTIONS */
		'SpaceVehicleCollection' : 'components/spaceVehicle/SpaceVehicleCollection',

		/* TEMPLATES */
		'SpacePlayTemplate': 'templates/SpacePlayTemplate',
		'SpaceHomeTemplate': 'templates/SpaceHomeTemplate',
		'SpaceResultTemplate': 'templates/SpaceResultTemplate',
		'SelectPlanetTemplate': 'components/selectPlanet/SelectPlanetTemplate',
		'SpaceVehiclesTemplate': 'components/spaceVehicle/SpaceVehiclesTemplate',

		/* HELPER FILES */
		'httpHelper': 'lib/httpHelper',
		'api': 'lib/api'
	}
});