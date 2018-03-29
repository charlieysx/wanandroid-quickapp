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
  console.log('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('┃ url: ', API_ROOT + url)
  console.log('┃ method: ', method)
  console.log('┃ data: ', JSON.stringify(data))
  console.log('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  fetch.fetch({
    url: API_ROOT + url,
    data: data,
    header: headers,
    method: method,
    success: function(data) {
      if(success != null) {
        success(data)
      }
    },
    fail: function(data, code) {
      if(fail != null) {
        fail(data, code)
      }
    }
  })
}

function withAuth(url, data = null, method = 'get', success = null, fail = null, canSkip = false) {
  getAuth(function next(auth) {
    if(auth || canSkip) {
      realFetch(url, data, method, success, fail)
    } else {
      fail('请先登录！', -1)
    }
  })
}

export default {
  /**
   * 获取首页banner列表
   */
  getBanner(success, fail) {
    realFetch('banner/json', null, 'get', success, fail)
  },
  /**
   * 获取首页文章列表
   */
  getArticle(page, success, fail) {
    withAuth('article/list/' + page + '/json', null, 'get', success, fail, true)
  },
  /**
   * 获取体系分类
   */
  getClassifyList(success, fail) {
    realFetch('tree/json', null, 'get', success, fail)
  },
  /**
   * 根据分类获取文章列表
   */
  getArticleByClassify(page, cid, success, fail) {
    withAuth('article/list/' + page + '/json?cid=' + cid, null, 'get', success, fail, true)
  },
  /**
   * 登录
   */
  login(params, success, fail) {
    realFetch('user/login', params, 'post', success, fail)
  },
  /**
   * 注册
   */
  register(params, success, fail) {
    realFetch('user/register', params, 'post', success, fail)
  },
  /**
   * 获取收藏文章列表
   */
  getCollectArticle(page, success, fail) {
    withAuth('lg/collect/list/' + page + '/json', null, 'get', success, fail)
  },
  /**
   * 收藏站内文章
   */
  collectArticle(id, success, fail) {
    withAuth('lg/collect/' + id + '/json', null, 'post', success, fail)
  },
  /**
   * 收藏站外文章
   */
  collectArticleAdd(params, success, fail) {
    withAuth('lg/collect/add/json', params, 'post', success, fail)
  },
  /**
   * 从文章列表取消收藏
   */
  uncollectArticle(id, success, fail) {
    withAuth('lg/uncollect_originId/' + id + '/json', null, 'post', success, fail)
  },
  /**
   * 从收藏列表取消收藏
   */
  uncollect(id, originId, success, fail) {
    withAuth('lg/uncollect/' + id + '/json', { originId: originId }, 'post', success, fail)
  },
  /**
   * 获取收藏网站列表
   */
  getCollectWeb(success, fail) {
    withAuth('lg/collect/usertools/json', null, 'get', success, fail)
  },
  /**
   * 收藏网站
   */
  collectWeb(params, success, fail) {
    withAuth('lg/collect/addtool/json', params, 'post', success, fail)
  },
  /**
   * 编辑收藏的网址
   */
  editCollectWeb(params, success, fail) {
    withAuth('lg/collect/updatetool/json', params, 'post', success, fail)
  },
  /**
   * 删除收藏的网址
   */
  deleteCollectWeb(id, success, fail) {
    withAuth('lg/collect/deletetool/json', { id: id }, 'post', success, fail)
  }
}