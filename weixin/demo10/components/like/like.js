// components/like/like.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean
    },
    count: {
      type: Number
    },
    readOnly:{
      type:Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    "dark_url": './images/like_dark.png',
    "highlight_url":'./images/like_highlight.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handelChangeCollectStatus(){
      if(this.properties.readOnly){
        return 
      }
      let like = this.properties.like;
      let count = this.properties.count;
      count = like? count-1 : count+1
      this.setData({
        like: !like,
        count: count
      })
      // 保存并把状态作为触发事件的参数
      let behavior = this.properties.like ?'like':'cancel'
      // 触发自定义事件
      this.triggerEvent('like',{
        behavior:behavior
      },{})
    }
  }
})
