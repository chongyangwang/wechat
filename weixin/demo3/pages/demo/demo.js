//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  //事件处理函数
  handleCapture1(e){
    console.log(e)
    console.log('盒子1捕获阶段')
  },
  handleCapture2(e) {
    console.log(e)
    console.log('盒子2捕获阶段')
  },
  handleCapture3(e) {
    console.log(e)
    console.log('盒子3捕获阶段')
  },
  handleTap3(e){
    console.log(e)
    console.log('盒子3冒泡阶段')
  },
  handleTap2(e) {
    console.log(e)
    console.log('盒子2冒泡阶段')
  },
  handleTap1(e) {
    console.log(e)
    console.log('盒子1冒泡阶段')
  }
})
