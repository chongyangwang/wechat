import { config } from '../config.js'
const tips = {
  1: '抱歉出现了一个错误',
  1005: 'appkey无效或错误',
  3000: '期刊不存在'
}
export class HTTP {
  //  把这个方法想象成 fetchPost   你懂的
  request({url, data = {}, method = 'GET'}){
    return new Promise((resolve,reject)=>{
      this._request(url,resolve,reject,data,method)
    })
  }
  _request(url,resolve,reject,data,method) {
    wx.request({
      url: config.baseUrl + url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        if (res.statusCode.toString().startsWith('2')) {
          resolve(res.data)
        } else {
          let error_code = res.data.error_code
          this._showerror(error_code)
          reject()
        }
      },
      fail: (err) => {
        // 提示错误
        this._showerror(1)
        reject()
      }
    })
  }
  _showerror(code) {
    if (!code) { code = 1 }
    // 返回有code码  但不在tips中
    const tip = tips[code]     
    wx.showToast({
      title: tip ? tip : tips[1],   // 判断是不是tips中由此信息  有执行此信息  没有  提示错误
      icon: 'none',
      duration: 2000
    })
  }
}