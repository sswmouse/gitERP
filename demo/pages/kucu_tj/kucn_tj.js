// pages/kucu_tj/kucn_tj.js

var url = getApp().globalData.server
const APP = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bottom: 0,  //页面底部卡片内容的高度  
    is_shang: true,
    url: url,
  },
  onLoad: function (options) {
    var that = this
    this.getData()
    // 获得页面中间部位的高度
    const query = wx.createSelectorQuery()
    query.select('.kucun_tj').boundingClientRect()
    query.select('.top').boundingClientRect()
    query.exec(function (res) {
      // console.log(res)
      var cha_zhi1 = res[0].height - res[1].height
      // console.log(cha_zhi)
      that.setData({
        bottom: cha_zhi1,
      })
    })
  },
  //获取数据
  getData() {
    var that = this
    wx.request({
      url: url + 'get_all_goods',
      method: "GET",
      success(res) {
        let goods = res.data.info
        goods = JSON.stringify(goods)
        goods = goods.replace(/\\/g, "");
        goods = goods.replace(/:"\[/g, ":[");
        goods = goods.replace(/\]"/g, "]");
        goods = JSON.parse(goods)
        console.log(goods)
        var shang_list = []
        var xia_list = []
        var shang_number = 0
        var xia_number = 0
        for (var i = 0; i < goods.length; i++) {
          if (goods[i].goods_date == '') {
            xia_list.push(goods[i])
            xia_number = xia_number + (goods[i].goods_number - 0)
          } else {
            shang_list.push(goods[i])
            shang_number = shang_number + (goods[i].goods_number - 0)
          }
        }
        that.setData({
          goods,
          xia_list,
          shang_list,
          shang_number,
          xia_number
        })
      }
    })
  },
  //上架点击事件
  look_shang() {
    this.setData({
      is_shang: true,
    })
  },
  //下架点击事件
  look_xia() {
    this.setData({
      is_shang: false,
    })
  },
})