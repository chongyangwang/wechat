// components/navi/navi.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type: String
    },
    first: {
      type: Boolean
    },
    latest: {
       type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc:'images/triangle.dis@left.png',
    leftSrc:'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /*若latest为真  则表示最新  不应该在点击left按钮时去触发事件*/
    // onleft  表示加载后一期刊
    onLeft:function(event){
      if(!this.properties.latest){
        this.triggerEvent('left',{},{})
      }
    },
    // onRight 表示加载前一期刊
    onRight: function (event) {
      if (!this.properties.first) {
        this.triggerEvent('right', {}, {})
      }
    }
  }
})
