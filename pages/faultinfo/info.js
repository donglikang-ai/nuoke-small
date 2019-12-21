const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    spinning: true,
    "terminalName": "",
    "faultName": "",
    "faultInfo": "",
    "repairmanName": "",
    "repairmanTel": "",
    "createDate": "",
    "doDate": "",
    "closeDate": "",
    "finishStatus": 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log("请求----" + options.id)
    that.setData({
      "orderid": options.id
    })
    if (!wx.getStorageSync('userOpenid') || wx.getStorageSync('userOpenid')) {
      app.getOpenid().then((resArg) => {
        that.getOrderInfo();
      })
    } else {
      that.getOrderInfo();
    }
  },
  onUnload: function() {
    wx.reLaunch({
      url: '../index/index'
    })
  },
  getOrderInfo: function() {
    var that = this;
    console.log("请求----" + that.data.orderid)
    wx.request({
      url: "https://roc-saleservice.com/small/orderInfo",
      method: 'post',
      data: {
        id: that.data.orderid
      },
      success: function(res) { //请求成功
        console.log(res); //在调试器里打印网络请求到的json数据
        that.setData({
          terminalName: res.data.data.terminalName,
          faultName: res.data.data.faultName,
          faultInfo: res.data.data.faultInfo,
          repairmanName: res.data.data.repairmanName == null ? '' : res.data.data.repairmanName,
          repairmanTel: res.data.data.repairmanTel == null ? '' : res.data.data.repairmanTel,
          createDate: res.data.data.createDate == null ? '' : res.data.data.createDate,
          doDate: res.data.data.doDate == null ? '' : res.data.data.doDate,
          closeDate: res.data.data.closeDate == null ? '' : res.data.data.closeDate,
          finishStatus: res.data.data.status,
          spinning: false
        })
      },
      fail: function(res) { // 请求失败
        that.setData({
          spinning: false
        })
      }
    })
  }
})