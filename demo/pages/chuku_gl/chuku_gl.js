// pages/chuku/chuku.js
const APP = getApp()
Page({
  /*** 页面的初始数据*/
  data: {
    left_icon: APP.globalUrl.url + "images/title_border.png",  //页面左侧图标
    arrow_icon: APP.globalUrl.url + "images/black_arrow.png",  //箭头图标
    add_icon: APP.globalUrl.url + "images/add_icon_yellow.png",  //添加货品图标
    txm_icon: APP.globalUrl.url + "images/scan_icon.png",  //扫条码图标
    
  },
  //添加货品按钮
  add_goods: function () {
    wx.navigateTo({
      url: '/pages/add_goods/add_goods',  //跳转页面路径
    })
  },
  //保存出库单按钮
  bc_btn: function () {
    console.log("保存出库单")
    wx.navigateTo({
      url: '/pages/chukudan_bc/chukudan_bc',  //跳转页面路径
    })
  },

  /*** 生命周期函数--监听页面加载*/
  onLoad: function (options) {

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