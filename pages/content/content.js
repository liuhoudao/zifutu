const WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    'user':'',
  },
  onLoad: function () {
    let that = this;
    // 发起网络请求
    wx.request({
      url: 'https://fangchan.for.pub/api.php/Bblogin/inform',
      data: {
      },
      success(data) {
        that.setData({
          user:data.data.data});
        WxParse.wxParse('article', 'html', that.data.user.about, that, 5);
      }
    });
  },
})