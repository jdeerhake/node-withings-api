var settings = require( '../settings' );
var _ = require( 'lodash' );
var request = require( 'request' );
var get = require( 'promise' ).denodeify( request.get );

var constants = require( './constants' );

request.defaults({
  json : true
});

function requester( keys ) {
  return function( url ) {
    console.log( url );
    return get({ url : url, oauth : keys }).then( getBody ).then( checkErrorCode );
  };
}

function getBody( req, body ) {
  return body;
}

function endpointURL( name, action, params ) {
  var qs = require( 'querystring' ),
    url = require( 'url' ),
    endpoints = require( './endpoints' );

  return url.resolve( settings.apiURL, endpoints[ name ].path ) + '?' + qs.stringify( _.extend( endpoints[ name ][ action ], params ) );
}

function checkErrorCode( body ) {
  console.log(body);
  var WithingsError = require( './withings_error' );

  if( body.status !== 0 ) {
    throw new WithingsError( body.status );
    return;
  } else {
    return body;
  }
}

function WithingsAPI( keys, userID ) {
  this.request = requester( keys );
  this.userID = userID;
}

WithingsAPI.prototype = {
  user : function( params ) {
    var withID = _.extend({}, params, { userid : this.userID }),
      url = endpointURL( 'user', 'byID', withID  );

    return this.request( url );
  },
  measurements : function( params ) {
    var withID = _.extend({}, params, { userid : this.userID }),
      url = endpointURL( 'measurements', 'get', withID );

    return this.request( url );
  }
};


module.exports = WithingsAPI;