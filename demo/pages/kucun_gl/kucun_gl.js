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
  }
});