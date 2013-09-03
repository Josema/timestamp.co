/* global require */
'use strict';

define([
	'backbone',
	'underscore',
	'jquery',
	'text!templates/timestamp.html'
], function (Backbone, _, $, htmltimestamp) {
	
	var TimestampBlock = Backbone.View.extend({

		el : $("#start"),

		template: _.template(htmltimestamp),

		initialize: function () {
			this.render();
		},
		
		events: {
			'keypress input':	'updateInput',
			'keyup input':	'updateInput'
		},

		render: function () {
			$(this.el).html(this.template({
				id: 1
			}));
		},

		updateInput : function(e) {
			e.target.value = $.trim(e.target.value);
			if (!(/^[0-9]*$/.test(e.target.value)))
			{
		        e.target.value = this.lastInput;
		        return false;
		    }
		    else
		    {
		        this.lastInput = e.target.value;
		        return true;
		    }
		},
		
		lastInput: null
	});
	
	return new TimestampBlock();
});