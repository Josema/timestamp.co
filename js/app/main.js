/* global require */
'use strict';

define([
	'backbone',
	'underscore',
	'jquery',
	'app/models/timestamp',
	'app/views/header',
	'app/views/block'
], function (Backbone, _, $, Timestamp, Header, Block) {

	var timestamp = new Timestamp();
	var header = new Header({model: timestamp});
	var start = new Block(0);

});