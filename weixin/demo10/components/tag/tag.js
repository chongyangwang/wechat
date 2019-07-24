// components/tag/tag.js
Component({
  //  接收多个插槽
  options: {
    multipleSlots: true
  },
  // //  接收组件外类名
  externalClasses:['tag-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    text:{
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event){
      this.triggerEvent('tapping', {
        text:this.properties.text
      })
    }
  }
})
