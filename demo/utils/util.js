const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const APP = getApp();
const SERVER_URL =  APP.globalUrl.url;
//项目URL相同部分，减轻代码量，同时方便项目迁移
const REQUESTURL =  APP.globalUrl.url;
function request(config, callback, errorCallBack) {
  //请求接口时默认loading效果，黑色本框转圈圈
  wx.showLoading();
  wx.request({
    url: REQUESTURL+config.url,
    method:config.method?config.method:"GET",
    data:config.data?config.data:"",
    success(res){
      if(res.data.code==200){
        wx.hideLoading();     　　　　　　　　//隐藏loading
        //默认成功展示对号
        if (callback) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          callback(res)
        }
      }else if(res.data.code==406){
      //跳转登录
      }else{
        wx.hideLoading();　　　　　　　　　　　//隐藏loading
        if (errorCallBack) {
          errorCallBack(res)
        } else {
           wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    }
  })
}

module.exports = {
  formatTime,
  request: request,
  SERVER_URL
}
