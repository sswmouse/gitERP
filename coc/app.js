// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://127.0.0.1:3000/onLogin',
            data: {
              code: res.code
            },
            method: "POST",
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              wx.setStorageSync('token', res.data.desc)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        console.log(userInfo)
      }
    })
    const accountInfo = wx.getAccountInfoSync();
    console.log(accountInfo) // 小程序 appId

    // 登录
    // wx.removeStorageSync('session_key')
    // var value = wx.getStorageSync('token')
    // if (value) {
    //   wx.checkSession({
    //     success() {
    //       console.log('session_key 未过期，并且在本生命周期一直有效')
    //     },
    //     fail() {
    //       console.log('session_key 已经失效，需要重新执行登录流程')
    //       //重新登录  
    //       wx.login({
    //         success(res) {
    //           if (res.code) {
    //             //发起网络请求
    //             wx.request({
    //               url: 'http://127.0.0.1:3000/onLogin',
    //               data: {
    //                 code: res.code
    //               },
    //               method: "POST",
    //               header: {
    //                 'content-type': 'application/json' // 默认值
    //               },
    //               success(res) {
    //                 wx.setStorageSync('token', res.data.desc)
    //               }
    //             })
    //           } else {
    //             console.log('登录失败！' + res.errMsg)
    //           }
    //         }
    //       })
    //     }
    //   })
    // } else {
    //   console.log('session_key 不存在，请先登录')
    // }
  },
  data: {
    url: 'http://47.117.121.44:3000/images/'
  },
  globalData: {
    userInfo: null
  }
})
