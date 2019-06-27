//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
    },
    onLoad(){
      wx.getSetting({
        success(res) {
          wx.getUserInfo({
            success(res) {
            },
            fail(){
              wx.showToast({
                title: '请进行授权登录',
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      })
    },
    bindGetUserInfo(e) {
      if (e.detail.userInfo) {
        console.log(1);
        wx.switchTab({
          url: '/pages/index/zfh'
        })
        console.log(2);
      }
      // //用户信息写入
      // getApp().globalData.userInfo = e.detail.userInfo;
    }
})
