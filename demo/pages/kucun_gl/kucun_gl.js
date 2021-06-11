Page({
  data: {
      inputShowed: false,
      inputVal: "",
      sty:0,
      list:['入库流水','已入库','已出库']
  },
  dianji:function(e){
    let query = e.currentTarget.dataset['index'];
    this.setData({
      sty:query
    })
  },
  ceshi:function(){
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
  xiangqing:function(){
    console.log(111)
  }
});