/* global require */
'use strict';

define([
	'app/models/timestamp',
	'app/views/header',
	'app/views/block'
], function (Timestamp, Header, Block) {

	var timestamp = new Timestamp();
	var header = new Header(timestamp);
	var start = new Block(timestamp, 0);

});