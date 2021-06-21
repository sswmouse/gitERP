// pages/chukudan_bc/chukudan_bc.js
const APP = getApp()
const url = getApp().globalData.server
Page({

  /**
   * 页面的初始数据
   */
  data: {
    share_icon: APP.globalUrl.url + "images/share.png",  //分享图标
    left_icon: APP.globalUrl.url + "images/title_border.png",  //页面左侧图标
    arrow_icon: APP.globalUrl.url + "images/black_arrow.png",  //箭头图标
    goods: [],  //页面加载时请求本获取地数据库的数据
    url
  },
  //修改按钮
  xg_btn() {
    wx.navigateBack({
      delta: 2
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.order_id)
    let goodsList = JSON.parse(wx.getStorageSync('goodsList'))
    var that = this
    //获取货品数据
    wx.request({
      url: url + 'get_goods_out',
      method: 'GET',
      success(res) {
        let a = JSON.stringify(res.data.info)
        a = a.replace(/\\/g, "");
        a = a.replace(/:"\[/g, ":[");
        a = a.replace(/\]"/g, "]");
        let order = JSON.parse(a)
        console.log(goodsList,order)
        let order1 = []
        //排除非上架商品
        for (var i = 0; i < order.length; i++) {
          if (order[i].order_id == options.order_id) {
            order1.push(order[i])
          }
        }
        that.setData({
          goods: order1,
        })
        console.log(that.data.goods)
      }
    })
    //获取chuku 保存出库单按钮传过来的show
    // that.setData({
    //   show:options.show
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  show() {
    var that = this
    setTimeout(function () {
      let goodsList = JSON.parse(wx.getStorageSync('goodsList'))
      var goods_xh = []
      var number = 0
      var money = 0
      for (var i = 0; i < that.data.goods.length; i++) {
        for (var j = 0; j < goodsList.length; j++) {
          if (that.data.goods[i].goods_id == goodsList[j].goods_id && goodsList[j].reduce_add != 0) {
            that.data.goods[i].num = goodsList[j].reduce_add
            that.data.goods[i].reduce_add = goodsList[j].reduce_add
            that.data.goods[i].total = goodsList[j].total
            goods_xh.push(that.data.goods[i])
            number = number + (goodsList[j].reduce_add - 0)
            money = money + (goodsList[j].total - 0)
          }
        }
      }
      that.setData({
        goods_xh: goods_xh,
        goods_xh_zongshu: number,
        goods_xh_price: money
      })
    }, 500)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.show()
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
    wx.removeStorageSync('goodsList')
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