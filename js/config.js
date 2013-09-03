/*global require*/
'use strict';

require.config({ 

	'paths':
	{
		"underscore": "lib/underscore-min", 
		"backbone": "lib/backbone-min",
		"text": "lib/text.min",
		"jquery": "lib/jquery.min"
	},
	
	'shim': 
	{
		backbone: {
			'deps': ['jquery', 'underscore'],
			'exports': 'Backbone'
		},
		underscore: {
			'exports': '_'
		},
		jquery: {
			'exports': '$'
		}
	}
}); 

require(['app/main']);
