//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  startRecorder:function() {
    const recorderManager = wx.getRecorderManager()
    const options = {
      duration: 10000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'aac',
      frameSize: 50
    }
    recorderManager.start(options)
    recorderManager.onStart(() => {
      console.log('recorder start')
    })
  }
})
