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
		},


		onUpdateInput: function (e)
		{
			var type = (e.id).substr(0, e.id.length-1);
			if ((e.value).length > 12) type = 'time';
			(type == 'format') ?
				this.updateFormat()
			:
				this.model.setPropertie(this.type[this.id], type, e.value);
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
			$('#formatlabel' + this.id).html(temp.format($('#format' + this.id).val(), this.model.get('firstday')));
		}
	});
	
	return Block;
});
