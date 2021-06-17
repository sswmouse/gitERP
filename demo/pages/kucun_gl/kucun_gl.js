var url = getApp().globalData.server

Page({
  data: {
    sty: 0,//头部选项卡当前选项下标
    list: ['入库流水', '已入库', '已出库'],//头部选项卡
    goodsList: '',
    url:url
  },
  //头部选项卡点击事件
  dianji: function (e) {
    let query = e.currentTarget.dataset['index'];
    this.setData({
      sty: query
    })
  },
  look(e){
    let a = e.currentTarget.dataset['index']
    console.log(a)
    wx.navigateTo({
      url: '/pages/goods_detail/goods_detail?id='+a.goods_id,
    })
  },
  ceshi: function () {
    console.log(111)
    // wx.request({
    //   url: 'http://127.0.0.1:3000/ceshi',
    //   method: "POST",
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log(res)
    //   }
    // })
  },
  getdata() {

  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:3000/get_all_goods',
      method: "get",
      success(res) {
        let b = JSON.stringify(res.data.info)
        b = b.replace(/\\/g, "");
        b = b.replace(/:"\[/g, ":[");
        b = b.replace(/\]"/g, "]");
        b = JSON.parse(b)
        that.setData({
          goodsList: b
        })
      console.log(that.data.goodsList[0])
      }
    })
    // 获得页面中间部位的高度
    var that = this
    const query = wx.createSelectorQuery()
    query.select('.kucun').boundingClientRect()
    query.select('.top').boundingClientRect()
    query.exec(function (res) {
      console.log(res)
      var cha_zhi = res[0].height - res[1].height - 5
      // console.log(cha_zhi)
      that.setData({
        bot_height: cha_zhi
      })
    })
  },

  xiangqing: function () {
    console.log(111)
  }
});