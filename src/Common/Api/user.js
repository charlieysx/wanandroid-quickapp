import api from './index'
var storage = require('@system.storage')

export function login(username, password) {
  return api.login({
    username: username,
    password: password
  })
    .then((response) => {
      var value = JSON.parse(response.data)
      if(value.errorCode === -1) {
        Promise.reject(value.errorMsg)
      }
      storage.set({
        key: 'auth',
        value: response.headers['Set-Cookie'],
        success:function(data){
          console.log('cookies保存成功')
        }
      })
      storage.set({
        key: 'user',
        value: value.data
      })
      storage.set({
        key: 'isLogin',
        value: true
      })
      return Promise.resolve(value.data)
    }).catch((err) => {
      return Promise.reject('登录失败')
    })
}

export function register(username, password, repassword) {
  return api.register({
    username: username,
    password: password,
    repassword: repassword
  })
    .then((response) => {
      var value = JSON.parse(response.data)
      if(value.errorCode === -1) {
        Promise.reject(value.errorMsg)
      }
      storage.set({
        key: 'auth',
        value: response.headers['Set-Cookie'],
        success:function(data){
          console.log('cookies保存成功')
        }
      })
      storage.set({
        key: 'user',
        value: value.data
      })
      storage.set({
        key: 'isLogin',
        value: true
      })
      return Promise.resolve(value.data)
    }).catch((err) => {
      return Promise.reject('注册失败')
    })
}