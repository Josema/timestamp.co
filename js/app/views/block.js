/* global require */
'use strict';

define([
	'backbone',
	'underscore',
	'jquery',
	'app/consts',
	'app/views/base',
	'text!app/templates/timestamp.html'
], function (Backbone, _, $, Consts, Base, htmltimestamp) {

	var Block = Base.extend({

		type: ['start', 'end'],
		eventstype: [Consts.ON_UPDATE_START, Consts.ON_UPDATE_END],
		setting: {
			timestamp: ['setTimestamp', ['timestamp', 'mili']],
			year: ['setFullYear', ['year', 'mili']],
			month: ['setMonth', ['mili']],
			day: ['setDate', ['mili']],
			hour: ['setHours', ['mili']],
			min: ['setMinutes', ['mili']],
			sec: ['setSeconds', ['mili']],
			weekday: ['setDay', ['mili']],
			weekyear: ['setWeekYear', ['mili']],
			dayyear: ['setDayYear', ['mili']],
			mili: ['setMilliseconds', ['timestamp', 'year', 'month', 'day', 'hour', 'min', 'sec', 'weekday', 'weekyear', 'dayyear', 'mili']],
		},


		initialize: function (model, id)
		{	
			this.model = model;
			this.id = id;
			this.model.on(this.eventstype[id], _.bind(this.update, this));
			this.model.on('change:gmt', _.bind(this.update, this));

			var container = '#' + this.type[id];
			this.el = $( container );

			var template = _.template(htmltimestamp);
			this.el.html(template(this));

			this.addListeners(container);
		},


		onUpdateInput: function (e)
		{
			var type = (e.id).substr(0, e.id.length-1);
			(type == 'format') ?
				this.updateFormat()
			:
				this.model.setDate(this.type[this.id], this.setting[type][0], e.value, this.eventstype[this.id], this.setting[type][1]);
		},


		update: function (exclude)
		{
			var pro = this.model.get(this.type[this.id]).pro, i;
			for (i in pro)
				if ($.inArray( i, exclude ) < 0)
					$('#' + i + this.id).val(pro[i]);
					
			this.updateFormat();
		},
		
		updateFormat: function ()
		{
			var temp = new Date(this.model.get(this.type[this.id]).getTime()+this.model.get('offset'));
			$('#formatlabel' + this.id).html(temp.format($('#format' + this.id).val()));
		}
	});
	
	return Block;
});
