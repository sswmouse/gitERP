// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    this.checksession()
  },
  // 检查微信登录状态
  checksession: function () {
    let that = this
    wx.checkSession({
      success: function (res) {
        console.log(res, '登录未过期')
        that.checkuser()
      },
      fail: function (res) {
        console.log(res, '登录过期')
        that.checkuser()
      }
    })
  },
  // 检查自定义登录状态
  checkuser: function () {
    console.log("调用登录了")
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: 'http://localhost:3000/onLogin',
            data: {
              code: res.code
            },
            method: "POST",
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              if (res.data.code == 0) wx.navigateTo({ url: '/pages/register/register' })
              console.log(res.data)
              console.log(wx.getStorageSync('user'))
              if (!wx.getStorageSync('user')) wx.switchTab({ url: '/pages/mine/mine' })
              // if(res.data.code == 1) wx.navigateTo({url: '/pages/index/index'})
            }, fail() {
              console.log('后台服务器连接失败')
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },


  globalData: {
    userInfo: null
  },
  // 全局数据
  globalUrl: {
    url: "http://47.117.121.44:3000/"
  },
})
