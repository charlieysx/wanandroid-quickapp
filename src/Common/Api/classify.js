import api from './index'

export function getClassifyList(success = null, fail = null) {
  api.getClassifyList(function(data) {
    if(success != null) {
      success(JSON.parse(data.data))
    }
  }, fail)
}

export function getArticleByClassify(page = 0, cid,success = null, fail = null) {
  api.getArticleByClassify(page, cid, function(data) {
    if(success != null) {
      success(JSON.parse(data.data))
    }
  }, fail)
}