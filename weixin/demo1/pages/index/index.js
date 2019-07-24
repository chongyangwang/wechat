//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    count: 0,
    InOut: 'InOut',
    showMsg: 'HelloWord',
    loading: false,
    disabled: false,
    number: 10,
    switchFlag: false,
    talkContent: '我自横刀向天笑,去留肝胆两昆仑',
    viewTemplateData:{
      viewTemplateName: '模板渲染',
      viewTemplateAttribute: 'dom',
      viewTemplateContent:'你好乔安'
    },
    iconStyles: [
      {
        'color':'red',
        'size': 20,
        'type':'success'
      },
      {
        'color': 'orange',
        'size': 30,
        'type': 'success_no_circle'
      },
      {
        'color': 'yellow',
        'size': 40,
        'type': 'info'
      },
      {
        'color': 'green',
        'size': 50,
        'type': 'warn'
      },
      {
        'color': 'blue',
        'size': 60,
        'type': 'waiting'
      }
    ]
  },
  clickMe(e) {
    const id = e.currentTarget.id;
    const In = e.currentTarget.dataset.in
    const Out = e.currentTarget.dataset.out
    this.data.count++;
    this.data.showMsg = id  + ' : Hellow word';
    this.data.InOut = id+ In + '/' + Out + '___'+this.data.count+'次'
    this.setData(this.data);
  },
  showTalk(e){
    this.data.switchFlag = true
    this.setData(this.data)
  },
  onGotUserInfo: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  }
})
