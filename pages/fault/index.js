import {
  $wuxForm
} from '../../dist/index'
const app = getApp()

Page({
  data: {
    visible1: false,
    value1: '',
    value2: '',
    displayValue1: '请选择',
    displayValue2: '请选择',
    terminals: [],
    faults: []
  },
  onLoad: function () {
    this.getBaseData();
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
  onSubmit() {
    
    var that=this;
    const {
      getFieldsValue,
      getFieldValue,
      setFieldsValue
    } = $wuxForm()
    const value = getFieldsValue()

    console.log('Wux Form Submit \n', value)

    wx.request({
      url: 'http://localhost:8888/order/addSave',
      method: 'POST',
      data: value,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          visible1: true,
        })
      }
    })
  },
  btnOpen(){
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
      url: "http://localhost:8888/small/faults",
      method:'GET',
      success: function (res) { //请求成功
        console.log(res);//在调试器里打印网络请求到的json数据
        that.setData({
          terminals: res.data.data.terminals,
          faults: res.data.data.faults
        })
      },
      fail: function (res) { // 请求失败
      }
    })
  }
})