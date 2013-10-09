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
			mondayfirstday: true,
			current: new Date(),
			start: new Date(),
			end: new Date()
		},
		

		config: {
			time: ['Time'],
			timestamp: ['Timestamp', ['timestamp', 'mili']],
			year: ['FullYear', ['year', 'mili']],
			month: ['MonthReal', ['mili']],
			day: ['Date', ['mili']],
			hour: ['Hours', ['mili']],
			min: ['Minutes', ['mili']],
			sec: ['Seconds', ['mili']],
			weekday: ['WeekDay', ['mili']],
			weekyear: ['WeekYear', ['mili']],
			dayyear: ['DayYear', ['mili']],
			mili: ['Milliseconds']
		},


		initialize: function ()
		{
			this.updateProperties('current');
			this.on('change:gmt', _.bind(this.onUpdateOffset, this));
			this.fetch({success: this.onTimeserverSuccess});
			this.interval = setInterval(
				_.bind(this.onUpdateCurrent, this), //this.onInterval.bind(this) Native option Doesn't work on IE8-7
				Consts.TIMEINTERVAL
			);

		},


		onTimeserverSuccess: function (model)
		{
			var servertime = new Date(model.get('timeserver').year, model.get('timeserver').month-1, model.get('timeserver').day, model.get('timeserver').hour).getTime();
			if (!isNaN(servertime))
			{
				var t = model.get('current').pro;
				var currenttime = new Date(t.year, t.month-1, t.day, t.hour).getTime();
				var calc = ((currenttime-servertime)/Consts.MINS_HOUR);
				model.set({gmtreal: calc, gmt: calc});
			}
		},


		onUpdateOffset: function ()
		{
			this.set('offset', (this.get('gmt')-this.get('gmtreal'))*Consts.MINS_HOUR);
			this.updateProperties(Consts.START);
			this.updateProperties(Consts.END);
			this.trigger(Consts.START);
			this.trigger(Consts.END);
		},


		onUpdateCurrent: function ()
		{
			this.setPropertie(Consts.CURRENT, 'time', new Date());
		},


		setPropertie: function(datetype, param, value)
		{
			this.get(datetype)['set' + this.config[param][0]](Number(value));
			this.updateProperties(datetype);
			this.trigger(datetype, this.config[param][1]);
		},

		updateProperties: function (type)
		{
			var temp = new Date(this.get(type)['get' + this.config.time[0]]()+this.get('offset'));
			var pro = {};
			pro.timestamp = Math.floor((temp['get' + this.config.time[0]]()-this.get('offset'))/1000);
			pro.year = temp['get' + this.config.year[0]]();
			pro.month = temp['get' + this.config.month[0]]();
			pro.day = temp['get' + this.config.day[0]]();
			pro.hour = temp['get' + this.config.hour[0]]();
			pro.min = temp['get' + this.config.min[0]]();
			pro.sec = temp['get' + this.config.sec[0]]();
			pro.mili = temp['get' + this.config.mili[0]]();
			pro.weekday = temp['get' + this.config.weekday[0]]();
			pro.weekyear = temp['get' + this.config.weekyear[0]]();
			pro.dayyear = temp['get' + this.config.dayyear[0]]();
			this.get(type).pro = pro;
		}
	});
	
	return Timestamp;
});