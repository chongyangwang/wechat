import { HTTP } from '../utils/request-p.js'
export class KeywordModel extends HTTP{
  key = 'q'
  maxLength = 10

  // 获取历史数据
  getHistory(){
    const words = wx.getStorageSync(this.key);
    // 判断是否在缓存中  且长度大于0
    if(!words){
      return []
    }
    return words
  }
  // 获取热门数据
  getHot(){
    return this.request({
      url: '/book/hot_keyword'
    })
  }
  // 向缓存中输入值
  addToHistory(keyword){
    // 先读取
    let words = this.getHistory();
    // 判断是不是已经存在的搜索内容
    const has = words.includes(keyword);
    if(!has){
      //不存在
      const length = words.length;
      if(words.length >= this.maxLength){
        words.pop()
      }
      //  若长度塞满  则先进先出（队列）  再补位   更新缓存
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }
}
