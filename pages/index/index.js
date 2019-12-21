//index.js
//获取应用实例
import {
  $wuxToast
} from '../../dist/index'
const app = getApp()

Page({
  data: {
    spinning: true,
    swiperCurrent: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 800,
    circular: true,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://roc-saleservice.com/small/pic'
    }],
    orderTime: '',
    orderInfo: '',
    actions: [
      {
        type: 'default',
        text: '详细内容'
      }
    ]

  },
  //事件处理函数
  faultForm: function() {
    if (this.data.ordersNum == 1) {
      //存在未处理完成订单时，无法新建订单

      $wuxToast().show({
        type: 'forbidden',
        duration: 1500,
        color: '#fff',
        text: '存在未处理订单',
        success: () => console.log('存在未处理订单')
      })

    } else {
      wx.navigateTo({
        url: '../fault/index'
      })
    }

  },
  faultHistory: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  checkFault: function() {
    $wuxToast().show({
      type: 'default',
      duration: 1500,
      color: '#fff',
      icon: 'md-build',
      text: '功能开发中',
      success: () => console.log('自定义图标')
    })
  },
  aboutUs: function() {
    $wuxToast().show({
      type: 'default',
      duration: 1500,
      color: '#fff',
      icon: 'md-build',
      text: '功能开发中',
      success: () => console.log('自定义图标')
    })
  },
  onLoad: function() {
    var that = this;
    if (!wx.getStorageSync('userOpenid') || wx.getStorageSync('userOpenid')) {
      app.getOpenid().then((resArg) => {
        that.getBaseData();
      })
    } else {
      that.getBaseData();
    }
  },
  getBaseData: function() {
    var that = this;
    wx.request({
      url: "https://roc-saleservice.com/small/info",
      method: 'POST',
      data: {
        openid: wx.getStorageSync('userOpenid')
      },
      success: function(res) { //请求成功
        console.log(res); //在调试器里打印网络请求到的json数据
        console.log(res.data.data.orders.length);
        that.setData({
          notice: res.data.data.notice,
          ordersNum: res.data.data.orders.length == 0 ? 0 : 1,
          orders: res.data.data.orders,
          spinning: false
        })
      },
      fail: function(res) { // 请求失败
        that.setData({
          spinning: false
        })
      }
    })
  },
  faultInfo(e) {
    console.log(e)
    wx.navigateTo({
      url: '../faultinfo/info?id=' + e.currentTarget.dataset.id
    })
  }
})