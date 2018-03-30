import api from './index'

export function getClassifyList() {
  return api.getClassifyList()
    .then((response) => {
      return Promise.resolve(JSON.parse(response.data).data)
    }).catch((err) => {
      return Promise.reject(err)
    })
}

export function getArticleByClassify(page = 0, cid) {
  return api.getArticleByClassify(page, cid)
    .then((response) => {
      return Promise.resolve(JSON.parse(response.data).data)
    }).catch((err) => {
      return Promise.reject(err)
    })
}