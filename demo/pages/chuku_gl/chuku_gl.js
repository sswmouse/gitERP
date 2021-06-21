// pages/chuku/chuku.js
const APP = getApp()
const url = getApp().globalData.server
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
    goods: [],  //页面加载时请求本获取地数据库的数据
    show: false,
    url,
    beizhu: '',
    kehu_show: false,  //客户选择框 
    kehu_arr: [],  //所有客户
    kehu_arr_name: '请选择客户',  //选择客户的显示
  },
  /*** 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    var that = this
    if (wx.getStorageSync('goodsList') == '') {
      wx.setStorageSync('goodsList', '[]')
    }
    var order_id = new Date();
    var order_id = order_id.getTime()
    var suiji = parseInt((Math.random()) * 100000)
    order_id = (order_id - 0) + suiji
    this.setData({
      order_id
    })
    //获取货品数据
    wx.request({
      url: url + 'get_all_goods',
      method: 'GET',
      success(res) {
        let a = JSON.stringify(res.data.info)
        a = a.replace(/\\/g, "");
        a = a.replace(/:"\[/g, ":[");
        a = a.replace(/\]"/g, "]");
        let goods = JSON.parse(a)
        let goods1 = []
        //排除非上架商品
        for (var i = 0; i < goods.length; i++) {
          if (goods[i].goods_date != "") {
            goods1.push(goods[i])
          }
        }
        that.setData({
          goods: goods1,
        })
        that.show()
      }
    })
    let user = wx.getStorageSync('user')
    let myData = new Date()
    myData = myData.toLocaleDateString()
    myData = myData.replace(/\//g, '-')
    this.setData({
      kaidan_name: user.name,
      myData
    })
    //获取客户信息
    wx.request({
      url: url + 'get_kehu',
      method: 'GET',
      success(res) {
        console.log(res.data)
        that.setData({
          kehu_arr: res.data
        })
      }
    })
  },
  //添加货品按钮
  add_goods: function () {
    wx.navigateTo({
      url: '/pages/add_goods/add_goods',  //跳转页面路径
    })
  },
  //备注
  change_beizhu(e) {
    this.setData({
      beizhu: e.detail.value
    })
  },
  //保存出库单按钮
  bc_btn: function () {
    // console.log("保存出库单")
    let order_id = this.data.order_id
    console.log(order_id)
    if (this.data.goods_xh == undefined) {
      wx.showToast({
        title: '还未选择出库货品',
        icon: 'none',
        duration: 1000
      })
    } else if (this.data.kehu_arr_name !== '请选择客户') {
      var goodsList = JSON.parse(wx.getStorageSync('goodsList'))
      for (var i = 0; i < goodsList.length; i++) {
        goodsList[i].order_id = order_id
        goodsList[i].order_people = this.data.kehu_arr_name
        goodsList[i].beizhu = this.data.beizhu
        goodsList[i].kaidan_people = this.data.kaidan_name
      }
      console.log(goodsList)
      wx.request({
        url: url + 'keep_goods_out',
        data: {
          goodsList: JSON.stringify(goodsList)
        },
        method: 'POST',
        success(res) {
          console.log("保存成功")
          if (res.data[0].desc == '订单添加成功') {
            wx.showToast({
              title: '订单保存成功',
              icon: 'success',
              duration: 1000
            })
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/chukudan_bc/chukudan_bc?order_id='+order_id,  //跳转页面路径
              })
            }, 1000)
          } else {
            wx.showToast({
              title: '订单保存失败',
              icon: 'error',
              duration: 1000
            })
          }

        }
      })
    } else {
      wx.showToast({
        title: '还未选择客户',
        icon: 'none',
        duration: 1000
      })
    }
  },
  //减去按钮
  reduce_btn: function (e) {
    let id = e.currentTarget.dataset['item'].goods_id
    let goodsList = this.data.goodsList
    var k = 0
    for (var i = 0; i < goodsList.length; i++) {
      if (id == goodsList[i].goods_id) {
        k = i
        break
      }
    }
    goodsList[k].reduce_add = goodsList[k].reduce_add - 1
    wx.setStorageSync('goodsList', JSON.stringify(goodsList))
    this.show()
  },
  //增加按钮
  add_btn: function (e) {
    let id = e.currentTarget.dataset['item'].goods_id
    let goodsList = this.data.goodsList
    let goods = this.data.goods
    var k = 0
    var j = 0
    for (var i = 0; i < goodsList.length; i++) {
      if (id == goodsList[i].goods_id) {
        k = i
        break
      }
    }
    for (var i = 0; i < goods.length; i++) {
      if (id == goods[i].goods_id) {
        j = i
        break
      }
    }
    if (goodsList[k].reduce_add >= goods[j].goods_number) {
      wx.showToast({
        title: '已达库存上限',
        icon: 'error',
        duration: 1000
      })
    } else {
      goodsList[k].reduce_add = goodsList[k].reduce_add + 1
      wx.setStorageSync('goodsList', JSON.stringify(goodsList))
      this.show()
    }
  },
  //每行卡片的删除按钮
  del_btn: function (e) {
    let id = e.currentTarget.dataset['item'].goods_id
    let goodsList = this.data.goodsList
    var k = 0
    for (var i = 0; i < goodsList.length; i++) {
      if (id == goodsList[i].goods_id) {
        k = i
        break
      }
    }
    goodsList[k].reduce_add = 0
    wx.setStorageSync('goodsList', JSON.stringify(goodsList))
    this.show()
    wx.showToast({
      title: '已删除',
      icon: 'success',
      duration: 1000
    })
  },
  //数据刷新
  show() {
    var that = this
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
          money = money + (goodsList[j].total - 0) * (goodsList[j].reduce_add - 0)
        }
      }
    }
    console.log(111)
    that.setData({
      goods_xh: goods_xh,
      goods_xh_zongshu: number,
      goods_xh_price: money
    })
  },
  //选择客户名按钮
  kehu_chose_btn() {
    // console.log("客户名")
    if (this.data.kehu_show == false) {
      this.setData({
        kehu_show: true
      })
    } else {
      this.setData({
        kehu_show: false
      })
    }
  },
  //所有客户的点击事件
  chose_kehu_btn(e) {
    // console.log(e.currentTarget.dataset['item'])
    this.setData({
      kehu_arr_name: e.currentTarget.dataset['item'],
      kehu_show: false
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      goodsList: JSON.parse(wx.getStorageSync('goodsList'))
    })
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    // console.log(currPage.__data__.show);  //此处既是上一页面传递过来的值
    if (currPage.__data__.show == true) {
      this.show()
      this.setData({
        show: true
      })
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
  onUnload() {
    wx.removeStorageSync('goodsList')
    // showModal({
    //   success(confirm) { next(false ) }

    // })

    // wx.showModal({
    //   title: '提示',
    //   content: '这是一个模态弹窗',
    //   success: function (res) {
    //     if (res.confirm) {//这里是点击了确定以后
    //       console.log('用户点击确定')
    //       next(true)
    //     } else {//这里是点击了取消以后
    //       console.log('用户点击取消')
    //       next(false)
    //     }
    //   }
    // })
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