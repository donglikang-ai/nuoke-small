//app.js
App({
  globalData: {
    openid: ''
  },
  Promise: null,
  onLaunch: function() {
    //初始化的时候调用getOpenid
    this.Promise = this.getOpenid()
  },
  getOpenid() {
    return new Promise((resolve, reject) => {
      // 登录
      wx.login({
        success: res => {
          wx.request({
            url: 'http://39.98.204.34:80/small/getUserInfo',
            data: {
              code: res.code
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            }, // 设置请求的 header
            success: res => {
              console.log('获取用户unionId', res);
              this.globalData.openid = res.data.data.openid
              wx.setStorage({
                key: 'userOpenid',
                data: res.data.data.openid,
              })
              var resArg = res.data.data.openid;
              resolve(resArg)
            },
            fail: function () {
              console.log("index.js wx.request CheckCallUser fail");
              reject()
            }
          })
        }
      })
   
    })
  }
})