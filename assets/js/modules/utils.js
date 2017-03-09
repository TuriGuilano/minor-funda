var utils = (function() {
	// Sets homepage if parameter is set to true
	var homepage = function(state) {
		var homeSections = ['header', 'footer'];
		homeSections.map(function(section) {
			var element = document.querySelector(section);

			// Renders mosaic background
			template.render.mosaic(template.navigation);

			if (state === true) {
				element.classList.add('home');
			} else {
				element.classList.remove('home');
			}
		});
	};

	// Makes an API-request with fetch
	var request = function(url, callback) {
		fetch(url)
			.then(function(response) {
				if (response.status !== 200) {
					console.error('There was an error with status code: ' + response.status);
					return;
				}

				// Examine the text in the response
				response.json().then(function(data) {
					callback(data);
				});
			})
			.catch(function(err) {
				console.error('Fetch Error: ', err);
			});
	};

	// JSONP request for CORS API-requests
	var JSONP = (function() {
		var send = function(url, settings) {
			var head = document.querySelector('head');
			var timeoutTrigger = window.setTimeout(function() {
				settings.onTimeout();
			}, settings.timeout);

			window['callback'] = function(data){
				window.clearTimeout(timeoutTrigger);
				settings.onSuccess(data);
			}

			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.async = true;
			script.src = url;
			head.appendChild(script);
		}

		return {
			send: send
		};

	}) ();

	// Checks index of value in chosen array
	var checkArray = function(value, arr) {
		return arr.indexOf(value);
	};

	// Converts nodelist to array
	var convertToArray = function(arr) {
		return Array.prototype.slice.call(arr);
	};

	// Removes every child of selected element
	var clearList = function(list) {
		while (list.firstChild) {
			list.removeChild(list.firstChild);
		}
	};

	// Converts number to thousand notation
	var numberWithPeriods = function(number) {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	};

	// Provides user with feedback
	var feedback = function(msg, state) {
		var label = document.querySelector('#feedback');

		label.textContent = msg;
		label.className = '';
		label.classList.add(state);
		label.classList.add('active');

		setTimeout(function() {
			label.classList.remove('active');
		}, 2500);
	};

	return {
		homepage: homepage,
		request: request,
		JSONP: JSONP,
		checkArray: checkArray,
		convertToArray: convertToArray,
		clearList: clearList,
		numberWithPeriods: numberWithPeriods,
		feedback: feedback
	};

}) ();
