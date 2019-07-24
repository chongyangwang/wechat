//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    saveMessage: '',
    disableStatus: true
  },
  setStorage:function(){
    const _that = this
    wx.setStorage({
      key: "motto",
      data: _that.data.motto
    })
    this.getStorageInfo()
  },
  setOtherStorage: function() {
    const _that = this
    wx.setStorage({
      key: "other",
      data: '让我掉下眼泪的,不止昨夜的酒'
    })
    this.getStorageInfo()
  },
  getangShowstorage:function(){
    const _that = this
    wx.getStorage({
      key: "motto",
      success:function(res){
        _that.setData({
          saveMessage: res.data
        })
      }
    })
  },
  getStorageInfo: function () {
    const _that = this
    wx.getStorageInfo({
      success(res) {
        console.log(res.currentSize)
        if (res.keys.length > 1) {
          _that.setData({
            disableStatus: false
          }) 
        }
      }
    })
  },
  clearStorage: function () {
    wx.clearStorage()
  },
})
