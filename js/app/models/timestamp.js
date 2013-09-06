/* global require */
'use strict';

define([
	'backbone',
	'app/consts'
], function (Backbone, Consts) {
	
	var Timestamp = Backbone.Model.extend({

		constructor: function () {
			//self = this;
			this.interval = setInterval(
				this.onInterval.bind(this),
				Consts.TIMEINTERVAL
			);
			//this.render();
		},

		onInterval: function () {
			this.trigger(Consts.ON_INTERVAL);
	    }

	});
	
	return Timestamp;
});