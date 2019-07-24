// components/search/search.js
import { KeywordModel } from '../../models/keyword.js'
import { BookModel } from '../../models/book.js'
import {paginationBev}  from '../behaviors/pagination.js'
const Keyword = new KeywordModel();
const Book = new BookModel();

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],

  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    q:'',
    historyWords: [],
    hotWords: [],
    searching:false,
    loadingCenter: false
  },

  attached(){
    // 返回普通list
    const historyWords = Keyword.getHistory();
    // 返回Promise
    const hotWords = Keyword.getHot()
    // 更新data
    hotWords.then(res => {
      this.setData({
        hotWords:res.hot
      })
    })
    this.setData({
      historyWords
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    loadMore(){

      // 判断若没有关键字  则返回
      if(!this.data.q){
        return
      }
      // 为什么要有锁的机制   就是为了不浪费服务器的性能   旨在必要的时候去加载数据
      // 什么时候时侯为必要  
      // 1.例如服务器还有数据  可以接着加载更多
      // 2.服务器已经将上一次的请求处理完毕   并且还有可以被展示的数据   那么则执行加载
      // 如果正在加载  返回  就好像必须得等钱来才能办事   请求完钱就来
      if(this.isLocked()){
        return
      }
      // 如果还可以继续向服务端请求 先上锁 再执行请求
      if(this.hasMore()){
        this.locked()
        Book.search(this.getCurrentStart(),this.data.q).then(res=>{
          this.setMoreData(res.books)
          this.unLocked();
        },() => {
          // 无论请求成功与否  都将锁状态初始化
          this.unLocked();
        })
      }
    },
    // 取消时  隐藏组件 初始化各个状态
    onCancel:function(event){
      this.triggerEvent('cancel', {}, {})
      this.initialize();
    },
    // 回车或点击标签触发
    onConfirm(event){
      // 展示搜索结果   展示菊花  
      this._showResult();
      this._showLoadingCenter();
      // 判断是回车  还是点击标签
      const word = event.detail.value || event.detail.text;
      // 更新文本框内容
      this.setData({
        q: word,
      })
      Book.search(0,word).then(res=>{
        // 合并请求结果 得到总条目数
        this.setMoreData(res.books);
        this.setTotal(res.total);
        // 存入历史数据
        Keyword.addToHistory(word);
        // 请求完毕隐藏菊花
        this._hideLoadingCenter();
      })
    },
    //  删除时  隐藏结果  清空各个状态
    onDelete(event){
      this._closeResult()
      this.initialize()
    },
    
    // 显示中间菊花
    _showLoadingCenter(){
      this.setData({
        loadingCenter: true
      })
    },

    // 隐藏中间菊花
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    // 显示结果列表
    _showResult(){
      this.setData({
        searching: true
      })
    },
    // 展示结果列表
    _closeResult(){
      this.setData({
        searching: false,
        q:''
      })
    }
  }
})
