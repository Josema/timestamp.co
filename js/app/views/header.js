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
			'mouseout #updated': 'onMouseheader'
		},

		initialize: function (model) {
			this.model = model;
			this.model.on(Consts.ON_UPDATE, _.bind(this.update, this));

			this.timestamp = $('#htimestamp');
			this.year = $('#hyear');
			this.month = $('#hmonth');
			this.day = $('#hday');
			this.hour = $('#hhour');
			this.min = $('#hmin');
			this.sec = $('#hsec');
			this.mili = $('#hmili');
		},
		
		update: function () {
			if (this.canupdate)
			{
				this.timestamp.html(this.model.current.timestamp);
				this.year.html(this.model.current.year);
				this.month.html(this.model.current.month);
				this.day.html(this.model.current.day);
				this.hour.html(this.model.current.hour);
				this.min.html(this.model.current.min);
				this.sec.html(this.model.current.sec);
				this.mili.html(this.model.current.mili);
			}
		},
		
		onMouseheader: function (e) {
			this.canupdate = (e.type == 'mouseout');
			(this.canupdate) ? $('#clock').removeClass('over') : $('#clock').addClass('over');
		},
	});
	
	return Header;
});