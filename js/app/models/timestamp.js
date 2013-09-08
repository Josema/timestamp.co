/* global require */
'use strict';

define([
	'backbone',
	'underscore',
	'app/consts'
], function (Backbone, _, Consts) {
	
	var Timestamp = Backbone.Model.extend({
		
		current: {},

		constructor: function () {
			this.update();
			this.interval = setInterval(
				_.bind(this.update, this), //this.onInterval.bind(this) Native option Doesn't work on IE8-7
				Consts.TIMEINTERVAL
			);
		},

		update: function () {
			this.current = this.get(new Date());
			this.trigger(Consts.ON_UPDATE);
		},
		
		get: function (date) {
			date = (typeof date == "number") ? new Date(date) : date;
			return {
				obj: date,
				militimestamp: date.getTime(),
				timestamp: Math.round(date.getTime()/1000),
				year: date.getFullYear(),
				month: date.getMonth(),
				weekday: date.getDay(),
				day: date.getDate(),
				hour: date.getHours(),
				min: date.getMinutes(),
				sec: date.getSeconds(),
				mili: date.getMilliseconds()
			};
		}

	});
	
	return Timestamp;
});