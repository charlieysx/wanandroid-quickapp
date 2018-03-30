import api from './index'

export function getCollectArticle(page) {
  return api.getCollectArticle(page)
    .then((response) => {
      return Promise.resolve(JSON.parse(response.data).data)
    }).catch((err) => {
      return Promise.reject(err)
    })
}

export function collectArticle(id) {
  return api.collectArticle(id)
    .then((response) => {
      var value = JSON.parse(response.data)
      if(value.errorCode === -1) {
        return Promise.reject('请先登录')
      } else {
        return Promise.resolve(value.data)
      }
    }).catch((err) => {
      return Promise.reject(err)
    })
}

export function collectArticleAdd(title, author, link) {
  return api.collectArticleAdd({
    title: title,
    author: author,
    link: link
  })
    .then((response) => {
      return Promise.resolve(JSON.parse(response.data).data)
    }).catch((err) => {
      return Promise.reject(err)
    })
}

export function uncollectArticle(id) {
  return api.uncollectArticle(id)
    .then((response) => {
      return Promise.resolve(JSON.parse(response.data).data)
    }).catch((err) => {
      return Promise.reject(err)
    })
}

export function uncollect(id, originId) {
  return api.uncollect(id, originId)
    .then((response) => {
      return Promise.resolve(JSON.parse(response.data).data)
    }).catch((err) => {
      return Promise.reject(err)
    })
}

export function getCollectWeb() {
  return api.getCollectWeb()
    .then((response) => {
      return Promise.resolve(JSON.parse(response.data).data)
    }).catch((err) => {
      return Promise.reject(err)
    })
}

export function collectWeb(name, link) {
  return api.collectWeb({
    name: name,
    link: link
  })
    .then((response) => {
      return Promise.resolve(JSON.parse(response.data).data)
    }).catch((err) => {
      return Promise.reject(err)
    })
}

export function editCollectWeb(id, name, link) {
  return api.editCollectWeb({
    id: id,
    name: name,
    link: link
  })
    .then((response) => {
      return Promise.resolve(JSON.parse(response.data).data)
    }).catch((err) => {
      return Promise.reject(err)
    })
}

export function deleteCollectWeb(id) {
  return api.deleteCollectWeb(id)
    .then((response) => {
      return Promise.resolve(JSON.parse(response.data).data)
    }).catch((err) => {
      return Promise.reject(err)
    })
}