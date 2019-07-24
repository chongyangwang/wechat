// components/classic/music/music.js
// import { classicBehavior } from '../classic-behavior'
import { classicBehavior } from '../classic-behavior'
const mMgr = wx.getBackgroundAudioManager();
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBehavior],
  properties: {
    src:String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    playSrc:'./images/player2.png',
    pauseSrc:'./images/player1.png'
  },
  attached(event){
    this._recoverStatus();
    this._monitorSwitch();
  },
  detached(event){
    // mMgr.stop()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function(event){
      //  没有播放   则切换为播放
      if(!this.data.playing){
        this.setData({
          playing:true
        })
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
      }else{
        this.setData({
          playing: false
        })
        mMgr.pause();
      }
    },
    _recoverStatus:function(){
      if(mMgr.paused){
        this.setData({
          playing:false
        })
        return
      }
      if(mMgr.src==this.properties.src){
        this.setData({
          playing:true
        })
      }
    },
    _monitorSwitch:function(){
      mMgr.onPlay(()=>{
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})
