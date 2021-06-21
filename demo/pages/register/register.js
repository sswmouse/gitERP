// pages/register/register.js
var app = getApp()
const url = getApp().globalData.server
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mendian: "",
    dizi: "",
    name: "",
    sex_item: [{ value: "女", name: '女' }, { value: "男", name: '男' }],
    sex: "男",
    phone: ""
  },
  //保存按钮点击事件
  keep: function () {
    var data = {
      name: this.data.name,
      mendian: this.data.mendian,
      dizi: this.data.dizi,
      sex: this.data.sex,
      phone: this.data.phone,
    }
    if (this.data.name != '' && this.data.mendian != '' && this.data.dizi != '' && this.data.sex != '' && this.data.phone != '') {
      wx.login({
        success(res) {
          if (res.code) {
            wx.request({
              url: url+'register',
              data: {
                code: res.code,
                data: data
              },
              method: "POST",
              success(res) {
                wx.setStorageSync('openid',res.data.detail)
                console.log(wx.getStorageSync('openid'))
                app.globalData.is_register='true'
                wx.switchTab({
                  url: "/pages/homePage/homePage",
                })
              }
            })
          } else {
            wx.showToast({
              title: '注册失败！'+res.errMsg,
              icon: 'none',
              duration: 1000//持续的时间
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '请完善信息！',
        icon: 'none',
        duration: 1000//持续的时间
      })
    }
  },
  //输入框数据双向绑定
  xiugai: function (e) {
    if (e.currentTarget.dataset.index == 0) {
      this.data.mendian = e.detail.value
    } else if (e.currentTarget.dataset.index == 1) {
      this.data.dizi = e.detail.value
    } else if (e.currentTarget.dataset.index == 2) {
      this.data.name = e.detail.value
    } else if (e.currentTarget.dataset.index == 3) {
      this.data.phone = e.detail.value
    }
  },
  //性别数据绑定
  radioChange(e) {
    this.data.sex = e.detail.value
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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