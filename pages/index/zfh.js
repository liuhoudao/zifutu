//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    img: '',
    size:"18",
    sx:"false",
    img_w:400,
    bg:"true"
  },
  onLoad() {
    wx.login({
      success(res) {
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: 'https://fangchan.for.pub/api.php/Bblogin/getOpenid',
            data: {
              code: res.code
            },
            success(data) {
              //获取用户信息
              wx.getUserInfo({
                success(res) {
                  //更新用户信息
                  var user = res.userInfo;
                  user.openid = data.data.openid;
                  // //将用户信息存入
                  getApp().globalData.userInfo = user;
                  console.log(getApp().globalData.userInfo)
                  //此处写用户注册后登录接口
                  wx.request({
                    url: 'https://fangchan.for.pub/api.php/Bblogin/login',
                    data: getApp().globalData.userInfo,
                    success(res) {

                    },
                  })
                },
                fail() {
                  console.log(111)
                  //未授权去授权
                  wx.redirectTo({
                    url: '/pages/login/login'
                  })
                }
              })
            },
            fail() {
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  },

   // 拍摄或从相册选取上传
  uploadPhoto(e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      // sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      // sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        that.setData(
          { img: tempFilePaths }
          )
          console.log('本地图片的路径:', tempFilePaths)
      }
    })
  },
  get_img(){
    if (this.data.img){
      wx.navigateTo({
        url: './zfhxq?img=' + this.data.img + '&size=' + this.data.size + '&sx=' + this.data.sx + '&bg=' + this.data.bg + '&img_w=' + this.data.img_w
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请选择图片',
        showCancel: false
      })
    }
  },
  change_size:function(res){
    this.setData({
      size: res.currentTarget.dataset.size
    });
  },
  change_img_w: function (res) {
    this.setData({
      img_w: res.currentTarget.dataset.img_w
    });
  },
  change_bg: function (res) {
    this.setData({
      bg: res.currentTarget.dataset.bg
    });
  },
  change_sx: function (res) {
    this.setData({
      sx: res.currentTarget.dataset.sx
    });
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
      title: app.globalData.userInfo.nickName+' 邀请你快来生成属于你的字符图',
      path: 'pages/index/zfh',
      imageUrl:'http://fangchan.for.pub/Public/my_gb/zft.png'
    }
  }
})

