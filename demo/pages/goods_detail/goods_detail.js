// pages/goods_detail/goods_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formdata: "",
    img_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://localhost:3000/get_goods',
      data: {
        goods_id: options.id
      },
      method: "POST",
      success(res) {
        //数组对象没被解析出来 在单独解析一下 或者使用字符串替换掉[]外的引号
        let data = JSON.parse(res.data.detail)[0]
        data.goods_img = JSON.parse(data.goods_img)
        let imgs = data.goods_img
        console.log(imgs)
        for (var i = 0; i < imgs.length; i++) {
          let a = { url: 'http://localhost:3000/img/' + imgs[i] }
          that.data.img_list.push(a)
        }
        console.log(that.data.img_list)
        that.setData({
          formdata: data,
          img_list: that.data.img_list
        })
      }
    })
    // 获得页面中间部位的高度
    const query = wx.createSelectorQuery()
    query.select('.coverdiv').boundingClientRect()
    query.select('.footdiv').boundingClientRect()
    query.exec(function (res) {
      console.log(res)
      var cha_zhi = res[0].height - res[1].height - res[0].height * 0.03
      // console.log(cha_zhi)
      that.setData({
        bot_height: cha_zhi
      })
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

  },

  onpull() {
    wx.showModal({
      title: '是否删除货品？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})