/*global define*/
'use strict';

define([], function () {
	return {

		//TYPES
		CURRENT: 'current',
		START: 'start',
		END: 'end',
		
		//EVENTS
		ON_CHANGE_INPUT: 'onchangeinput',
		ON_TIMESERVER_SUCCESS: 'ontimeserversuccess',

		//GENERAL
		TIMEINTERVAL: 51,
		MINS_HOUR: 3600000

	};
});