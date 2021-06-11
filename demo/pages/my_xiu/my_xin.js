// pages/my_xiu/my_xin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo:wx.getStorageSync('user')
    })
  },
  //输入框数据双向绑定
  xiugai: function (e) {
    if (e.currentTarget.dataset.index == 0) {
      this.data.mendian = e.detail.value
    }else if (e.currentTarget.dataset.index == 1) {
      this.data.dizi = e.detail.value
    }else if (e.currentTarget.dataset.index == 2) {
      this.data.name = e.detail.value
    }else if (e.currentTarget.dataset.index == 3) {
      this.data.phone = e.detail.value
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  exit:function(){
    try {
      wx.clearStorageSync()
      wx.navigateBack({
        delta: 1
      })
    } catch(e) {
      // Do something when catch error
    }
  },
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