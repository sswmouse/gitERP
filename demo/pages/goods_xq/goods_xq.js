// pages/goods_xq/goods_xq.js
const APP = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reduce_icon: APP.globalUrl.url + "images/minus_icon.png",  //减图标
    add_icon: APP.globalUrl.url + "images/plus_icon.png",  //加图标
    reduce_add: '',  //加减中数字的显示
    total: '',  //加减数量得出共计加钱
    list: [],  //将选择货品页面选中的货品参数放进来
  },
  //减去按钮
  reduce_btn: function () {
    // console.log(this.data.reduce_add)
    if (this.data.reduce_add == 0) {
      wx.showToast({
        title: '已经到底了',
        icon: 'none',
        duration: 1000
      })
    } else {
      var reduce_add = this.data.reduce_add
      reduce_add = reduce_add - 1
      var total = this.data.total
      var price = this.data.list.goods_price
      total = reduce_add * price
      this.setData({
        reduce_add: reduce_add,
        total: total
      })
    }
  },
  //增加按钮
  add_btn: function () {
    // console.log(this.data.list.num)
    if (this.data.reduce_add == this.data.list.goods_number) {
      wx.showToast({
        title: '已达最大上限',
        icon: 'error',
        duration: 1000
      })
    } else {
      var reduce_add = this.data.reduce_add
      reduce_add = reduce_add + 1
      var total = this.data.total
      var price = this.data.list.goods_price
      total = reduce_add * price
      this.setData({
        reduce_add: reduce_add,
        total: total
      })
    }
  },
  //选好了按钮点击事件
  xhl_btn: function (e) {
    console.log(e.currentTarget.dataset['num'])
    //关闭当前页面，返回上一页面或多级页面 通过 getCurrentPages 获取当前的页面栈并传参给上一页面
    wx.navigateBack({
      delta: 1
    })
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    var yixuanze_sl = this.data.reduce_add;
    this.data.list.num = yixuanze_sl
    console.log(this.data.list)
    prevPage.setData({
      yixuanze_sl: this.data.list
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log((JSON.parse(options.item)).num)
    //接收 add_goods ck_hp按钮跳转页面传来的数据
    this.setData({
      list: JSON.parse(options.item),
      reduce_add: (JSON.parse(options.item)).num
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