var OAuth = require( 'oauth' ).OAuth;
var request = require( 'request' );
var get = require( 'promise' ).denodeify( request.get );



function checkErrorCode( data ) {
  var WithingsError = require( './error' );

  if( data.status !== 0 ) {
    throw new WithingsError( data.status );
  } else {
    return data;
  }
}

function getBody( req ) {
  return JSON.parse( req.body );
}

function WithingsRequest( keys ) {
  this.keys = keys;

  this.oauth = new OAuth(
    '',
    '',
    keys.consumerKey,
    keys.consumerSecret,
    '1.0',
    '',
    'HMAC-SHA1'
  );
}

WithingsRequest.prototype = {
  get : function( url ) {
    var signedURL = this.oauth.signUrl( url, this.keys.token, this.keys.verifier );
    return get( signedURL ).then( getBody ).then( checkErrorCode );
  }
};


module.exports = WithingsRequest;