// pages/ch_gong/ch_gong.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    peo:{}
  },

  pull(){
    var that=this
    wx.request({
      url: app.globalUrl.url+'ch_peo',
      data: {
        formdata:that.data.peo,
        para:"3"
      },
      method:"POST",
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        console.log(res.data)
      }
    })

    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      that.setData({
        peo:data
      })
    })
  },

  input1(e){
    this.data.peo.dy_name=e.detail.value
  },

  input2(e){
    this.data.peo.dy_tel=e.detail.value
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