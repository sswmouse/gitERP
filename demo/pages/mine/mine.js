// pages/mine/mine.js
const APP = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    head_img: APP.globalUrl.url + "images/" + "default_avatar.png",  //头像图片
    help_icon: APP.globalUrl.url + "images/" + "help_icon.png",  //帮助中心图标
    gywm_icon: APP.globalUrl.url + "images/" + "about_us_icon.png",  //关于我们图标
    set_icon: APP.globalUrl.url + "images/" + "set_icon.png",  //设置图标
    arrow_icon: APP.globalUrl.url + "images/" + "gray_arrow.png",  //箭头图标
  },
  exit() {
    this.setData({ 
      hasUserInfo: false 
    })
    try {
      wx.clearStorageSync()
      console.log(wx.getStorageSync('user') || {});
    } catch(e) {
      // Do something when catch error
    }
  },
  login() {
    let that = this
    wx.getUserProfile({
      desc: '获取用户信息用户登录演示', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        let wxuserinfo = res.userInfo
        wx.login({
          success (res) {
            if (res.code) {
              wx.request({
                url: 'http://localhost:3000/onLogin',
                data: {
                  code: res.code
                },
                method:"POST",
                success (res) {
                  let myuserinfo = res.data.detail[0]
                  that.setData({
                    //拼接用户注册信息和用户信息
                    userInfo: Object.assign(myuserinfo, wxuserinfo),
                    hasUserInfo: true
                  })
                  wx.setStorageSync('user', that.data.userInfo)
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    if(wx.getStorageSync('user')){
      this.setData({
        hasUserInfo:true,
        userInfo:wx.getStorageSync('user')
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})