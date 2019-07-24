// pages/classic/classic.js
import { Classic } from '../../models/classic'
import { Like } from '../../models/like'
const classicModel = new Classic()
const likeModel = new Like()
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    first: false,
    latest: true,
    classicData: null,
    fav_nums:0,
    like_status:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((data)=>{
      this.setData({
        classicData:data,
        like_status: data.like_status,
        fav_nums:data.fav_nums
      })
    })
  },
  // 监听点赞组件的事件  拿到点赞组件状态 作为参数提交 期刊id 期刊类型,
  //  此时才去同步数据库状态   针对每一个类型   和每一页的id
  onLike:function(e){
    let behavior = e.detail.behavior
    likeModel.like(behavior,this.data.classicData.id,this.data.classicData.type)
  },
  // 获得后一期数据
  onNext:function(){
    this._updateClassic('next')
  },
  // 获得前一期数据
  onPrevious:function(){
    this._updateClassic('previous')
  },
  //  切换开关时更新期刊信息
  _updateClassic:function(nextOrPrevious){
    //  得到当前页信息的索引
    let index = this.data.classicData.index
    // 根据索引以及触发的是前一页还是后一页的操作去加载数据
    classicModel.getClassic(index,nextOrPrevious,(data) => {
      // 单独获取点赞组件的点赞状态以及数量   传入类型  和id  并更新classic的数据
      this._getLikeStatus(data.id, data.type);
      this.setData({
        classicData: data,
        latest: classicModel.isLatest(data.index),
        first: classicModel.isFirst(data.index)
      })
    })
  },
  _getLikeStatus:function(artID,category){
    likeModel.getClassicLikeStatus(artID,category,(res) => {
      this.setData({
        fav_nums: res.fav_nums,
        like_status: res.like_status
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