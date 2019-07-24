// pages/book/book.js
import { BookModel } from '../../models/book.js'
import { random } from '../../utils/common.js'
const bookModel = new BookModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    more: '',
    books:[],
    searching:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     //   保留了return的能力
      bookModel.getHotList().then(res=>{
        this.setData({
          books: res
        })
      })
  },
  onSearch:function(event){
    this.setData({
      searching:true
    })
  },
  onCancel(){
    this.setData({
      searching: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 监听用户下拉事件
    // 更新一个随机的字符串 传递给搜索组件
    // 组件检测有更新  就去加载服务器端的数据
    this.setData({
      more: random(16)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})