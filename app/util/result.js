'use strict';

module.exports = {
  getResponse(errcode, errmsg = '', data = null) {
    return {
      errcode,
      errmsg,
      data,
    };
  },
};
