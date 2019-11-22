// pages/authorize/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  bindInfo: function (e) {
    if (e.detail.userInfo) {
      console.log('授权通过')
      app.globalData.userInfo = e.detail.userInfo;
      wx.reLaunch({
        url: '/pages/index/index',
      })
    } else {
      console.log('拒绝授权')
      wx.reLaunch({
        url: '/pages/checkAgain/checkAgain',
      })
    }
  }
})