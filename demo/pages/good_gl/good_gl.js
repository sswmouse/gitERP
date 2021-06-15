// pages/good_gl/good_gl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  navi_ch(){
    wx.navigateTo({
      url: '/pages/em_good_lei/em_good_lei',
    })
  },

  pull(){
    wx.showModal({
      title: '是否删除',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  newlei(){
    wx.navigateTo({
      url: '/pages/newlei/newlei',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this 
    wx.request({
      url: 'http://localhost:3000/get_classify',
      data: {
        code: ''
      },
      method: "GET",
      success(res) {
        var arr = JSON.parse(res.data.detail);
        //排序
        for(var i=0;i<arr.length-1;i++){
          for(var j=i;j<arr.length-i-1;j++){
            if(arr[j].id>arr[j+1].id){
              let aaa = arr[j]
              arr[j] = arr[j+1]
              arr[j+1] = arr[j]
            }
          }
        }
        that.setData({
          list:arr
        })
      }
    })

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