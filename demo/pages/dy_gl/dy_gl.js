// pages/dy_gl/dy_gl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dy_li: [],
    all_dy: []
  },

  get_dy() {
    var that = this
    wx.request({
      url: 'http://localhost:3000/get_dy',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        // console.log(res.data)
        that.setData({
          // dy_li:JSON.parse(res.data)
          dy_li: res.data,
          all_dy: res.data
        })
        console.log(that.data.dy_li)
      }
    })
  },
  ch_peo(e) {
    wx.navigateTo({
      url: '/pages/ch_dy/ch_dy',
      events: {
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', e.currentTarget.dataset.peo)
      }
    })
  },
  sel_dy(e) {
    var x = e.detail.value
    var all_dy = this.data.all_dy
    var showli = []
    if (x != "") {
      for (var i = 0; i < all_dy.length; i++) {
        if (all_dy[i].dy_name.search(x) != -1) {
          showli.push(all_dy[i])
        }
      }
      this.setData({
        dy_li: showli
      })
    }
    else {
      this.setData({
        dy_li: this.data.all_dy
      })
    }
  },

  dele(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    var that = this
    wx.request({
      url: 'http://localhost:3000/del_peo',
      data: {
        formdata: { dy_id: id },
        para: "3"
      },
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        that.get_dy()
      }
    })
  },

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
    this.get_dy()
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