var constants = require( './constants' );

function WithingsError( code ) {
  var errorMsg = constants.responses[ code ] ? constants.responses[ code ] : 'Undefined error code';

  this.name = 'Withings API Error';
  this.message  = errorMsg;
  this.code = code;
}

WithingsError.prototype = new Error();

module.exports = WithingsError;