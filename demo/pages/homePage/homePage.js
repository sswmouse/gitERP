// pages/homePage/homePage.js
const APP = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
    imgs: [APP.globalUrl.url + "images/index_banner.png",APP.globalUrl.url + "images/banner.png"],
    // 选项图标，文字
    icon:[APP.globalUrl.url + "images/ruku.png",APP.globalUrl.url + "images/chuku.png",APP.globalUrl.url + "images/ks.png",APP.globalUrl.url + "images/spfl.png",APP.globalUrl.url + "images/member.png"],
    text:['入库管理','出库管理','库存管理','商品分类','人员管理'],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(APP.globalUrl.url)
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