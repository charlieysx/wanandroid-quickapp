import api from './index'
var storage = require('@system.storage')

export function login(params, success = null, fail = null) {
  api.login(params, function(data) {
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
      key: 'isLogin',
      value: true
    })
    if(success !== null) {
      success(value)
    }
  }, function(data, code) {
    if(fail !== null) {
      fail('登录失败', -1)
    }
  })
}

export function register(params, success = null, fail = null) {
  api.register(params, function(data) {
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
      key: 'isLogin',
      value: 'true'
    })
    if(success !== null) {
      success(value)
    }
  }, function(data, code) {
    if(fail !== null) {
      fail('注册失败', -1)
    }
  })
}

export function getCollect(page, success = null, fail = null) {
  api.getCollect(page, function(data) {
    if(success != null) {
      success(JSON.parse(data.data))
    }
  }, fail)
}