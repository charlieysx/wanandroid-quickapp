import api from './index'

export function getBanner(success = null, fail = null) {
  api.getBanner(function(data) {
    if(success != null) {
      success(JSON.parse(data.data));
    }
  }, fail)
}

export function getArticle(page = 0, success = null, fail = null) {
  api.getArticle(page, function(data) {
    if(success != null) {
      success(JSON.parse(data.data));
    }
  }, fail)
}