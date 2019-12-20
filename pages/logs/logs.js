//logs.js
const app = getApp()

Page({
  data: {

    spinning: true,
    orders:[],
    actions:[
      {type:'default',
      text:'详细内容'}
    ]
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var that = this;
    if (!wx.getStorageSync('userOpenid') || wx.getStorageSync('userOpenid')) {
      app.getOpenid().then((resArg) => {
        that.getOrders();
      })
    } else {
      that.getOrders();
    }
  },
  onUnload: function () {
    wx.reLaunch({
      url: '../index/index'
    })
  },
  faultInfo(e){
   
    wx.navigateTo({
      url: '../faultinfo/info?id=' + e.currentTarget.dataset.id
    })
  },
  getOrders: function () {
    var that = this;
    wx.request({
      url: "http://www.roc-saleservice.com/small/orders",
      method: 'POST',
      data: {
        openid: wx.getStorageSync('userOpenid')
      },
      success: function (res) { //请求成功
        console.log(res);//在调试器里打印网络请求到的json数据
        that.setData({
          orders: res.data.data.orders,
          spinning: false
        })
      },
      fail: function (res) { // 请求失败
        that.setData({
          spinning: false
        })
      }
    })
  }
})
