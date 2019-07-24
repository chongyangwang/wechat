import { HTTP } from '../utils/request.js'
// 继承HTTP类
export class Like extends HTTP {
  like(behavior, artID, categary) {
    let url = behavior == 'like' ? '/like':'/like/cancel'
    this.request({
      url: url,
      method: 'POST',
      data: {
        'art_id': artID,
        'type': categary
      }
    })
  }
  getClassicLikeStatus(artID,category,callback){
    this.request({
      url:'/classic/' + category + '/' + artID + '/favor',
      success: callback
    })
  }
}