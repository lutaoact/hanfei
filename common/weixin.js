'use strict';

const request = require('request');

const _u = require('./util')
const redisService = _u.service('redis');

const loggerD = _u.loggerD;
const logger = _u.logger;

const cache = require('./cache');

const APPID     = process.env.APPID;
const APPSECRET = process.env.APPSECRET;

const API_BASE = 'https://api.weixin.qq.com/cgi-bin';
const tokenUrl = `${API_BASE}/token`;

// GET https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
function getAccessToken(cb) {
  let qs = {grant_type: 'client_credential', appid: APPID, secret: APPSECRET};
  cache.get('weixinAccessToken', (_cb) => {
    console.log('[get weixin access token]:');
    request.get({url: tokenUrl, qs, json: true}, (err, response, resBody) => {
      if (err) return _cb(err);
      console.log(resBody.access_token);
      _cb(null, resBody.access_token);
    });
  }, cb);
}
exports.getAccessToken = getAccessToken;
