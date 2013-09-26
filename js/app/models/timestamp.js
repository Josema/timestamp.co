/* global require */
'use strict';

define([
	'backbone',
	'underscore',
	'app/consts',
	'prototype/date'
], function (Backbone, _, Consts) {
	
	var Timestamp = Backbone.Model.extend({
		
		url: 'timeserver.php',
		
		defaults: {
			gmtreal: null,
			gmt: null,
			offset: 0,
			current: new Date(),
			start: new Date(),
			end: new Date()
		},


		initialize: function ()
		{
			this.on('change:gmt', _.bind(this.updateOffset, this));
			this.interval = setInterval(
				_.bind(this.updateCurrent, this), //this.onInterval.bind(this) Native option Doesn't work on IE8-7
				Consts.TIMEINTERVAL
			);
			
			this.updateCurrent();
			this.fetch({success: this.onTimeserverSuccess});
		},


		updateCurrent: function ()
		{
			this.get('current').setTime(new Date());
			this.updateDate(this.get('current'));
			this.trigger(Consts.ON_CHANGE_CURRENT);
		},


		updateOffset: function ()
		{
			this.set('offset', (this.get('gmt')-this.get('gmtreal'))*Consts.MINS_HOUR);
		},


		onTimeserverSuccess: function (model)
		{
			var servertime = new Date(model.get('timeserver').year, model.get('timeserver').month-1, model.get('timeserver').day, model.get('timeserver').hour).getTime();
			if (!isNaN(servertime))
			{
				var t = model.get('current');
				var currenttime = new Date(t.year, t.month, t.day, t.hour).getTime();
				var calc = ((currenttime-servertime)/Consts.MINS_HOUR);
				model.set({gmtreal: calc, gmt: calc});
			}
    	},
    	

		updateDate: function (date)
		{
			var temp = new Date(date.getTime()+this.get('offset'));
			date.militimestamp = temp.getTime()-this.get('offset');
			date.timestamp = Math.round((temp.getTime()-this.get('offset'))/1000);
			date.year = temp.getFullYear();
			date.month = temp.getMonth();
			date.weekday = temp.getDay(),
			date.day = temp.getDate();
			date.hour = temp.getHours();
			date.min = temp.getMinutes();
			date.sec = temp.getSeconds();
			date.mili = temp.getMilliseconds();
			date.dayyear = temp.getDayYear();
		}
	});
	
	return Timestamp;
});