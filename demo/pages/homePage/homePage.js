// pages/homePage/homePage.js
const APP = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // img: "http://localhost:3000/images/banner.png",
    imgs: [APP.globalUrl.url + "images/" + "index_banner.png",APP.globalUrl.url + "images/" + "banner.png"],
    icon1:APP.globalUrl.url + "images/" + "ruku.png",
    icon2:APP.globalUrl.url + "images/" + "chuku.png",
    icon3:APP.globalUrl.url + "images/" + "ks.png",
    icon4:APP.globalUrl.url + "images/" + "spfl.png",
    icon5:APP.globalUrl.url + "images/" + "member.png",
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