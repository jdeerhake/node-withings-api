var settings = require( '../settings' );
var _ = require( 'lodash' );
var WithingsRequest = require( './request' );
var transform = require( './data_transform' );


function endpointURL( name, action, params ) {
  var qs = require( 'querystring' ),
    url = require( 'url' ),
    endpoints = require( './endpoints' );

  return url.resolve( settings.apiURL, endpoints[ name ].path ) + '?' + qs.stringify( _.extend( {}, endpoints[ name ][ action ], params ) );
}


function WithingsAPI( keys, userID, opts ) {
  opts = opts || {};
  this.request = new WithingsRequest( keys );
  this.userID = userID;
  this.timeSeriesFormat = opts.timeSeriesFormat;
  this.standardUnits = opts.standardUnits;
}

WithingsAPI.prototype = {
  user : function( params ) {
    var withID = _.extend({}, params, { userid : this.userID }),
      url = endpointURL( 'user', 'byID', withID  );

    return this.request.get( url );
  },
  measurements : function( params ) {
    var withID = _.extend({}, params, { userid : this.userID }),
      url = endpointURL( 'measurements', 'get', withID );

    var req = this.request.get( url ).then( transform.calcValues );

    if( this.standardUnits ) {
      req = req.then( transform.convertToStandard );
    }

    if( this.timeSeriesFormat ) {
      req = req.then( transform.regroup );
    }

    return req;
  }
};

// Convenience functions for getting specific measure types
_.extend( WithingsAPI.prototype, (function() {
  var measureTypeCodes = _.invert( require( './constants' ).measureType );

  return Object.keys( measureTypeCodes ).reduce(function( funcs, type ) {
    funcs[ type ] = function( params ) {
      return this.measurements( _.extend({ meastype : measureTypeCodes[ type ] }, params ) );
    };
    return funcs;
  }, {});
}()));

module.exports = WithingsAPI;