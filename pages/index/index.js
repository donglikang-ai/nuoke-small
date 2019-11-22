//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    swiperCurrent: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 800,
    circular: true,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://p3.pstatp.com/large/43700001e49d85d3ab52'
    }, {
      id: 1,
      type: 'image',
      url: 'https://p3.pstatp.com/large/39f600038907bf3b9c96',
    }, {
      id: 2,
      type: 'image',
      url: 'https://p3.pstatp.com/large/31fa0003ed7228adf421'
    }],
    orderTime: '2019-11-12 18:38:00',
    orderInfo: '故障设备：BJ001232\r\n故障类型：不制热'

  },
  //事件处理函数
  faultForm: function() {


    console.log(this.data.openid);
    console.log(this.data.ordersNum);
    if (this.data.ordersNum==1){
      //存在未处理完成订单时，无法新建订单
      wx.showToast({
        title: '存在未处理订单，无法新建订单',
        duration: 2000
      })
    }else{
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
    wx.showToast({
      title: '功能开发中',
      icon: 'md-build',
      duration: 2000
    })
  },
  aboutUs: function() {
    wx.showToast({
      title: '功能开发中',
      icon: 'md-build',
      duration: 2000
    })
  },
  onLoad: function() {
    this.getBaseData();
    app.getopenid(this.cb)
  },
  cb: function (res) {
    let that = this
    console.log("write cb res", res)
    that.setData({
      openid: res
    })
  },

  getBaseData:function(){
    var that=this;
    wx.request({
      url: "http://localhost:8888/small/info",
      method: 'POST',
      data: {
        openid: app.globalData.openid
      },
      success: function (res) { //请求成功
        console.log(res);//在调试器里打印网络请求到的json数据
        console.log(res.data.data.orders.length);
        that.setData({
          notice:res.data.data.notice,
          ordersNum: res.data.data.orders.length==0?0:1,
          orders: res.data.data.orders
        })
      },
      fail: function (res) { // 请求失败
      }
    })
  }
})