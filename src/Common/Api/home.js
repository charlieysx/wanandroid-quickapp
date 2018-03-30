import api from './index'

export function getBanner() {
  return api.getBanner()
    .then((response) => {
      return Promise.resolve(JSON.parse(response.data).data)
    }).catch((err) => {
      return Promise.reject(err)
    })
}

export function getArticle(page = 0) {
  return api.getArticle(page)
    .then((response) => {
      return Promise.resolve(JSON.parse(response.data).data)
    }).catch((err) => {
      return Promise.reject(err)
    })
}