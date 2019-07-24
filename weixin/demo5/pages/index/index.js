//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    x:0,
    y:0
  },
  tap: function(e) {
    this.setData({
      x:30,
      y:30
    })
  },
  onChange: function (e) {
    console.log(e.detail)
  },
  onScale: function (e) {
    console.log(e.detail)
  }
})