import { config } from '../config.js'
const tips = {
  1: '抱歉出现了一个错误',
  1005:'appkey无效或错误',
  3000: '期刊不存在'
}
export class HTTP { 
  request(params){
    if (!params.method){params.method = 'GET';}
    wx.request({
      url: config.baseUrl + params.url,
      method: params.method,
      data:params.data,
      header: {
        'Content-Type': 'application/json',
        'appkey': config.appkey
      },
      success:(res)=>{
        if(res.statusCode.toString().startsWith('2')){
          params.success && params.success(res.data)
        } else {
          let error_code = res.data.error_code
          this._showerror(error_code)
        }
      },
      fail:(err)=>{
        // 提示错误
        this._showerror(1)
      }
    })
  }
  _showerror(code){
    if (!code) {code = 1}
    let tip = tips[code]
    wx.showToast({
      title: tip? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}