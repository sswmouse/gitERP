// pages/goods_detail/goods_detail.js
Page({
  //数据
  data: {
    date: '',
    nowTime: "",//当前系统时间
    formdata: "",
    fileList: [],//图片暂存地址
    goods_date: '',
    i: 0
  },
  //生命周期
  onLoad: function (options) {
    //数据获取
    console.log(options.id)
    this.setData({
      fileList: []
    })
    var that = this
    wx.request({
      url: 'http://localhost:3000/get_goods',
      data: {
        goods_id: options.id
      },
      method: "POST",
      success(res) {
        //数组对象没被解析出来 在单独解析一下 或者使用字符串替换掉[]外的引号
        let data = JSON.parse(res.data.detail)[0]
        data.goods_img = JSON.parse(data.goods_img)
        for (var i = 0; i < data.goods_img.length; i++) {
          let a = { url: 'http://localhost:3000/img/' + data.goods_img[i] }
          that.data.fileList.push(a)
        }
        that.setData({
          goods_date: data.goods_date,
          formdata: data,
          fileList: that.data.fileList
        })
        console.log(data)
      }
    })

    // 获得页面中间部位的高度
    const query = wx.createSelectorQuery()
    query.select('.coverdiv').boundingClientRect()
    query.select('.footdiv').boundingClientRect()
    query.exec(function (res) {
      console.log(res)
      var cha_zhi = res[0].height - res[1].height
      // console.log(cha_zhi)
      that.setData({
        bot_height: cha_zhi
      })
    })
    //获取当前系统时间
    let myDate = new Date()
    let time = myDate.toLocaleDateString()
    this.setData({
      nowTime: time
    })
  },
  //删除货品点击事件
  onpull() {
    var that = this
    wx.showModal({
      title: '是否删除货品？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          console.log(that.data.formdata.goods_id)
          wx.request({
            url: 'http://localhost:3000/delete_goods',
            data: {
              goods_id: that.data.formdata.goods_id,
            },
            method: "POST",
            success(res) {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //上架时间修改函数
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
    this.setData({
      goods_date: this.data.date
    })
    this.data.formdata.goods_date = this.data.date
  },
  //保存修改点击事件
  change_keep() {
    var that = this
    var formdata = this.data.formdata
    var fileList = this.data.fileList
    console.log(this.data.fileList)
    wx.showModal({
      title: '是否确定修改！',
      content: '',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          wx.request({
            url: 'http://localhost:3000/get_goods',
            data: {
              goods_id: formdata.id,
            },
            method: "POST",
            success(res) {
              if (res.data.detail == '[]') {
                that.data.i = 0
                var fileList_add = []
                //排除本地读取的数据库图片
                for (var j = 0; j < fileList.length; j++) {
                  if (fileList[j].url.indexOf("http://localhost:3000/img/") == -1) {
                    fileList_add.push(fileList[j])
                  }
                }
                if (fileList_add.length > 0) {
                  that.up(formdata, fileList_add)
                } else {
                  that.up1(formdata)
                }
              } else {
                wx.showModal({
                  title: '修改失败！',
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
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
          console.log(Promise)
        }
      }
    })
  },
  //修改时有图片变动
  up(formdata, fileList) {
    var that = this
    wx.uploadFile({
      url: 'http://localhost:3000/change_goods',
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
        } else {
          that.onLoad()
        }
      }, fail(err) {
        console.log(err)
      }
    })
  },
  //修改时没有图片变动
  up1(formdata) {
    wx.request({
      url: 'http://localhost:3000/change_goods',
      data: {
        formdata: JSON.stringify(formdata)
      },
      method: "POST",
      success(res) {
        that.onLoad()
        console.log(res.data.detail)
      }, fail(err) {
        console.log(err)
      }
    })
  },

  //上传商品图片事件
  onChange(e) {
    // console.log('onChange', e.detail)
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
  //图片删除事件
  onRemove(e) {
    var that = this
    console.log(this.data.formdata)
    let str = e.detail.file.url
    var str1 = ""
    for (let j = 26; j < str.length; j++) {
      str1 = str1 + str[j]
    }
    wx.request({
      url: 'http://localhost:3000/delete_goods_img',
      data: {
        goods_id: that.data.formdata.goods_id,
        img: str1
      },
      method: "POST",
      success(res) {
        that.onLoad()
      }
    })
  },
  to_ruku() {
    console.log(111)
    wx.navigateTo({
      url: '/pages/ruku_gl/ruku_gl',
    })
  },
  //双向数据绑定函数
  ch_clour: function (e) {
    this.data.formdata.goods_color = e.detail.value
  },
  ch_size: function (e) {
    this.data.formdata.goods_size = e.detail.value
  },
  ch_money: function (e) {
    this.data.formdata.goods_price = e.detail.value
  },
  ch_gong_nm: function (e) {
    this.data.formdata.ghs_name = e.detail.value
  },
  ch_gong_tel: function (e) {
    this.data.formdata.ghs_phone = e.detail.value
  },
  ch_beizhu: function (e) {
    this.data.formdata.goods_beizhu = e.detail.value
  },
})