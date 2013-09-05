/* global require */
'use strict';

define([
	'backbone',
	'jquery'
], function (Backbone, $) {


	var BaseView = Backbone.View.extend({
		
		el: $('body'),
		
	   	events: {
			'keypress input': 'updateInput',
			'keyup input': 'updateInput'
		},

		updateInput : function(e) {
			//e.target.value = $.trim(e.target.value);
			if ((/^\s*\d*\s*$/.test(e.target.value)))
			{
				this.trimedInput = $.trim(e.target.value);
				if (this.trimedInput != e.target.value)
					e.target.value = this.trimedInput;
				this.lastInput = this.trimedInput;
				this.lastPosition = [e.target.selectionStart, e.target.selectionEnd];
				return true;
			}
			else
			{
				e.target.value = this.lastInput;
				e.target.selectionStart = this.lastPosition[0];
				e.target.selectionEnd = this.lastPosition[1];
				return false;
			}
			
		},
		
		lastInput: null,
		lastPosition: [0,0],
		trimedInput: null
	});
	
	return BaseView;
});