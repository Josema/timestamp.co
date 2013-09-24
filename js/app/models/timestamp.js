/* global require */
'use strict';

define([
	'backbone',
	'underscore',
	'app/consts'
], function (Backbone, _, Consts) {
	
	var Timestamp = Backbone.Model.extend({
		
		url: 'timeserver.php',
		
		defaults: {
			gmtreal: null,
			gmt: null,
			offset: 0,
			current: {},
			start: {},
			end: {}
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


		getData: function (date)
		{
			date = (typeof date == "number") ? new Date(date+this.get("offset")) : date;
			return {
				obj: date,
				militimestamp: date.getTime()-this.get("offset"),
				timestamp: Math.round((date.getTime()-this.get("offset"))/1000),
				year: date.getFullYear(),
				month: date.getMonth(),
				weekday: date.getDay(),
				day: date.getDate(),
				hour: date.getHours(),
				min: date.getMinutes(),
				sec: date.getSeconds(),
				mili: date.getMilliseconds()
			};
		},

		updateCurrent: function ()
		{
			this.set("current", this.getData(new Date().getTime()));
		},


		updateOffset: function ()
		{
			this.set("offset", (this.get("gmt")-this.get("gmtreal"))*Consts.MINS_HOUR);
		},


		onTimeserverSuccess: function (model)
		{
        	var servertime = new Date(model.get("timeserver").year, model.get("timeserver").month-1, model.get("timeserver").day, model.get("timeserver").hour).getTime();
			if (!isNaN(servertime))
			{
				var t = model.get("current");
				var currenttime = new Date(t.year, t.month, t.day, t.hour).getTime();
				var calc = ((currenttime-servertime)/Consts.MINS_HOUR);
				model.set({gmtreal: calc, gmt: calc});
			}
    	}
	});
	
	return Timestamp;
});