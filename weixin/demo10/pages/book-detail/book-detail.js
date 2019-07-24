// pages/book-detail/book-detail.js
import { BookModel } from '../../models/book.js'
const bookModel = new BookModel()
import { Like } from '../../models/like.js'
const likeModel = new Like()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:[],
    book:null,
    likeStatus:false,
    likeCount:0,
    posting:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const bid= options.bid
    // 获取书籍详情
    const detail = bookModel.getDetail(bid)
    // 获取短评列表
    const comments = bookModel.getComments(bid)
    // 获取点赞状态及数量
    const likeStatus= bookModel.getLikeStatus(bid)

     Promise.all([detail,comments,likeStatus]).then(res => {
        this.setData({
          book:res[0],
          comments: res[1].comments,
          likeStatus: res[2].like_status,
          likeCount: res[2].fav_nums
        })
     })
  },
  onLike:function(event){
    const like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },
  onFakePost:function(){
     this.setData({
        posting:true
     })
  },
  onCancel:function(event){
    this.setData({
      posting:false
    })
  },
  onPost:function(event){
    let comment = event.detail.value || event.detail.text
    if(!comment){
      return 
    }
    if(comment.length>12){
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return 
    }
    bookModel.postComment(this.data.book.id,comment).then(res=>{
      wx.showToast({
        title: "+ 1",
        icon: "none"
      })
      this.data.comments.unshift({
        content:comment,
        nums: 1
      })
      this.setData({
        comments: this.data.comments,
        posting: false
      })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})