define([], function() {
	var Http = function() {
		this.get = function(url) {
			var promise = $.ajax({
				url: url,
				method: 'GET',
				headers: {
					Accept: 'application/json'
				}
			});
			return promise;
		}
									
		this.post = function(url, payload, token) {
			var options = {
				url: url,
				method: 'POST',
				headers: {
					'Accept': 'application/json',
				}
			};

			if(payload) {
				options.contentType = 'application/json';
				options.data = JSON.stringify({
					'token' : token,
					'planet_names' : payload['planet_names'],
					'vehicle_names' : payload['vehicle_names']
				});
			}
			var promise = $.ajax(options);
			return promise;
		}
	}

	return new Http();
});