var fetch = require('@system.fetch')
var storage = require('@system.storage')

var API_ROOT = 'http://www.wanandroid.com/'

var headers = {}

function getAuth(next) {
  storage.get({
    key: 'auth',
    success: function(data) {
      headers.Cookie = data
      next(true)
    },
    fail: function(data, code) {
      next(false)
    }
  })
}

function realFetch(url, data = null, method = 'get', success = null, fail = null) {
  fetch.fetch({
    url: API_ROOT + url,
    data: data,
    header: headers,
    method: method,
    success: success,
    fail: function(data, code) {
      if(fail != null) {
        fail(data, code)
      }
    }
  })
}

function withAuth(url, data = null, method = 'get', success = null, fail = null) {
  getAuth(function next(auth) {
    if(auth) {
      realFetch(url, data, method, success, fail)
    } else {
      fail('请先登录！', -1)
    }
  })
}

export default {
  getBanner(success, fail) {
    realFetch('banner/json', null, 'get', success, fail)
  },
  getArticle(page, success, fail) {
    realFetch('article/list/' + page + '/json', null, 'get', success, fail)
  },
  getClassifyList(success, fail) {
    realFetch('tree/json', null, 'get', success, fail)
  },
  getArticleByClassify(page, cid, success, fail) {
    realFetch('article/list/' + page + '/json?cid=' + cid, null, 'get', success, fail)
  },
  login(params, success, fail) {
    realFetch('user/login', params, 'post', success, fail)
  },
  register(params, success, fail) {
    realFetch('user/register', params, 'post', success, fail)
  },
  getCollect(page, success, fail) {
    withAuth('lg/collect/list/' + page + '/json', null, 'get', success, fail)
  }
}