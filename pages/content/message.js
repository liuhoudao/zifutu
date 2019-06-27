// pages/content/message.js
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  formSubmit: function (e) {
    console.log(app.globalData.userInfo);
    if (e.detail.value.details!=""){
      // 发起网络请求
      wx.request({
        url: 'https://fangchan.for.pub/api.php/Bblogin/message',
        data: {
          openid: app.globalData.userInfo.openid,
          nickname: app.globalData.userInfo.nickName,
          name: e.detail.value.name,
          contact: e.detail.value.contact,
          details: e.detail.value.details
        },
        success(data) {
          if (data.data.code==0){
            //成功后
            wx.showModal({
              title: '提示',
              content: data.data.msg,
              showCancel: false,
              success(res) {
                wx.switchTab({
                  url: '../about/about'
                })
              }
            })
          }else{
            wx.showModal({
              title: '提示',
              content: data.data.msg,
              showCancel: false
            })
          }
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '详情不能为空',
        showCancel: false
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})