// pages/faultinfo/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "terminalName": "壁挂炉BJ29991",
    "faultName": "制热故障",
    "faultInfo": "不制热不制热不制热",
    "repairmanName": "张三",
    "repairmanTel": "18212444211",
    "createDate": "2019-11-16 12:00:00",
    "doDate": "2019-11-19 12:00:00",
    "closeDate": "2019-11-22 12:00:00"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  getOrderInfo: function() {
    var that = this;
    wx.request({
      url: "http://localhost:8888/small/orderInfo",
      method: 'post',
      data: {
        id: "123"
      },
      success: function(res) { //请求成功
        console.log(res); //在调试器里打印网络请求到的json数据
        that.setData({
          terminals: res.data.data.terminals,
          faults: res.data.data.faults
        })
      },
      fail: function(res) { // 请求失败
      }
    })
  }
})