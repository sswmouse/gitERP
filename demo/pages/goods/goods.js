// pages/find/find.js
const APP = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon1: [APP.globalUrl.url + "images/statistical1.png", APP.globalUrl.url + "images/statistical2.png"],
    icon2: [
      [APP.globalUrl.url + "images/statistical1-1.png", APP.globalUrl.url + "images/statistical1-2.png", APP.globalUrl.url + "images/statistical1-3.png"],
      [APP.globalUrl.url + "images/statistical2-1.png", APP.globalUrl.url + "images/statistical2-2.png", APP.globalUrl.url + "images/statistical2-3.png"]
    ],
    text1: ['进销与统计', '人员统计'],
    text2: [
      ['库存总量', '入库数量', '出库数量'],
      ['员工数量', '供应商数量', '客户数量']
    ],
    url: [
      "/pages/kucu_tj/kucn_tj",
      "/pages/ruku_tj/ruku_tj",
      "/pages/chuku_tj/chuku_tj",
      "/pages/dy_gl/dy_gl",
      "/pages/gong_gl/gong_gl",
      "/pages/kehu_gl/kehu_gl"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
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