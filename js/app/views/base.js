/* global require */
'use strict';

define([
	'backbone',
	'underscore',
	'jquery',
	'app/consts'
], function (Backbone, _, $, Consts) {


	var Base = Backbone.View.extend({
		
		el: $('body'),
		
		addListeners: function (element)
		{
			$(element + " input").bind({
				keydown: _.bind(this.updateInputDown, this),
				keypress: _.bind(this.updateInputPress, this),
				keyup: _.bind(this.updateInputUp, this),
				drop: _.bind(this.updateInputDrop, this)
			});
		},

		updateInputDown: function(e)
		{
			this.inputDown = e.target.value;
			if (!isNaN(e.target.value))
			{
				var key = window.event ? e.keyCode : e.which;
				if (key == 38)
					e.target.value = (Number(e.target.value)+1);
				else if (key == 40)
					e.target.value = (Number(e.target.value)-1);
			}

		},

		updateInputPress : function(e)
		{
			var retur = true;
			if (e.target.alt != 'text')
			{
				if ((/^\s*-?\d*\s*$/.test(e.target.value)))
				{
					this.trimedInput = $.trim(e.target.value);
					if (this.trimedInput != e.target.value)
						e.target.value = this.trimedInput;
					this.lastInput = this.trimedInput;
					this.lastPosition = [e.target.selectionStart, e.target.selectionEnd];
					retur = true;
				}
				else
				{
					e.target.value = this.lastInput;
					e.target.selectionStart = this.lastPosition[0];
					e.target.selectionEnd = this.lastPosition[1];
					retur = false;
				}
			}
			return retur;
		},
		
		updateInputUp : function(e)
		{
			if (this.inputDown != e.target.value && this.updateInputPress(e))
				this.onUpdateInput( e.target );
		},
		
		
		
		updateInputDrop : function(e)
		{
			this.lastInput = e.target.value;
			this.lastPosition = [e.target.selectionStart, e.target.selectionEnd];
			setTimeout(_.bind(function() { 
				this.updateInputUp(e);
			}, this), 0);
		},


		inputDown: null,
		lastInput: null,
		lastPosition: [0,0],
		trimedInput: null
	});
	
	return Base;
});