// pages/kucu_tj/kucn_tj.js
var url = getApp().globalData.server
const APP = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bottom: 0,  //页面底部卡片内容的高度
    tk: 0,  //选择查询日期弹框背景高度
    showhidden: true,  //选择查询日期弹框的hidden 值
    chose_icon: APP.globalUrl.url + "images/date_triangle.png",  //选择查询日期箭头图标
    rili_icon: APP.globalUrl.url + "images/calendar_icon.png",  //日历图标
    date_start: '请选择日期',  //开始日期的值
    date_end: '请选择日期',  //结束日期的值
    show_time_chose:'选择查询日期',  //选择查询日期的日期选中显示
    jt: true,  //今日 背景颜色样式的显示
    zt: false,  //今日 背景颜色样式的显示
    jqt: false,  //今日 背景颜色样式的显示
    jsst: false,  //今日 背景颜色样式的显示
    cha : false,
    url: url,
  }, 
  onLoad: function (options) {
    var that = this
    this.getData()
    // 获得页面中间部位的高度
    const query = wx.createSelectorQuery()
    query.select('.chuku_tj').boundingClientRect()
    query.select('.top').boundingClientRect()
    query.select('.top_one').boundingClientRect()
    query.exec(function(res){
      // console.log(res)
      var cha_zhi1 = res[0].height - res[1].height - 0.02 * res[0].height - 28
      var cha_zhi2 = res[0].height - res[2].height 
      // console.log(cha_zhi)
      that.setData({
        bottom: cha_zhi1,
        tk: cha_zhi2
      })
    })
  },
  //获取数据
  getData() {
    var that = this
    wx.request({
      url: url + 'get_goods_out',
      method: "GET",
      success(res) {
        let goods = res.data.info
        goods = JSON.stringify(goods)
        goods = goods.replace(/\\/g, "");
        goods = goods.replace(/:"\[/g, ":[");
        goods = goods.replace(/\]"/g, "]");
        goods = JSON.parse(goods)
        console.log(goods)
        let myDate = new Date() //今天
        let myDate0 = new Date()  //昨天
        myDate0.setDate(myDate0.getDate() - 1)
        let myDate1 = new Date()  //前天
        myDate1.setDate(myDate1.getDate() - 2)
        let myDate2 = new Date() //7天前
        myDate2.setDate(myDate2.getDate() - 7)
        let myDate3 = new Date() //31天前
        myDate3.setDate(myDate3.getDate() - 30)
        let myDate4 = new Date() //1年前
        myDate4.setDate(myDate4.getDate() - 365)
        var nowtime = []
        var berfortime_1 = []
        var berfortime_7 = []
        var berfortime_30 = []
        var berfortime_365 = []
        for (let i = 0; i < goods.length; i++) {
          var starttime = new Date(goods[i].out_date1);
          if (starttime > myDate0 && starttime < myDate) {
            nowtime.push(goods[i])
          }
          if (starttime > myDate1 && starttime < myDate0) {
            berfortime_1.push(goods[i])
          }
          if (starttime > myDate2 && starttime < myDate) {
            berfortime_7.push(goods[i])
          }
          if (starttime > myDate3 && starttime < myDate) {
            berfortime_30.push(goods[i])
          }
          if (starttime > myDate4 && starttime < myDate) {
            berfortime_365.push(goods[i])
          }
        }
        //今日总量
        let now_all_number = 0
        for (let i = 0; i < nowtime.length; i++) {
          now_all_number = now_all_number + (nowtime[i].goods_number - 0)
        }
        //昨日总量
        let b1_all_number = 0
        for (let i = 0; i < berfortime_1.length; i++) {
          b1_all_number = b1_all_number + (berfortime_1[i].goods_number - 0)
        }

        //7日总量
        let b7_all_number = 0
        for (let i = 0; i < berfortime_7.length; i++) {
          b7_all_number = b7_all_number + (berfortime_7[i].goods_number - 0)
        }
        //30日总量
        let b30_all_number = 0
        for (let i = 0; i < berfortime_30.length; i++) {
          b30_all_number = b30_all_number + (berfortime_30[i].goods_number - 0)
        }
        //1年总量
        let b365_all_number = 0
        for (let i = 0; i < berfortime_365.length; i++) {
          b365_all_number = b365_all_number + (berfortime_365[i].goods_number - 0)
        }
        that.setData({
          goods,
          nowtime,
          berfortime_1,
          berfortime_7,
          berfortime_30,
          now_all_number,
          b1_all_number,
          b7_all_number,
          b30_all_number,
          b365_all_number
        })
      }
    })
  },
  //选择查询日期
  time_chose_btn: function () {
    console.log("查询日期")
    if (this.data.showhidden == true) {
      this.setData({
        showhidden: false
      })
    } else {
      this.setData({
        showhidden: true
      })
    }
  },
  //选择查询日期 开始日期的确认
  bindDateChange1: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date_start: e.detail.value
    })
  },
  //选择查询日期 结束日期的确认
  bindDateChange2: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date_end: e.detail.value
    })
  },
  //选择查询日期的确定按钮
  confirm_btn: function () {
    this.setData({
      showhidden: true,
      jt: false,
      zt: false,
      jqt: false,
      jsst: false,
      cha: true
    })
    if (this.data.date_start == '请选择日期' || this.data.date_end == '请选择日期') {
      wx.showToast({
        title: '请选择正确的日期',
        icon: 'none',
        duration: 1000
      })
    } else {
      var date_start = new Date(this.data.date_start);
      var date_end = new Date(this.data.date_end);
      var chaxun = []
      var cha_all_number = 0 
      for (var i = 0; i < this.data.goods.length; i++) {
        var out_date1 = new Date(this.data.goods[i].out_date1);
        if (out_date1 >= date_start && out_date1 <= date_end) {
          chaxun.push(this.data.goods[i])
          cha_all_number = cha_all_number + (this.data.goods[i].goods_number-0)
        }
      }
      this.setData({
        show_time_chose: this.data.date_start + '-' + this.data.date_end,
        chaxun,
        cha_all_number
      })
      console.log(chaxun)
    }
  },
  //选择查询日期的重置按钮
  reset_btn: function () {
    // console.log("重置日期")
    this.setData({
      date_start: '请选择日期',
      date_end: '请选择日期',
      show_time_chose:'选择查询日期'
    })
  },
  //今日按钮
  jt_chose: function () {
    if (this.data.jt == false) {
      this.setData({
        jt: true,
        zt: false,
        jqt: false,
        jsst: false,
        cha : false
      })
    } else {
      this.setData({
        jt: false,
      })
    }
  },
  //昨日按钮
  zt_chose: function () {
    if (this.data.zt == false) {
      this.setData({
        zt: true,
        jt: false,
        jqt: false,
        jsst: false,
        cha : false
      })
    } else {
      this.setData({
        zt: false,
      })
    }
  },
  //近7天按钮
  jqt_chose: function () {
    if (this.data.jqt == false) {
      this.setData({
        jqt: true,
        jt: false,
        zt: false,
        jsst: false,
        cha : false
      })
    } else {
      this.setData({
        jqt: false,
      })
    }
  },
  //近30天按钮
  jsst_chose: function () {
    if (this.data.jsst == false) {
      this.setData({
        jsst: true,
        jt: false,
        zt: false,
        jqt: false,
        cha : false
      })
    } else {
      this.setData({
        jsst: false,
      })
    }
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