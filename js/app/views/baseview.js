/* global require */
'use strict';

define([
	'backbone',
	'underscore',
	'jquery'
], function (Backbone, _, $) {


	var BaseView = Backbone.View.extend({
		
		el: $('body'),
		
	   	events: {
			'keypress input': 'updateInput',
			'keyup input': 'updateInput',
			'drop input': 'updateInputDrop'
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
		
		updateInputDrop : function(e) {
			this.lastInput = e.target.value;
			this.lastPosition = [e.target.selectionStart, e.target.selectionEnd];
			setTimeout(_.bind(function() { 
				this.updateInput(e);
			}, this), 0);
		},
		
		
		lastInput: null,
		lastPosition: [0,0],
		trimedInput: null
	});
	
	return BaseView;
});