/* global require */
'use strict';

define([
	'backbone',
	'app/consts'
], function (Backbone, Consts) {
	
	var Header = Backbone.View.extend({

		initialize: function () {
			this.model.on(Consts.ON_INTERVAL, this.render);
		},
	    
		render: function () {
			console.log(Consts.ON_INTERVAL)
	    }

	});
	
	return Header;
});