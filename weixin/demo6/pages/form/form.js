// pages/form/form.js
Page({
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  onLoad: function (options) {
    console.log(options.title)
  }
})