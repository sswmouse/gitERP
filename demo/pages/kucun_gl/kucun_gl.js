Page({
  data: {
    inputShowed: false,
    inputVal: "",
    sty: 0,
    list: ['入库流水', '已入库', '已出库'],
    bot_height: ''
  },
  dianji: function (e) {
    let query = e.currentTarget.dataset['index'];
    this.setData({
      sty: query
    })
  },
  ceshi: function () {
    console.log(111)
    wx.request({
      url: 'http://127.0.0.1:3000/ceshi',
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
      }
    })
  },
  onLoad: function (options) {
    // 获得页面中间部位的高度
    var that = this
    const query = wx.createSelectorQuery()
    query.select('.kucun').boundingClientRect()
    query.select('.top').boundingClientRect()
    query.exec(function (res) {
      console.log(res)
      var cha_zhi = res[0].height - res[1].height-5
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