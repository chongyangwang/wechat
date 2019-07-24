//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    Imgsrc: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  takePhoto: function() {
     const ctx = wx.createCameraContext()
     ctx.takePhoto({
       quality:'high',
       success: (res) => {
         console.log(res)
          this.setData({
            Imgsrc: res.tempImagePath
          })
        }
     })
  },
  startRecord: function(){
    const ctx = wx.createCameraContext()
    ctx.startRecord({
      success: (res) => {
        console.log(res)
        console.log('成功')
      },
      timeoutCallback: (res) => {
        console.log(res)
        console.log('超时')
      },
      error: (err) => {
        console.log(err)
      }
    })
  },
  chooseImage:function() {
    const _that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: 'camera',
      success(res) {
        // 选择图片成功的回掉函数
        console.log(res)
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success(resInfo) {
            // 获取图片信息成功的回掉函数
            console.log(resInfo)
            // tempFilePath可以作为img标签的src属性显示图片
            _that.setData({
              Imgsrc: res.tempFilePaths[0]
            })
            console.log(resInfo.width)
            console.log(resInfo.height)
          }
        })
      }
    })
  },
  stopRecord: function() {
    const ctx = wx.createCameraContext()
    ctx.stopRecord({
      success: (res) => {
        this.setData({
          videoSrc: res.tempVideoPath
        })
        console.log('已结束录像')
      }
    })
  }
})
