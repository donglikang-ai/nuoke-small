import {
  $wuxForm,
  $wuxToptips
} from '../../dist/index'
const app = getApp()

Page({
  data: {
    spinning: true,
    visible1: false,
    value1: '',
    value2: '',
    displayValue1: '请选择',
    displayValue2: '请选择',
    terminals: [],
    faults: [],
    userOpenid: '',
    showMask:true
  },
  onLoad: function () {
    var that = this;
    if (!wx.getStorageSync('userOpenid') || wx.getStorageSync('userOpenid')) {
      app.getOpenid().then((resArg) => {
        that.getBaseData();
      })
    } else {
      that.getBaseData();
    }
  },
  onUnload: function () {
    wx.reLaunch({
      url: '../index/index'
    })
  },
  setValue(values, key) {
    this.setData({
      [`value${key}`]: values.value,
      [`displayValue${key}`]: values.label,
    })
  },
  onConfirm(e) {
    const {
      index
    } = e.currentTarget.dataset
    this.setValue(e.detail, index)
    console.log(`onConfirm${index}`, e.detail)
  },
  onValueChange(e) {
    const {
      index
    } = e.currentTarget.dataset
    console.log(`onValueChange${index}`, e.detail)
  },
  onVisibleChange(e) {
    this.setData({
      visible: e.detail.visible
    })
  },
  maskHidden(e){
    console.log('123')
    
    this.setData({
      showMask: this.data.showMask?false:true
    })
  },

  onSubmit() {

    var that = this;

    that.setData({
      spinning: true
    })
    const {
      getFieldsValue,
      getFieldValue,
      setFieldsValue
    } = $wuxForm()
    const value = getFieldsValue()


    if (value.terminalName == null || value.terminalName == '' ||
      value.faultName == null || value.faultName == '' ||
      value.name == null || value.name == '' ||
      value.mobile == null || value.mobile == '' ||
      value.address == null || value.address == '' ||
      value.faultInfo == null || value.faultInfo == '') {

      that.setData({
        spinning: false
      })

      $wuxToptips().warn({
        hidden: false,
        text: '表单未填写完整',
        duration: 3000
      })


      return;
    }


    console.log('Wux Form Submit \n', value)

    wx.request({
      url: 'https://roc-saleservice.com/order/addSave',
      method: 'POST',
      data: value,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          spinning: false
        })
        that.templateNotice();
      },
      fail(res) {
        that.setData({
          spinning: false
        })
        $wuxToptips().warn({
          hidden: false,
          text: '提交失败，请稍后重试',
          duration: 3000,
          success() {
            wx.navigateTo({
              url: '../index/index'
            })
          },
        })
      }
    })
  },

  templateNotice() {
    var that = this;
    console.log('123')
    wx.requestSubscribeMessage({
      tmplIds: ['AnCv2dp1Jy3l2RcgE-0NTiw_IINFTVZuhwL0YDUumZ0'],
      success(res) {
        console.log(res)
      },
      complete(res) {
        wx.navigateTo({
          url: '../index/index'
        })
      }
    })
  },

  btnOpen() {
    this.setData({
      visible1: true,
    })
  },
  btnClose() {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  getBaseData: function () {
    var that = this;
    wx.request({
      url: "https://roc-saleservice.com/small/faults",
      method: 'GET',
      success: function (res) { //请求成功
        console.log(res); //在调试器里打印网络请求到的json数据
        that.setData({
          terminals: res.data.data.terminals,
          faults: res.data.data.faults,
          userOpenid: wx.getStorageSync('userOpenid'),
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