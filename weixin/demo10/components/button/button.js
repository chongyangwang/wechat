// components/button/button.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    multipleSlots:true
  },
  properties: {
    openType: {
      type:String
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
  // open-data   仅仅只能拿到头像   拿不到当前的用户信息
  // 必须通过微信自带的button才能拿到用户信息   
  // 页面中有多个场景   不利用复用  所以将button提取出来
  methods: {
    onGetUserInfo(event){
      this.triggerEvent('getuserinfor',event.detail,{});
    }
  }
})
