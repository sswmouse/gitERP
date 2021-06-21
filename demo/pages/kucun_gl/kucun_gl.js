var url = getApp().globalData.server
var APP = getApp()

Page({
  data: {
    sty: 0,//头部选项卡当前选项下标
    list: ['入库流水', '已入库', '已出库'],//头部选项卡
    url: url,//服务器地址
    reduce_icon: APP.globalUrl.url + "images/minus_icon.png",  //减图标
    add_icon: APP.globalUrl.url + "images/plus_icon.png",  //加图标
    reduce_add: 0,  //加减中数字的显示
    is_add: false, //补货框控制变量
  },
  //生命周期
  onLoad: function (options) {
    var that = this
    this.getdata()
    this.getdata_into()
    this.getdata_out()
    // setTimeout(function () {
    //   console.log(that.data.goodsList_into)
    // }, 1000)
    // 获得页面中间部位的高度
    var that = this
    const query = wx.createSelectorQuery()
    query.select('.kucun').boundingClientRect()
    query.select('.top').boundingClientRect()
    query.exec(function (res) {
      var cha_zhi = res[0].height - res[1].height - 5
      // console.log(cha_zhi)
      that.setData({
        bot_height: cha_zhi
      })
    })
  },
  //搜索查询输入框
  sousuo(e) {
    var inp_value = e.detail.value
    //界面1搜索
    let data_into0 = this.data.goodsList_into1
    let data0 = []
    for (var i = 0; i < data_into0.length; i++) {
      if (data_into0[i].goods_id.indexOf(inp_value) != -1 || data_into0[i].goods_name.indexOf(inp_value) != -1 || data_into0[i].goods_leibie.indexOf(inp_value) != -1) {
        data0.push(data_into0[i])
      }
    }
    this.setData({
      goodsList_into: data0
    })
    //界面2搜索
    let data_into1 = this.data.goodsList1
    let data1 = []
    for (var i = 0; i < data_into1.length; i++) {
      if (data_into1[i].goods_id.indexOf(inp_value) != -1 || data_into1[i].goods_name.indexOf(inp_value) != -1 || data_into1[i].goods_leibie.indexOf(inp_value) != -1) {
        data1.push(data_into1[i])
      }
    }
    this.setData({
      goodsList: data1
    })
    //界面3搜索
    let data_into2 = this.data.goodsList_out1
    let data2 = []
    for (var i = 0; i < data_into2.length; i++) {
      if (data_into2[i].goods_id.indexOf(inp_value) != -1 || data_into2[i].goods_name.indexOf(inp_value) != -1 || data_into2[i].goods_leibie.indexOf(inp_value) != -1) {
        data2.push(data_into2[i])
      }
    }
    this.setData({
      goodsList_out: data2
    })
  },
  shangjia(e){
    var that = this
    if(e.currentTarget.dataset['index']=='xia'){
      let data = e.currentTarget.dataset['item']
      data.goods_date=''
      console.log(data)
      wx.request({
        url: url + 'change_goods_data',
        data: {
          formdata: JSON.stringify(data)
        },
        method: "POST",
        success(res) {
          console.log(res)
          that.onLoad()
        }, fail(err) {
          console.log(err)
        }
      })
    }else if(e.currentTarget.dataset['index']=='shang'){
      let data = e.currentTarget.dataset['item']
      let myDate = new Date()
      let time = myDate.toLocaleDateString()
      data.goods_date= time
      console.log(data)
      wx.request({
        url: url + 'change_goods_data',
        data: {
          formdata: JSON.stringify(data)
        },
        method: "POST",
        success(res) {
          console.log(res)
          that.onLoad()
        }, fail(err) {
          console.log(err)
        }
      })
    }
  },
  //商品数据获取
  getdata(reslove, reject) {
    var that = this
    wx.request({
      url: url+'get_all_goods',
      method: "get",
      success(res) {
        let b = JSON.stringify(res.data.info)
        b = b.replace(/\\/g, "");
        b = b.replace(/:"\[/g, ":[");
        b = b.replace(/\]"/g, "]");
        b = JSON.parse(b)
        that.setData({
          goodsList: b,
          goodsList1: b
        })
        // reslove('成功')
      }
    })
  },
  //商品入库流水获取
  getdata_into() {
    var that = this
    wx.request({
      url: url+'get_goods_into',
      method: "get",
      success(res) {
        let b = JSON.stringify(res.data.info)
        b = b.replace(/\\/g, "");
        b = b.replace(/:"\[/g, ":[");
        b = b.replace(/\]"/g, "]");
        b = JSON.parse(b)
        that.setData({
          goodsList_into: b,
          goodsList_into1: b
        })
      }
    })
  },
  //商品出库流水获取
  getdata_out() {
    var that = this
    wx.request({
      url: url+'get_goods_out',
      method: "get",
      success(res) {
        let b = JSON.stringify(res.data.info)
        b = b.replace(/\\/g, "");
        b = b.replace(/:"\[/g, ":[");
        b = b.replace(/\]"/g, "]");
        b = JSON.parse(b)
        that.setData({
          goodsList_out: b,
          goodsList_out1: b,
        })
      }
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
    query.goods_number = (query.goods_number - 0) + this.data.reduce_add
    wx.request({
      url: url + 'goods_into',
      method: "POST",
      data: {
        formdata: JSON.stringify(query),
        into_number: that.data.reduce_add
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          is_add: false,
          reduce_add:0
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
  //关闭补货框
  exit_buhuo() {
    this.setData({
      is_add: false
    })
  },
  //步进器
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
  dianji(e) {
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
});