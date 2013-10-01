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

		containersId: ["start", "end"],
		setting: {
			timestamp: 'setTimestamp'
		},

		initialize: function (model, id)
		{
			this.model = model;
			this.id = id;
			this.el = $( '#' + this.containersId[this.id] );
			this.on(Consts.ON_CHANGE_INPUT + id, this.onUpdateInput);

			var template = _.template(htmltimestamp);
			this.el.html(template({
				id: this.id
			}));
		},

		render: function ()
		{

		},
		
		onUpdateInput: function (e)
		{
			var type = (e.id).substr(0, e.id.length-1);
			this.model.get(this.containersId[this.id])[this.setting[type]](e.value);
		}
	});
	
	return Block;
});
