// pages/my_xiu/my_xin.js


Page({
  data: {
    userInfo: '',
  },
  onLoad: function (options) {
    
  },
  //输入框数据双向绑定
  xiugai: function (e) {
    if (e.currentTarget.dataset.index == 0) {
      this.data.userInfo.name = e.detail.value
    } else if (e.currentTarget.dataset.index == 1) {
      this.data.userInfo.sex = e.detail.value
    } else if (e.currentTarget.dataset.index == 2) {
      this.data.userInfo.phone = e.detail.value
    } else if (e.currentTarget.dataset.index == 3) {
      this.data.userInfo.mendian = e.detail.value
    } else if (e.currentTarget.dataset.index == 4) {
      this.data.userInfo.dizi = e.detail.value
    }
  },
  //保存按钮点击触发函数
  keep: function () {
    var that = this
    wx.request({
      url: 'http://localhost:3000/change',
      data : {
        openid:wx.getStorageSync('user').openid,
        data_base: this.data.userInfo
      },
      method: "POST",
      success(res) {
        wx.setStorageSync('user', that.data.userInfo)
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  change_img: function () {
    var that = this
    wx.chooseImage({
      success(res) {
        var tempFilePaths = res.tempFilePaths
        that.data.userInfo.img = tempFilePaths
        wx.setStorageSync('user', that.data.userInfo)
        that.setData({
          userInfo: wx.getStorageSync('user')
        })
        wx.uploadFile({
          url: 'http://localhost:3000/change_img', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'img',
            openid:wx.getStorageSync('user').openid
          },
          success(res) {
            console.log(res)
            const data = res.data
            //do something
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  exit: function () {
    try {
      wx.clearStorageSync()
      wx.navigateBack({
        delta: 1
      })
    } catch (e) {
      // Do something when catch error
    }
  },


  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userInfo: wx.getStorageSync('user')
    })
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