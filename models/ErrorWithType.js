"use strict";

module.exports = function(message, type){
	const err = new Error(message);
	err.type = type;
	return err;
};