//获取应用实例
var app = getApp()
Page({
    data: {
        author: '刘厚道',
      authoravatar:'../../imgs/icon.jpg',
        user:'',
    },
    onLoad: function () {
        var that = this
        that.setData({ authoravatar: app.globalData.userInfo.avatarUrl})
        that.setData({ author: app.globalData.userInfo.nickName })
        // 发起网络请求
        wx.request({
          url: 'https://fangchan.for.pub/api.php/Bblogin/inform',
          data: {
          },
          success(data) {
            that.setData({user: data.data.data})
            // console.log(that.data.user);
          }});
    },

    about_btn: function(){
    	wx.navigateTo({
            url: '/pages/content/content'
        })
    },

    feedback_btn: function(){
      var that = this
    	wx.showActionSheet({
        itemList: ['你可以通过以下方式反馈问题', ('qq: ' + that.data.user.qq), ('邮箱: ' + that.data.user.email)],
		})
    },

    update_btn: function(){
      var that = this
    	wx.showModal({
		  title: '更新提示',
      content: that.data.user.update
		})
    },
  message() {
      wx.navigateTo({
        url: '../content/message'
      })
  },
      /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '不正经小程序和很正经开发者欢迎各位童鞋，找对象，速进、想发财，速进、想梦想成真，那赶紧进来吧。（当然我都帮不了你)( ^3^ )╱~~',
      path: 'pages/index/index',
      imageUrl: 'http://fangchan.for.pub/Public/my_gb/xcx.jpg'
    }
  }
})