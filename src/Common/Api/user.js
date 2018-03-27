import api from './index'
var storage = require('@system.storage')

export function login(username, password, success = null, fail = null) {
  api.login({
    username: username,
    password: password
  }, function(data) {
    var value = JSON.parse(data.data)
    if(value.errorCode < 0) {
      if(fail !== null) {
        fail(value.errorMsg, -1)
      }
      return 
    }
    storage.set({
      key: 'auth',
      value: data.headers['Set-Cookie'],
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
    if(success !== null) {
      success(value.data)
    }
  }, function(data, code) {
    if(fail !== null) {
      fail('登录失败', -1)
    }
  })
}

export function register(username, password, repassword, success = null, fail = null) {
  api.register({
    username: username,
    password: password,
    repassword: repassword
  }, function(data) {
    var value = JSON.parse(data.data)
    if(value.errorCode < 0) {
      if(fail !== null) {
        fail(value.errorMsg, -1)
      }
      return 
    }
    storage.set({
      key: 'auth',
      value: data.headers['Set-Cookie'],
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
      value: 'true'
    })
    if(success !== null) {
      success(value.data)
    }
  }, function(data, code) {
    if(fail !== null) {
      fail('注册失败', -1)
    }
  })
}