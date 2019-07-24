//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    focus: false,
    inputValue: '',
    activeColor: 'red',
    items: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'TUR', value: '法国' },
    ],
    nodes:[{
      name: 'p',
      attrs: {
        class: 'p1',
        style: 'color:red;background:yellow;height：60px;line-height:60px;'
      },
      children: [{
        type: 'node',
        name: 'span',
        attrs: {
          class: 'p_2',
          style: 'color:#0f0;background:green;height：60px;line-height:60px;'
        },
        children:[
          {
            type: 'text',
            text:'这是p节点下的span节点下的文本节点'
          }
        ]
      }]
    }]
  },
  tap() {
    console.log('tap')
  },
  // 复选框
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  // input
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindReplaceInput: function (e) {
    var value = e.detail.value
    var pos = e.detail.cursor
    if (pos != -1) {
      //光标在中间
      var left = e.detail.value.slice(0, pos)
      //计算光标的位置
      pos = left.replace(/11/g, '2').length
    }

    //直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos
    }
    //或者直接返回字符串,光标在最后边
    //return value.replace(/11/g,'2'),
  },
  slider2change(e) {
    console.log(e.detail.value)
  },
  switch1Change: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  },
  switch2Change: function (e) {
    console.log('switch2 发生 change 事件，携带值为', e.detail.value)
  }
})
