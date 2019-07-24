const paginationBev = Behavior({

  properties:{

  },
  data:{
    dataArray:[],
    total:null,
    noneResult:false,
    loading:false
  },
  methods:{
    // 将加载的结果合并至原来的结果集
    setMoreData(dataArray){
      const temp = this.data.dataArray.concat(dataArray);
      this.setData({
        dataArray:temp
      })
    },
    // 拿到请求的起始条数
    getCurrentStart(){
      return this.data.dataArray.length
    },
    // 设置总条目数  如果返回total结果为0  则提示用户相应信息
    setTotal(total){
      this.data.total = total
      if(total==0){
        this.setData({
          noneResult: true
        })
      }
    },
    // 判断是不是还有数据   如果有就返回true表示可以继续加载
    // 否则返回false
    hasMore(){
      if(this.data.dataArray.length>=this.data.total){
        return false
      } else {
        return true
      }
    },
    // 清空数据
    // 关于setData   与  this.data 直接改变值的区别
    // setData会同步更新视图  而直接改变值则不会
    initialize(){
      this.setData({
        dataArray: [],
        noneResult: false,
        loading: false
      })
      this.data.total = null
    },
    isLocked(){
      return this.data.loading ? true : false 
    },
    locked(){
      this.setData({
        loading: true
      })
    },
    unLocked(){
      this.setData({
        loading:false
      })
    }
  }
})
export {
  paginationBev
}