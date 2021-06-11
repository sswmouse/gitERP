// pages/add_goods/add_goods.js
const APP = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    px_icon1: APP.globalUrl.url + "images/sort_default_gary.png",  //未排序图标
    px_icon2: APP.globalUrl.url + "images/sort_down_red.png",  //向下排序图标
    px_icon3: APP.globalUrl.url + "images/sort_up_red.png",  //向上排序图标
    hh_icon: APP.globalUrl.url + "images/sort_default_gary.png",  //货号 未排序图标
    all_fl_icon: APP.globalUrl.url + "images/down_triangle.png",  //全部分类图标
    zx: false,  //最新排序文字样式判断
    hh: false,  //货号排序文字样式判断
    kc:false,  //库存量排序文字样式判断
    zx_y:1,  //最新排序图标判断
    hh_y:1,  //货号排序图标判断
    kc_y:1,  //库存量排序图标判断
    sx: 0,  //页面中间部位的高度
  },
  //最新排序的点击事件
  zx_px: function () {
    var y=this.data.zx_y
    y=parseInt(y)+1
    if(y==4){
      y=2
    }
    this.setData({
      zx_y:y,
      hh_y:1,
      kc_y:1
    })
    var hid = this.data.zx;
    var hh=this.data.hh;
    var kc=this.data.kc;
    hid=true
    hh=false
    kc=false
    this.setData({
      zx: hid,  // 改变状态
      hh:hh,
      kc:kc
    })
  },
  //货号排序的点击事件
  hh_px: function () {
    var y=this.data.hh_y
    y=parseInt(y)+1
    if(y==4){
      y=2
    }
    this.setData({
      hh_y:y,
      zx_y:1,
      kc_y:1
    })
    var hid = this.data.zx;
    var hh=this.data.hh;
    var kc=this.data.kc;
    hid=false
    hh=true
    kc=false
    this.setData({
      hh: hh,  // 改变状态
      zx:hid,
      kc:kc
    })
  },
  //库存量排序的点击事件
  kc_px: function () {
    var y=this.data.kc_y
    y=parseInt(y)+1
    if(y==4){
      y=2
    }
    this.setData({
      kc_y:y,
      zx_y:1,
      hh_y:1
    })
    var hid = this.data.zx;
    var hh=this.data.hh;
    var kc=this.data.kc;
    hid=false
    kc=true
    hh=false
    this.setData({
      hh: hh,  // 改变状态
      zx:hid,
      kc:kc
    })
  },
  //查看货品的点击事件
  ck_hp: function () {
    console.log("查看货品")
    wx.navigateTo({
      url: '../goods_xq/goods_xq',  //跳转页面路径
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获得页面中间部位的高度
    var that = this
    const query = wx.createSelectorQuery()
    query.select('.add_goods').boundingClientRect()
    query.select('.top').boundingClientRect()
    query.select('.sub_btn').boundingClientRect()
    query.exec(function(res){
      console.log(res)
      var cha_zhi = res[0].height - res[1].height - res[2].height - 32
      // console.log(cha_zhi)
      that.setData({
        sx: cha_zhi
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

  }
})