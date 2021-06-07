// index.js
// 获取应用实例
const app = getApp()

Page({
  onLoad: function (options) {
    console.log(wx.list)
  },
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },

  data: {
    imgs:[app.data.url+'banner.png', app.data.url+'index_banner.png'],
    list: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
  },
})
