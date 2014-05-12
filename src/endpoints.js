module.exports = {
  user     : {
    path : '/user',
    byID : {
      action : 'getbyuserid'
    }
  },
  measurements  : {
    path :'/measure',
    get : {
      action : 'getmeas'
    }
  },
  activity : {
    path : '/v2/measure',
    get : {
      action : 'getactivity'
    }
  },
  notify   : {
    path : '/notify',
    subscribe : {
      action : 'subscribe'
    },
    get : {
      action : 'get'
    },
    list : {
      action : 'list'
    },
    revoke : {
      action : 'revoke'
    }
  }
};