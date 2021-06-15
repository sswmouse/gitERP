// pages/index/newrklist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    treeye: 0,
    date: '2021-06-01',
    uptime: "设置上架时间",
    fileList: [
    ],
    formdata:{id:""},
    classList:[]
  },

  treeyetab() {
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
  },

  //没调用？
  kindToggle: function (e) {
    var id = e.currentTarget.id,
      list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },

  //上传商品图片事件（图标改变）
  onChange(e) {
    console.log('onChange', e)
    const {
      file,
      fileList
    } = e.detail
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
  //上传商品图片事件（图标改变）
  onSuccess(e) {
    console.log('onSuccess', e)
  },
  //上传商品图片事件（图标改变）
  onFail(e) {
    console.log('onFail', e)
  },
  //上传商品图片事件（图标改变）
  onComplete(e) {
    console.log('onComplete', e)
    wx.hideLoading()
  },
  //上传商品图片事件（图标改变）
  onProgress(e) {
    console.log('onProgress', e)
    this.setData({
      progress: e.detail.file.progress,
    })
  },
  //上传商品图片事件（图标改变）
  onPreview(e) {
    console.log('onPreview', e)
    const {
      file,
      fileList
    } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },


  // let 变量名 = 参数名.currentTarget.dataset['index'];
  
  //保存按钮
  zz_sub(){
    console.log(this.data.formdata)
    console.log()
    var formdata=this.data.formdata
    // wx.redirectTo({
    //   url: '/pages/goods_detail/goods_detail',
    //   success:function(res){
    //     wx.setStorage({
    //       key:"formdata",
    //       data:formdata
    //     })
    //   },
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this 
    wx.request({
      url: 'http://localhost:3000/get_classify',
      data: {
        code: ''
      },
      method: "GET",
      success(res) {
        var arr = JSON.parse(res.data.detail);
        //排序
        for(var i=0;i<arr.length-1;i++){
          for(var j=i;j<arr.length-i-1;j++){
            if(arr[j].id>arr[j+1].id){
              let aaa = arr[j]
              arr[j] = arr[j+1]
              arr[j+1] = arr[j]
            }
          }
        }
        that.setData({
          classList:arr
        })
      }
    })
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

  },

  ch_id:function(e){
    this.data.formdata.id=e.detail.value
  },

  ch_nm:function(e){
    this.data.formdata.nm=e.detail.value
  },

  ch_num:function(e){
    this.data.formdata.num=e.detail.value
  },

  ch_clour:function(e){
    this.data.formdata.clour=e.detail.value
  },

  ch_size:function(e){
    this.data.formdata.size=e.detail.value
  },

  ch_money:function(e){
    this.data.formdata.money=e.detail.value
  },

  ch_gong_nm:function(e){
    this.data.formdata.gong_nm=e.detail.value
  },

  ch_gong_tel:function(e){
    this.data.formdata.gong_tel=e.detail.value
  },
})