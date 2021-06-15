// pages/homePage/homePage.js
const APP = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
    imgs: [APP.globalUrl.url + "images/index_banner.png", APP.globalUrl.url + "images/banner.png"],
    // 选项图标，文字
    icon: [APP.globalUrl.url + "images/ruku.png", APP.globalUrl.url + "images/chuku.png", APP.globalUrl.url + "images/ks.png", APP.globalUrl.url + "images/spfl.png", APP.globalUrl.url + "images/member.png"],
    text: ['货品入库', '货品出库', '库存管理', '商品分类', '人员管理'],
    url: ['/pages/ruku_gl/ruku_gl', "/pages/chuku_gl/chuku_gl", "/pages/kucun_gl/kucun_gl", "/pages/good_gl/good_gl", "/pages/people_gl/people_gl"]
  },
  to: function () {
    wx.navigateTo({ 
      url: '/pages/register/register' 
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    // console.log(APP.globalUrl.url)
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
    if(APP.globalData.is_register=='true'){
      wx.showToast({
        title: '注册成功,欢迎使用！',
        icon: 'none',
        duration: 2000//持续的时间
      })
      APP.globalData.is_register='false'
    }
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