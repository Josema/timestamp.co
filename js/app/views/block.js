/* global require */
'use strict';

define([
	'backbone',
	'underscore',
	'jquery',
	'app/views/baseview',
	'text!app/templates/timestamp.html'
], function (Backbone, _, $, BaseView, htmltimestamp) {
	
	var Block = BaseView.extend({
		
		containersId: ["#start", "#end"],
		
		initialize: function (id) {
			this.id = id;
	        this.el = $(this.containersId[this.id]);
	        this.render();
	    },

		render: function () {
			var template = _.template(htmltimestamp);
			this.el.html(template({
				id: this.id
			}));
		}
	});
	
	return Block;
});