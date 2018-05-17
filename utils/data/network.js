const App = getApp();
const Util = require('../util.js');
const Servser = 'http://13.209.5.115:8080';

export function GET(requestHandler) {
  wx.request({
    url: Servser + requestHandler.url,
    data: requestHandler.params,
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    success: function(res){
      if(res.code === 0){
        requestHandler.success && requestHandler.success(res);
      } else {
        requestHandler.success && requestHandler.success(res);
      }
    },
    fail: function(res) {
      requestHandler.fail && requestHandler.fail(res);
    },
    complete: function(res) {
      requestHandler.complete && requestHandler.complete(res);
    }
  })
}

export function POST(requestHandler){
  App.globalData.networkFlag = false;
  let timer = setTimeout(function (){
    App.globalData.networkFlag = true;
  }, 10 * 1000);
  //在标题栏中显示加载
  wx.showNavigationBarLoading();
  wx.request({
    url: Servser + requestHandler.url,
    data: requestHandler.params,
    header: requestHandler.header || {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    /*请求成功*/
    success: function(res){
      if(requestHandler.success){
        requestHandler.success(res.data);
        return;
      }
      if(res.data.code === '200'){
        /*返回code0*/
        requestHandler.success_0 && requestHandler.success_0(res.data.data);
      } else {
        /*返回code1*/
        if(requestHandler.success_1 && typeof requestHandler.success_1 === 'string'){
          Util.alert(requestHandler.success_1);
          return;
        }
        if(requestHandler.success_1 && typeof requestHandler.success_1 !== 'string'){
          requestHandler.success_1(res.data);
          return;
        }
        if(typeof requestHandler.success_1 === 'undefined' && res.data.msg){
          Util.alert('未知错误');
        }
      }
    },
    /*请求失败*/
    fail: function(res) {
      if(requestHandler.fail){
        if(typeof requestHandler.fail === 'string'){
          Util.alert(requestHandler.fail);
        }
        if(typeof requestHandler.fail !== 'string'){
          requestHandler.fail(res);
        }
      } else {
        Util.alert('请检查网络');
      }
    },
    complete: function(res) {
      App.globalData.networkFlag = true;
      clearInterval(timer);
      //完成停止加载
      wx.hideNavigationBarLoading();
      requestHandler.complete && requestHandler.complete(res);
    }
  })
}