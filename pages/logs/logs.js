//logs.js
const app = getApp()

Page({
  data: {
    orders:[]
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    this.getOrders();
  },
  getOrders: function () {
    var that = this;
    wx.request({
      url: "http://localhost:8888/small/orders",
      method: 'POST',
      data: {
        openid: '13'
      },
      success: function (res) { //请求成功
        console.log(res);//在调试器里打印网络请求到的json数据
        that.setData({
          orders: res.data.data.orders
        })
      },
      fail: function (res) { // 请求失败
      }
    })
  }
})
