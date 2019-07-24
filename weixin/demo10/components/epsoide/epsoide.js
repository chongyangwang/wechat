// components/epsoide/epsoide.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index:{
      type: Number,
      // 若直接设置index的话   若为Number类型   则"08"=> 8 未检测到变化  
      // 若为String  每次有更新则重新渲染 则会栈溢出   故借助_index变量来实现
      observer:function(newVal,oldVal,path){
        let value = newVal>10? newVal : '0' + newVal
        this.setData({
          _index: value
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    _index:'',
    month:'',
    year:''
  },
  
  /**
   * 组件的方法列表
   */
  methods: {

  },
  attached:function(){
    let year = new Date().getFullYear();
    let month = new Date().getMonth()
    this.setData({
      year: year,
      month: this.data.months[month]
    })
  }
})
