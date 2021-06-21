// pages/add_goods/add_goods.js
const APP = getApp();
const url = getApp().globalData.server
Page({
  data: {
    px_icon1: APP.globalUrl.url + "images/sort_default_gary.png",  //未排序图标
    px_icon2: APP.globalUrl.url + "images/sort_down_red.png",  //向下排序图标
    px_icon3: APP.globalUrl.url + "images/sort_up_red.png",  //向上排序图标
    hh_icon: APP.globalUrl.url + "images/sort_default_gary.png",  //货号 未排序图标
    all_fl_icon: APP.globalUrl.url + "images/down_triangle.png",  //全部分类图标
    all_fl_icon1: APP.globalUrl.url + "images/upper.png",  //全部分类图标
    zx: false,  //最新排序文字样式判断
    hh: false,  //货号排序文字样式判断
    kc: false,  //库存量排序文字样式判断
    zx_y: 1,  //最新排序图标判断
    hh_y: 1,  //货号排序图标判断
    kc_y: 1,  //库存量排序图标判断
    sx: 0,  //页面中间部位的高度
    dialog3: false,  //已选择按钮点击弹框开关
    reduce_icon: APP.globalUrl.url + "images/minus_icon.png",  //减图标
    add_icon: APP.globalUrl.url + "images/plus_icon.png",  //加图标
    del_icon: APP.globalUrl.url + "images/delete_red.png",  //删除图标
    reduce_add: 0,  //已选择按钮中的加减数字的显示
    goods: [],  //页面加载时请求本获取地数据库的数据
    url,
    is_fenglei: false,
    classify_show: false,  //客户选择框 
    xz_classify: '全部分类',
  },
  //监听界面加载
  onLoad: function (options) {
    var that = this
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
          if (goods[i].goods_date != "" && goods[i].goods_number != '0') {
            goods1.push(goods[i])
          }
        }
        that.setData({
          goods: goods1,
          goods_bei: goods1,
        })
        that.show()
      }
    })
    //获取分类信息
    wx.request({
      url: url + 'get_classify',
      method: 'GET',
      success(res) {
        let classify = JSON.parse(res.data.detail)
        classify.unshift({ id: -1, name: '全部分类' })
        that.setData({
          classify: classify
        })
        console.log(JSON.parse(res.data.detail))
      }
    })

    // 获得页面中间部位的高度
    const query = wx.createSelectorQuery()
    query.select('.add_goods').boundingClientRect()
    query.select('.top').boundingClientRect()
    query.select('.sub_btn').boundingClientRect()
    query.exec(function (res) {
      var cha_zhi = res[0].height - res[1].height - res[2].height - 32
      that.setData({
        sx: cha_zhi
      })
    })

  },
  //监听界面刷新
  onShow: function () {
    this.show()
  },
  //搜索框
  bindinput(e) {
    var value = e.detail.value
    var aaa = [];
    for (var i = 0; i < this.data.goods_bei.length; i++) {
      if (this.data.goods_bei[i].goods_name.indexOf(value) != -1 || this.data.goods_bei[i].goods_id.indexOf(value) != -1) {
        aaa.push(this.data.goods_bei[i]);
      }
    }
    this.setData({
      goods: aaa
    })
  },
  //最新排序的点击事件
  zx_px: function () {
    //图标改变
    var y = this.data.zx_y
    y = parseInt(y) + 1
    if (y == 4) {
      y = 2
    }
    this.setData({
      zx_y: y,
      hh_y: 1,
      kc_y: 1
    })
    var hid = this.data.zx;
    var hh = this.data.hh;
    var kc = this.data.kc;
    hid = true
    hh = false
    kc = false
    this.setData({
      zx: hid,  // 改变状态
      hh: hh,
      kc: kc
    })
    //商品排序
    let goods = this.data.goods
    if (y == 2) {
      for (var i = 0; i < goods.length - 1; i++) {
        for (var j = 0; j < goods.length - i - 1; j++) {
          if (new Date(goods[j].goods_date) <= new Date(goods[j + 1].goods_date)) {
            var tmp = goods[j]
            goods[j] = goods[j + 1]
            goods[j + 1] = tmp
          }
        }
      }
      this.setData({
        goods: goods
      })
    } else if (y == 3) {
      for (var i = 0; i < goods.length - 1; i++) {
        for (var j = 0; j < goods.length - i - 1; j++) {
          if (new Date(goods[j].goods_date) >= new Date(goods[j + 1].goods_date)) {
            var tmp = goods[j]
            goods[j] = goods[j + 1]
            goods[j + 1] = tmp
          }
        }
      }
      this.setData({
        goods: goods
      })
    }
  },
  //货号排序的点击事件
  hh_px: function () {
    var y = this.data.hh_y
    y = parseInt(y) + 1
    if (y == 4) {
      y = 2
    }
    this.setData({
      hh_y: y,
      zx_y: 1,
      kc_y: 1
    })
    var hid = this.data.zx;
    var hh = this.data.hh;
    var kc = this.data.kc;
    hid = false
    hh = true
    kc = false
    this.setData({
      hh: hh,  // 改变状态
      zx: hid,
      kc: kc
    })
    let data = this.data.goods
    for (var j = 0; j < data.length; j++) {
      let a1 = []
      for (let i = 0; i < data[j].goods_id.length; i++) {
        a1.push(data[j].goods_id[i].charCodeAt())
      }
      data[j].a1 = a1
    }
    if (y == 2) {
      for (var i = 0; i < data.length - 1; i++) {
        for (var j = 0; j < data.length - i - 1; j++) {
          if (data[j].a1.length >= data[j + 1].a1.length) {
            for (var k = 0; k < data[j + 1].a1.length; k++) {
              if (data[j].a1[k] < data[j + 1].a1[k]) {
                var tem = data[j]
                data[j] = data[j + 1]
                data[j + 1] = tem
                break
              }
            }
          } else {
            var is_you = false
            for (var k = 0; k < data[j].a1.length; k++) {
              if (data[j].a1[k] < data[j + 1].a1[k]) {
                var tem = data[j]
                data[j] = data[j + 1]
                data[j + 1] = tem
                is_you = true
                break
              }
            }
            if (is_you == false) {
              if (data[j].a1.length < data[j + 1].a1.length) {
                var tem = data[j]
                data[j] = data[j + 1]
                data[j + 1] = tem
              }
            }
          }
        }
      }
      this.setData({
        goods: data
      })
    } else if (y == 3) {
      for (var i = 0; i < data.length - 1; i++) {
        for (var j = 0; j < data.length - i - 1; j++) {
          if (data[j].a1.length >= data[j + 1].a1.length) {
            var is_you = false
            for (var k = 0; k < data[j + 1].a1.length; k++) {
              if (data[j].a1[k] > data[j + 1].a1[k]) {
                var tem = data[j]
                data[j] = data[j + 1]
                data[j + 1] = tem
                is_you = true
                break
              }
              if (is_you == false) {
                if (data[j].a1.length > data[j + 1].a1.length) {
                  var tem = data[j]
                  data[j] = data[j + 1]
                  data[j + 1] = tem
                }
              }
            }
          } else {
            for (var k = 0; k < data[j].a1.length; k++) {
              if (data[j].a1[k] > data[j + 1].a1[k]) {
                var tem = data[j]
                data[j] = data[j + 1]
                data[j + 1] = tem
                break
              }
            }
          }
        }
      }
      this.setData({
        goods: data
      })
    }
  },
  //库存量排序的点击事件
  kc_px: function () {
    var y = this.data.kc_y
    y = parseInt(y) + 1
    if (y == 4) {
      y = 2
    }
    this.setData({
      kc_y: y,
      zx_y: 1,
      hh_y: 1
    })
    var hid = this.data.zx;
    var hh = this.data.hh;
    var kc = this.data.kc;
    hid = false
    kc = true
    hh = false
    this.setData({
      hh: hh,  // 改变状态
      zx: hid,
      kc: kc
    })
    let goods = this.data.goods
    if (y == 2) {
      for (var i = 0; i < goods.length - 1; i++) {
        for (var j = 0; j < goods.length - i - 1; j++) {
          if ((goods[j].goods_number - 0) < (goods[j + 1].goods_number - 0)) {
            let tmp = goods[j]
            goods[j] = goods[j + 1]
            goods[j + 1] = tmp
          }
        }
      }
      this.setData({
        goods: goods
      })
    } else if (y == 3) {
      for (var i = 0; i < goods.length - 1; i++) {
        for (var j = 0; j < goods.length - i - 1; j++) {
          if ((goods[j].goods_number - 0) > (goods[j + 1].goods_number - 0)) {
            let tmp = goods[j]
            goods[j] = goods[j + 1]
            goods[j + 1] = tmp
          }
        }
      }
      this.setData({
        goods: goods
      })
    }

  },
  fl_px: function () {
    this.setData({
      is_fenglei: !this.data.is_fenglei
    })
    if (this.data.is_fenglei == true) {
      this.setData({
        classify_show: true
      })
    } else {
      this.setData({
        classify_show: false
      })
    }
  },
  //查看货品的点击事件
  ck_hp: function (e) {
    var content = JSON.stringify(e.currentTarget.dataset['item'])
    wx.setStorageSync('goods', content)
    wx.navigateTo({
      // url: '../goods_xq/goods_xq?item=' + JSON.stringify(e.currentTarget.dataset['index']),
      //跳转页面路径
      url: '../goods_xq/goods_xq'
    })
  },
  //已选择按钮
  yxz_btn: function () {
    if (this.data.goods_xh.length > 0) {
      this.setData({
        dialog3: true
      });
    } else {
      wx.showToast({
        title: '请选择需要出库的货品',
        icon: 'none',
        duration: 1000
      })
      this.setData({
        dialog3: false
      });
    }

  },
  //已选择按钮显示的模态框关闭
  close: function () {
    this.setData({
      dialog3: false
    });
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
  //选择货品页面的选好了按钮
  xhl_btn: function () {
    //关闭当前页面，返回上一页面或多级页面 通过 getCurrentPages 获取当前的页面栈并传参给上一页面
    wx.navigateBack({
      delta: 1
    })
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      show: true
    })
  },
  //刷新函数 为了构建选好列表
  show() {
    var that = this
    let goodsList = JSON.parse(wx.getStorageSync('goodsList'))
    for (var i = 0; i < that.data.goods.length; i++) {
      for (var j = 0; j < goodsList.length; j++) {
        if (that.data.goods[i].goods_id == goodsList[j].goods_id) {
          that.data.goods[i].num = goodsList[j].reduce_add
          break
        } else {
          that.data.goods[i].num = 0
        }
      }
    }
    that.setData({
      goods: that.data.goods,
      goodsList
    })
    var goods_xh = []
    var number = 0
    var money = 0
    for (var i = 0; i < that.data.goods.length; i++) {
      for (var j = 0; j < goodsList.length; j++) {
        if (that.data.goods[i].goods_id == goodsList[j].goods_id && goodsList[j].reduce_add != 0) {
          that.data.goods[i].reduce_add = goodsList[j].reduce_add
          that.data.goods[i].total = goodsList[j].total
          goods_xh.push(that.data.goods[i])
          number = number + (goodsList[j].reduce_add - 0)
          money = money + (goodsList[j].total - 0) * (goodsList[j].reduce_add - 0)
        }
      }
    }
    that.setData({
      goods_xh: goods_xh,
      goods_xh_zongshu: number,
      goods_xh_price: money
    })
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 500
    })
  },
  //所有客户的点击事件
  xuan_classify(e) {
    var goods_fl = []
    let goods = this.data.goods_bei
    if (e.currentTarget.dataset['item']=='全部分类') {
      goods_fl = goods
    } else {
      for (var i = 0; i < goods.length; i++) {
        console.log(goods[i].goods_leibie, e.currentTarget.dataset['item'])
        if (goods[i].goods_leibie == e.currentTarget.dataset['item']) {
          goods_fl.push(goods[i])
        }
      }
    }
    this.setData({
      xz_classify: e.currentTarget.dataset['item'],
      classify_show: false,
      is_fenglei: false,
      goods: goods_fl
    })
  },
})