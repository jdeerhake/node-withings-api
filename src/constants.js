module.exports = {
  responses : {
    0    : "Operation was successful",
    247  : "The userid provided is absent, or incorrect",
    250  : "The provided userid and/or Oauth credentials do not match.",
    286  : "No such subscription was found",
    293  : "The callback URL is either absent or incorrect",
    294  : "No such subscription could be deleted",
    304  : "The comment is either absent or incorrect",
    305  : "Too many notifications are already set",
    342  : "The signature (using Oauth) is invalid.",
    343  : "Wrong Notification Callback Url don't exist",
    601  : "Too Many Request",
    2554 : "Wrong action or wrong webservice",
    2555 : "An unknown error occurred"
  },
  attrib : {
    0 : 'device',
    1 : 'device (ambiguous)',
    2 : 'manual entry',
    4 : 'manual entry during user creation'
  },
  category : {
    1 : 'measure',
    2 : 'target'
  },
  measureType : {
     1 : 'weight',
     4 : 'height',
     5 : 'fat_free_mass',
     6 : 'fat_ratio',
     8 : 'fat_mass',
     9 : 'diastolic_blood_pressure',
    10 : 'systolic_blood_pressure',
    11 : 'heart_pulse'
  },
  deviceType : {
     0 : 'user',
     1 : 'body scale',
     4 : 'blood pressure monitor',
    16 : 'pulse'
  },
  si : {
    'weight'        : 'kg',
    'height'        : 'm',
    'fat_free_mass' : 'kg',
    'fat_ratio'     : '%',
    'fat_mass'      : 'kg',
    'diastolic_blood_pressure' : 'mmHg',
    'systolic_blood_pressure'  : 'mmHg',
    'heart_pulse'   : 'bpm'
  },
  standard : {
    'weight'        : 'lb',
    'fat_free_mass' : 'lb',
    'fat_mass'      : 'lb',
    'height'        : 'ft'
  }
};