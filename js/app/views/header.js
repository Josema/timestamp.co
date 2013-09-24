/* global require */
'use strict';

define([
	'backbone',
	'underscore',
	'jquery',
	'app/consts'
], function (Backbone, _, $, Consts) {
	
	var Header = Backbone.View.extend({

		el: $('#header'),
		
		canupdate: true,

		events: {
			'mouseover #updated': 'onMouseheader',
			'mouseout #updated': 'onMouseheader',
			'change #gmts': 'onChangeGMT'
		},

		initialize: function (model) 
		{
			this.model = model;
			this.model.on('change:current', _.bind(this.update, this));
			this.model.on('change:gmtreal', _.bind(this.onTimeserverSuccess, this));

			this.timestamp = $('#htimestamp');
			this.year = $('#hyear');
			this.month = $('#hmonth');
			this.day = $('#hday');
			this.hour = $('#hhour');
			this.min = $('#hmin');
			this.sec = $('#hsec');
			this.mili = $('#hmili');
			this.gmt = $('#gmts');
			
			this.gmt.val(0);
		},
		
		update: function ()
		{
			if (this.canupdate)
			{
				var current = this.model.get("current");
				this.timestamp.html(current.timestamp);
				this.year.html(current.year);
				this.month.html(current.month);
				this.day.html(current.day);
				this.hour.html(current.hour);
				this.min.html(current.min);
				this.sec.html(current.sec);
				this.mili.html(current.mili);
			}
		},
		
		onMouseheader: function (e)
		{
			this.canupdate = (e.type == 'mouseout');
			(this.canupdate) ? $('#header').removeClass('over') : $('#header').addClass('over');
		},
		
		onChangeGMT: function (e)
		{
			this.model.set("gmt", Number(e.target.value));
		},
		
		onTimeserverSuccess: function (e)
		{
			this.gmt.val(this.model.get("gmt"));
			$('#gmt' + this.model.get("gmt")).addClass('gmtreal');
		}
	});
	
	return Header;
});