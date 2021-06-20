// pages/goods_xq/goods_xq.js
const APP = getApp()
const url = getApp().globalData.server
Page({
  data: {
    reduce_icon: APP.globalUrl.url + "images/minus_icon.png",  //减图标
    add_icon: APP.globalUrl.url + "images/plus_icon.png",  //加图标
    reduce_add: 0,  //加减中数字的显示
    total: '',  //加减数量得出共计加钱
    list: [],  //将选择货品页面选中的货品参数放进来
    url
  },

  //减去按钮
  reduce_btn: function () {
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
  xhl_btn: function () {
    // wx.removeStorageSync('goodsList')
    var goodsList = wx.getStorageSync('goodsList')
    goodsList = JSON.parse(goodsList)
    var is_you = false
    if (this.data.reduce_add == 0) {
      for (var i = 0; i < goodsList.length; i++) {
        if (goodsList[i].goods_id == this.data.list.goods_id) {
          goodsList.splice(i , 1)
          break
        }
      }
    } else {
      for (var i = 0; i < goodsList.length; i++) {
        if (goodsList[i].goods_id == this.data.list.goods_id) {
          goodsList[i].reduce_add = this.data.reduce_add
          goodsList[i].total = this.data.total
          is_you = true
          break
        }
      }
      if (is_you == false && this.data.reduce_add != 0) {
        goodsList.push({
          goods_id: this.data.list.goods_id, reduce_add: this.data.reduce_add, total: this.data.total
        })
      }
    }

    wx.setStorageSync('goodsList', JSON.stringify(goodsList))
    //关闭当前页面，返回上一页面或多级页面 
    wx.navigateBack({
      delta: 1
    })
  },

  onLoad: function (options) {
    // wx.removeStorageSync('goodsList')
    var that = this
    var goodsList = wx.getStorageSync('goodsList')
    if (goodsList == '') {
      wx.setStorageSync('goodsList', '[]')
      var goodsList = wx.getStorageSync('goodsList')
    }
    goodsList = JSON.parse(goodsList)
    setTimeout(function () {
      for (var i = 0; i < goodsList.length; i++) {
        if (goodsList[i].goods_id == that.data.list.goods_id) {
          that.setData({
            reduce_add: goodsList[i].reduce_add
          })
          break
        }
      }
    }, 500)
  },


  onShow: function () {
    var that = this
    var content = JSON.parse(wx.getStorageSync('goods'))
    this.setData({
      list: content,
    })
    setTimeout(function () {
      that.setData({
        total: that.data.reduce_add * that.data.list.goods_price
      })
    }, 500)

  },
  onUnload(){
    wx.removeStorageSync('goods')
  }
})