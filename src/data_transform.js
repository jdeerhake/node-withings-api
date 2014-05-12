var constants = require( './constants' );

function trimSigFigs( num, figs ) {
  return parseFloat( num.toPrecision( figs ) );
}

module.exports = {
  // Calculate actual values from the strange powers of ten that Withings returns
  calcValues : function( data ) {
    data.body.measuregrps.forEach(function( grp ) {
      grp.measures.map(function( meas ) {
          var calculated = meas.value * Math.pow( 10, meas.unit ),
            sigFigs = meas.value.toString().length;

          meas.value = trimSigFigs( calculated, sigFigs );
          delete meas.unit;
          meas.value_units = constants.si[ constants.measureType[ meas.type ] ];
      });
    });

    return data;
  },

  // Convert to standard units as defined in constants.js
  convertToStandard : function( data ) {
    var mathjs = require( 'mathjs' )();

    data.body.measuregrps.forEach(function( grp ) {
      grp.measures.map(function( meas ) {
        var measType = constants.measureType[ meas.type ],
          si = constants.si[ measType ],
          std = constants.standard[ measType ],
          sigFigs = meas.value.toString().length;

        if( si && std ) {
          meas.value = trimSigFigs( mathjs.unit( meas.value, si ).toNumber( std ), sigFigs );
          meas.value_units = std;
        }
      });
    });

    return data;
  },

  // Change from measuregrps by date to time series data by measurement type
  regroup : function( data ) {
    var groups = {};
    data.body.measuregrps.forEach(function( grp ) {
      var date = grp.date;
      grp.measures.forEach(function( meas ) {
        var type = constants.measureType[ meas.type ],
          group = groups[ type ] = groups[ type ] || {};

        group.values = group.values || [];
        group.unit = meas.value_units;

        group.values.push([ date, meas.value ]);
      });
    });
    return groups;
  }
};