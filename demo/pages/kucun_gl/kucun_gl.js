var url = getApp().globalData.server
var APP = getApp()

Page({
  data: {
    sty: 0,//头部选项卡当前选项下标
    list: ['入库流水', '已入库', '已出库'],//头部选项卡
    goodsList: '',
    url: url,
    reduce_icon: APP.globalUrl.url + "images/minus_icon.png",  //减图标
    add_icon: APP.globalUrl.url + "images/plus_icon.png",  //加图标
    reduce_add: 1,  //加减中数字的显示
    is_add: false, //补货框控制变量
  },
  //生命周期
  onLoad: function (options) {
    var that = this
    this.getdata()
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
        reduce_add: reduce_add,
      })
    }
  },
  //补货按钮
  buhuo(e) {
    let item = e.currentTarget.dataset['item'];
    console.log(item)
    this.setData({
      buhuoList: item,
      is_add: true
    })
  },
  //保存补货信息
  change_number(e) {
    var that = this
    let query = e.currentTarget.dataset['item'];
    console.log(query.goods_number)
    query.goods_number = (query.goods_number-0) + this.data.reduce_add
    console.log(query.goods_id)
    wx.request({
      url: url + 'goods_into',
      method: "POST",
      data: {
        formdata: JSON.stringify(query),
        into_number:that.data.reduce_add
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          is_add:false
        })
        wx.showToast({
          title: '补货成功！', //提示文字
          icon: 'success', //弹出样式
          duration: 2000 //持续的时间
        })
        that.onLoad()
      }
    })
  },
  exit_buhuo(){
    this.setData({
      is_add:false
    })
  },
  add_number(e) {
    this.setData({
      reduce_add: e.detail.value - 0
    })
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
      this.setData({
        reduce_add: reduce_add,
      })
    }
  },
  //头部选项卡点击事件
  dianji: function (e) {
    let query = e.currentTarget.dataset['index'];
    this.setData({
      sty: query
    })
  },
  //点击卡片查看详细信息函数
  look(e) {
    let a = e.currentTarget.dataset['item']
    wx.navigateTo({
      url: '/pages/goods_detail/goods_detail?id=' + a.goods_id,
    })
  },
  //点击进入入库界面
  to_add(e) {
    let a = e.currentTarget.dataset['item']
    wx.navigateTo({
      url: '/pages/ruku_gl/ruku_gl?id=' + a.goods_id,
    })
  },
  //商品数据获取
  getdata() {
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
      }
    })
  },
  
  xiangqing: function () {
    console.log(111)
  }
});