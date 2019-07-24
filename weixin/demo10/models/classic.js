import {HTTP} from '../utils/request.js'
// 继承HTTP类
export class Classic extends HTTP {
  getLatest(callback){
    this.request({
      url:'/classic/latest',
      success: (res => {
        callback(res)
        // 在缓存中写入最新期刊号
        this._setLatestIndex(res.index)
        //  在缓存中写入最新期刊信息  classic-x
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      })
    })
  }
  getClassic(index,nextOrPrevious,callback){
    let key = nextOrPrevious === 'next' ? this._getKey(index+1) : this._getKey(index-1)
    let classic = wx.getStorageSync(key)
    if(!classic){
      this.request({
        url: '/classic/' + index + '/' + nextOrPrevious,
        success: (res => {
          wx.setStorageSync(this._getKey(res.index), res)
          callback(res)
        })
      })
    } else {
      callback(classic)
    }
  }
  isLatest(index){
    let ind = this._getLatestIndex()
    return ind == index ? true : false
  }
  isFirst(index){
    return index == 1 ? true : false
  }
  getMyFavor(success){
    const params = {
      url: 'classic/favor',
      success: success
    };
    this.request(params);
  }

  _setLatestIndex(index){
    wx.setStorageSync('latest', index)
  }
  _getLatestIndex(){
    return wx.getStorageSync('latest')
  }
  _getKey(index){
    return 'classic-' + index
  }
}