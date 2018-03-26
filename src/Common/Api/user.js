import api from './index'
var storage = require('@system.storage');

export function login(params, success = null, fail = null) {
  api.login(params, function(data) {
    storage.set({
      key: 'auth',
      value: data.headers['Set-Cookie'],
      success:function(data){
        console.log('cookies保存成功');
      }
    })
    if(success != null) {
      success(JSON.parse(data.data));
    }
  }, fail)
}

export function getCollect(page, success = null, fail = null) {
  api.getCollect(page, function(data) {
    console.log(data.data);
    if(success != null) {
      success(JSON.parse(data.data))
    }
  }, fail)
}