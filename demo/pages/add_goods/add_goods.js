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
    dialog3: false,  //已选择按钮点击弹框开关
    reduce_icon: APP.globalUrl.url + "images/minus_icon.png",  //减图标
    add_icon: APP.globalUrl.url + "images/plus_icon.png",  //加图标
    del_icon: APP.globalUrl.url + "images/delete_red.png",  //删除图标
    reduce_add: 1,  //已选择按钮中的加减数字的显示
    yixuanze_sl: '',  //图片下方显示已选择货品的数量
    yixuanze: '(4)',  //已选择按钮显示的数字
    total: '',  //已选择数量的共计
    goods: [],
    
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
  ck_hp: function (e) {
    // console.log("查看货品")
    wx.navigateTo({
      url: '../goods_xq/goods_xq?item=' + JSON.stringify(e.currentTarget.dataset['index']),
      //跳转页面路径
    })
    // console.log(e.currentTarget.dataset['index'])
  },
  //已选择按钮
  yxz_btn: function () {
    console.log("已选择")
    this.setData({
      dialog3: true
    });
  },
  //已选择按钮显示的模态框关闭
  close: function () {
    this.setData({
      dialog3: false
    });
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
  //选择货品页面的选好了按钮
  xhl_btn: function () {
    // console.log("选好了哦")
    //关闭当前页面，返回上一页面或多级页面 通过 getCurrentPages 获取当前的页面栈并传参给上一页面
    wx.navigateBack({
      delta: 1
    })
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    var a = 1
    prevPage.setData({
      b: a
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 获得页面中间部位的高度
    const query = wx.createSelectorQuery()
    query.select('.add_goods').boundingClientRect()
    query.select('.top').boundingClientRect()
    query.select('.sub_btn').boundingClientRect()
    query.exec(function(res){
      // console.log(res)
      var cha_zhi = res[0].height - res[1].height - res[2].height - 32
      // console.log(cha_zhi)
      that.setData({
        sx: cha_zhi
      })
    })
    //获取货品数据
    wx.request({
      url: 'http://localhost:3000/get_all_goods', //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      method: 'GET',
      success (res) {
        // console.log(res.data.info)
        that.setData({
          goods: res.data.info
        })
        for(var i=0;i<that.data.goods.length;i++){
          that.data.goods[i].num = 0
          that.data.goods[i].index = i
          that.setData({
            goods: that.data.goods,
            yixuanze_sl: that.data.goods[i].num
          })
        }
        console.log(that.data.goods)
      }
    })
    //页面货品图片下的已选择数量
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
    //接收goods_xq 页面传过的选择数量
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    console.log(currPage.__data__.yixuanze_sl);//此处既是上一页面传递过来的值
    // for (var i = 0; i < currPage.__data__.yixuanze_sl; i++) {
    // }
    this.setData({
      yixuanze_sl: currPage.__data__.yixuanze_sl.num
    })
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