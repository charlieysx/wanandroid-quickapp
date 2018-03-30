var fetch = require('@system.fetch')
var storage = require('@system.storage')

var API_ROOT = 'http://www.wanandroid.com/'

var headers = {}

// function getAuth(next) {
//   storage.get({
//     key: 'auth',
//     success: function(data) {
//       headers.Cookie = data
//       next(true)
//     },
//     fail: function(data, code) {
//       next(false)
//     }
//   })
// }

function getAuth() {
  return new Promise((resolve, reject) => {
    storage.get({
      key: 'auth',
      success: function(data) {
        headers.Cookie = data
        resolve(true)
      },
      fail: function(data, code) {
        resolve(false)
      }
    })
  })
}

function realFetch(url, data = null, method = 'get') {
  console.log('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('┃ url: ', API_ROOT + url)
  console.log('┃ method: ', method)
  console.log('┃ data: ', JSON.stringify(data))
  console.log('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

  return new Promise((resolve, reject) => {
    fetch.fetch({
      url: API_ROOT + url,
      data: data,
      header: headers,
      method: method,
      success: function(data) {
        resolve(data)
      },
      fail: function(data, code) {
        reject(data)
      }
    })
  })
}

function withAuth(url, data = null, method = 'get', canSkip = false) {
  return getAuth().then((auth) => {
    if(auth || canSkip) {
      return realFetch(url, data, method)
    } else {
      return new Promise((resolve, reject) => {
        reject('请先登录！')
      })
    }
  })
}

function post(url, data = null, config = {}) {
  if(config.withAuth) {
    return withAuth(url, data, 'post', config.canSkip)
  } else {
    return realFetch(url, data, 'post')
  }
}

function get(url, data = null, config = {}) {
  if(config.withAuth) {
    return withAuth(url, data, 'get', config.canSkip)
  } else {
    return realFetch(url, data, 'get')
  }
}

export default {
  /**
   * 获取首页banner列表
   */
  getBanner(success, fail) {
    return get('banner/json', null)
  },
  /**
   * 获取首页文章列表
   */
  getArticle(page) {
    return get('article/list/' + page + '/json', null, {
      withAuth: true,
      canSkip: true
    })
  },
  /**
   * 获取体系分类
   */
  getClassifyList() {
    return get('tree/json', null)
  },
  /**
   * 根据分类获取文章列表
   */
  getArticleByClassify(page, cid) {
    return get('article/list/' + page + '/json?cid=' + cid, null, {
      withAuth: true,
      canSkip: true
    })
  },
  /**
   * 登录
   */
  login(params) {
    return post('user/login', params)
  },
  /**
   * 注册
   */
  register(params) {
    return post('user/register', params)
  },
  /**
   * 获取收藏文章列表
   */
  getCollectArticle(page) {
    return get('lg/collect/list/' + page + '/json', null, { withAuth: true })
  },
  /**
   * 收藏站内文章
   */
  collectArticle(id) {
    return post('lg/collect/' + id + '/json', null, { withAuth: true })
  },
  /**
   * 收藏站外文章
   */
  collectArticleAdd(params) {
    return post('lg/collect/add/json', params, { withAuth: true })
  },
  /**
   * 从文章列表取消收藏
   */
  uncollectArticle(id) {
    return post('lg/uncollect_originId/' + id + '/json', null, { withAuth: true })
  },
  /**
   * 从收藏列表取消收藏
   */
  uncollect(id, originId) {
    return post('lg/uncollect/' + id + '/json', { originId: originId }, { withAuth: true })
  },
  /**
   * 获取收藏网站列表
   */
  getCollectWeb() {
    return get('lg/collect/usertools/json', null, { withAuth: true })
  },
  /**
   * 收藏网站
   */
  collectWeb(params) {
    return post('lg/collect/addtool/json', params, { withAuth: true })
  },
  /**
   * 编辑收藏的网址
   */
  editCollectWeb(params) {
    return post('lg/collect/updatetool/json', params, { withAuth: true })
  },
  /**
   * 删除收藏的网址
   */
  deleteCollectWeb(id) {
    return post('lg/collect/deletetool/json', { id: id }, { withAuth: true })
  }
}