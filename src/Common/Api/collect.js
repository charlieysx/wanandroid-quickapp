import api from './index'

export function getCollectArticle(page, success = null, fail = null) {
  api.getCollectArticle(page, function(data) {
    if(success != null) {
      success(JSON.parse(data.data))
    }
  }, fail)
}

export function collectArticle(id, success = null, fail = null) {
  api.collectArticle(id, function(data) {
    if(success != null) {
      var value = JSON.parse(data.data)
      if(value.errorCode === -1) {
        if(fail !== null) {
          fail('请先登录', -1)
        }
      } else {
        success(JSON.parse(data.data))
      }
    }
  }, fail)
}

export function collectArticleAdd(title, author, link, success = null, fail = null) {
  api.collectArticleAdd({
    title: title,
    author: author,
    link: link
  }, function(data) {
    if(success != null) {
      success(JSON.parse(data.data))
    }
  }, fail)
}

export function uncollectArticle(id, success = null, fail = null) {
  api.uncollectArticle(id, function(data) {
    if(success != null) {
      success(JSON.parse(data.data))
    }
  }, fail)
}

export function uncollect(id, originId, success = null, fail = null) {
  api.uncollect(id, originId, function(data) {
    if(success != null) {
      success(JSON.parse(data.data))
    }
  }, fail)
}

export function getCollectWeb(success = null, fail = null) {
  api.getCollectWeb(function(data) {
    if(success != null) {
      success(JSON.parse(data.data))
    }
  }, fail)
}

export function collectWeb(name, link, success = null, fail = null) {
  api.collectWeb({
    name: name,
    link: link
  }, function(data) {
    if(success != null) {
      success(JSON.parse(data.data))
    }
  }, fail)
}

export function deleteCollectWeb(id, success = null, fail = null) {
  api.deleteCollectWeb(id, function(data) {
    if(success != null) {
      success(JSON.parse(data.data))
    }
  }, fail)
}