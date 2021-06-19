// pages/index/newrklist.js
var url = getApp().globalData.server

Page({
  // 页面的初始数据
  data: {
    treeye: 0,
    date: '2021-06-01',
    uptime: "设置上架时间",
    fileList: [], //图片列表
    formdata: { id: "", img: [],user_name:'' }, //表单数据
    classList: [], //货品类别数据
    is_classList: -1, //当前选择类别的下标
    nowTime: "", //当前系统时间
    i: '', //用于处理异步操作的变量
  },

  //货品分类选择展开
  treeyetab() {
    console.log(this.data.is_classList)
    if (this.data.treeye == 0) {
      this.setData({
        treeye: 1
      })
    } else {
      this.setData({
        treeye: 0
      })
    }
  },
  // 上架时间触发事件
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    this.setData({
      uptime: this.data.date
    })
    this.data.formdata.uptime = this.data.date
  },
  //选择货品类别
  classify(e) {
    let arr = []
    arr.push(e.currentTarget.dataset.index)
    console.log(arr)
    this.setData({
      is_classList: arr
    })
    this.data.formdata.classList = this.data.classList[e.currentTarget.dataset.index].name
  },
  //保存按钮
  zz_sub() {
    console.log(this.data.formdata)
    var formdata = this.data.formdata
    var fileList = this.data.fileList
    var that = this
    var is_null = true
    // if(this.data.formdata.id=='' || !this.data.formdata.nm 
    // || !this.data.formdata.classList || !this.data.formdata.num ){
    //   is_null = false
    // } 
    // 查询数据中是否存在空值
    for (let key in formdata) {
      let num = 0
      if (formdata[key] == "") {
        num++
        console.log('数据有空的', key)
      }
      if (num > 1) {
        is_null = false
      }
    }
    var arr = Object.keys(formdata);
    if (arr.length != 13) {
      console.log('数据量不够', arr.length)
      is_null = false
    }
    if (fileList.length >= 1 && is_null) {
      wx.request({
        url: url + 'get_goods',
        data: {
          goods_id: formdata.id,
        },
        method: "POST",
        success(res) {
          if (res.data.detail == '[]') {
            that.data.i = 0
            that.up(formdata, fileList)
          } else {
            wx.showModal({
              title: '此货品仓库已有！',
              content: '',
              success: function (res) {
                if (res.confirm) {//这里是点击了确定以后
                  console.log('用户点击确定')
                } else {//这里是点击了取消以后
                  console.log('用户点击取消')
                }
              }
            })
          }
        }
      })
    } else if (!is_null) {
      wx.showToast({
        title: '请完善商品信息', //提示文字
        icon: 'none', //弹出样式
        duration: 2000 //持续的时间
      })
    } else {
      wx.showToast({
        title: '请选择商品图片', //提示文字
        icon: 'none', //弹出样式
        duration: 2000 //持续的时间
      })
    }
  },
  //自定义文件上传函数
  up(formdata, fileList) {
    var that = this
    wx.uploadFile({
      url: url + 'add_goods', //仅为示例，非真实的接口地址
      filePath: fileList[that.data.i].url,
      name: 'file',
      formData: {
        'user': 'img',
        formdata: JSON.stringify(formdata)
      },
      success(res) {
        that.data.i++
        if (that.data.i < fileList.length) {
          that.up(formdata, fileList)
        }
        console.log(res.data)
        wx.redirectTo({
          url: '/pages/goods_detail/goods_detail?is_show=2&id=' + formdata.id,
        })
      }, fail() {
        console.log(111)
      }
    })
  },
  //添加新分类按钮
  to_add() {
    wx.navigateTo({
      url: '/pages/good_gl/good_gl',
    })

  },
  //图标上传事件
  change_img: function () {
    var that = this
    wx.chooseImage({
      success(res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.data.userInfo.img = tempFilePaths
        wx.setStorageSync('user', that.data.userInfo)
        that.setData({
          userInfo: wx.getStorageSync('user')
        })
        wx.uploadFile({
          url: url + 'change_img', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'img',
            openid: wx.getStorageSync('openid')
          },
          success(res) {
            console.log(res)
            const data = res.data
            //do something
          }
        })
      }
    })
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    var user = wx.getStorageSync('user')
    this.data.formdata.user_name = user.name
    var that = this
    wx.request({
      url: url + 'get_gong',
      method: "get",
      success(res) {
        that.setData({
          gongList: res.data
        })
      }
    })
    wx.request({
      url: url + 'get_classify',
      data: {
        code: ''
      },
      method: "GET",
      success(res) {
        var arr = JSON.parse(res.data.detail);
        //排序
        for (var i = 0; i < arr.length - 1; i++) {
          for (var j = i; j < arr.length - i - 1; j++) {
            if (arr[j].id > arr[j + 1].id) {
              let aaa = arr[j]
              arr[j] = arr[j + 1]
              arr[j + 1] = arr[j]
            }
          }
        }
        that.setData({
          classList: arr
        })
      }
    })
    let myDate = new Date()
    let time = myDate.toLocaleDateString()
    this.setData({
      nowTime: time
    })

    // 获得页面中间部位的高度
    const query = wx.createSelectorQuery()
    query.select('.coverdiv').boundingClientRect()
    query.select('.zz_sub').boundingClientRect()
    query.exec(function (res) {
      console.log(res)
      var cha_zhi = res[0].height - res[1].height - res[0].height * 0.03
      // console.log(cha_zhi)
      that.setData({
        bot_height: cha_zhi
      })
    })
  },

  ch_id: function (e) {
    this.data.formdata.id = e.detail.value
  },

  ch_nm: function (e) {
    this.data.formdata.nm = e.detail.value
  },

  ch_num: function (e) {
    this.data.formdata.num = e.detail.value
  },

  ch_clour: function (e) {
    this.data.formdata.clour = e.detail.value
  },

  ch_size: function (e) {
    this.data.formdata.size = e.detail.value
  },

  ch_money: function (e) {
    this.data.formdata.money = e.detail.value
  },

  ch_gong_nm: function (e) {
    this.data.formdata.gong_nm = e.detail.value
  },

  ch_gong_tel: function (e) {
    this.data.formdata.gong_tel = e.detail.value
  },
  ch_beizhu: function (e) {
    this.data.formdata.beizhu = e.detail.value
  },
  //上传商品图片事件
  onChange(e) {
    console.log('onChange', e.detail)
    const { file, fileList } = e.detail
    if (file.status === 'uploading') {
      this.setData({
        progress: 0,
      })
      wx.showLoading()
    } else if (file.status === 'done') {
      this.setData({
        imageUrl: file.url,
      })
    }

    // Controlled state should set fileList
    this.setData({
      fileList
    })
  },
  //上传商品图片事件
  onSuccess(e) {
    // console.log('onSuccess', e)
  },
  //上传商品图片事件
  onFail(e) {
    // console.log('onFail', e)
  },
  //上传商品图片事件
  onComplete(e) {
    // console.log('onComplete', e)
    wx.hideLoading()
  },
  //上传商品图片事件
  onProgress(e) {
    // console.log('onProgress', e)
    this.setData({
      progress: e.detail.file.progress,
    })
  },
  //上传商品图片事件
  onPreview(e) {
    // console.log('onPreview', e)
    const {
      file,
      fileList
    } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
})