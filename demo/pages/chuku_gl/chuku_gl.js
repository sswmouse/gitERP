// pages/chuku/chuku.js
const APP = getApp()
Page({
  /*** 页面的初始数据*/
  data: {
    left_icon: APP.globalUrl.url + "images/title_border.png",  //页面左侧图标
    arrow_icon: APP.globalUrl.url + "images/black_arrow.png",  //箭头图标
    add_hp_icon: APP.globalUrl.url + "images/add_icon_yellow.png",  //添加货品图标
    txm_icon: APP.globalUrl.url + "images/scan_icon.png",  //扫条码图标
    reduce_icon: APP.globalUrl.url + "images/minus_icon.png",  //减图标
    add_icon: APP.globalUrl.url + "images/plus_icon.png",  //加图标
    del_icon: APP.globalUrl.url + "images/delete_red.png",  //删除图标
    reduce_add: 1,  //已选择按钮中的加减数字的显示
    
  },
  //添加货品按钮
  add_goods: function () {
    wx.navigateTo({
      url: '/pages/add_goods/add_goods',  //跳转页面路径
    })
  },
  //保存出库单按钮
  bc_btn: function () {
    console.log("保存出库单")
    wx.navigateTo({
      url: '/pages/chukudan_bc/chukudan_bc',  //跳转页面路径
    })
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
      this.setData({
        reduce_add: reduce_add
      })
    }
  },
  //增加按钮
  add_btn: function () {
    // console.log("加")
    if (this.data.reduce_add == 200) {
      wx.showToast({
        title: '已达最大上限',
        icon: 'error',
        duration: 1000
      })
    } else {
      var reduce_add = this.data.reduce_add
      reduce_add = reduce_add + 1
      this.setData({
        reduce_add: reduce_add
      })
    }
  },
  //每行卡片的删除按钮
  del_btn: function () {
    wx.showToast({
      title: '已删除',
      icon: 'success',
      duration: 1000
    })
  },

  /*** 生命周期函数--监听页面加载*/
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
    //接收add_goods 页面传过的选择数量
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    console.log(currPage.__data__.b);//此处既是上一页面传递过来的值
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