/* global require */
'use strict';

define([
	'backbone',
	'underscore',
	'jquery',
	'app/consts',
	'app/views/base',
	'text!app/templates/timestamp.html',
	'datepicker'
], function (Backbone, _, $, Consts, Base, htmltimestamp, ZebraDatepicker) {

	var Block = Base.extend({

		type: [Consts.START, Consts.END],

		initialize: function (model, id)
		{
			this.model = model;
			this.id = id;
			this.model.on(this.type[id], _.bind(this.update, this));

			var container = '#' + this.type[id];
			this.el = $( container );

			var template = _.template(htmltimestamp);
			this.el.html(template(this));

			this.addListeners(container);

			this.datepicker = $('#datepicker' + id).Zebra_DatePicker({
				format: 'Y-n-j',
				show_clear_date: false,
				select_other_months: true,
				custom_icon: $('#iconpick' + id),
				onSelect: _.bind(this.onSelectDatepick, this)
			});
			this.datepicker.hide();
		},


		onUpdateInput: function (e)
		{
			var type = (e.id).substr(0, e.id.length-1);
			if ((e.value).length > 11 && type == 'timestamp') type = 'time';
			(type == 'format') ?
				this.updateFormat()
			:
				this.model.setPropertie(this.type[this.id], type, e.value);
		},


		onSelectDatepick: function (a, b, date)
		{
			this.model.setPropertie(this.type[this.id], 'year', date.getFullYear(), false);
			this.model.setPropertie(this.type[this.id], 'month', date.getMonthReal(), false);
			this.model.setPropertie(this.type[this.id], 'day', date.getDate(), true);
		},


		update: function (exclude)
		{
			var pro = this.model.get(this.type[this.id]).pro, i;
			for (i in pro)
				if ($.inArray( i, exclude ) < 0)
					$('#' + i + this.id).val(pro[i]);

			this.updateFormat();
			$('#datepicker' + this.id).val(pro.year+'-'+pro.month+'-'+pro.day);
		},
		
		updateFormat: function ()
		{
			var temp = new Date(this.model.get(this.type[this.id]).getTime()+this.model.get('offset'));
			$('#formatlabel' + this.id).html(temp.format($('#format' + this.id).val(), this.model.get('firstday')));
		}
	});
	
	return Block;
});
