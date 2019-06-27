//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        input_name: '',
        input_text: ''
    },
    onLoad(){
      // wx.request({
      //   url: 'https://fangchan.for.pub/api.php/Bblogin/cs',//请求地址
      //   data: {//发送给后台的数据
      //     name: "bella",
      //     age: 20,
      //     img: JSON.stringify([1,2])
      //   },
      //   header: {//请求头
      //     // "Content-Type": "applciation/json"
      //     // "Content-Type": "multipart/form-data"
      //     'content-type': 'application/x-www-form-urlencoded',
      //     'Accept': 'application/json'
      //   },
      //   method: "POST",//get为默认方法/POST
      //   success: function (res) {
      //     console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
      //     that.setData({//如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数

      //       logs: res.data.result

      //     })

      //   },
      //   fail: function (err) { },//请求失败
      //   complete: function () { }//请求完成后执行的函数
      // })
      wx.login({
        success(res) {
          if (res.code) {
            // 发起网络请求
            wx.request({
              url:  'https://fangchan.for.pub/api.php/Bblogin/getOpenid',
              data: {
                code: res.code
              },
              success(data){
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
   
    //事件处理函数
    gen_picture: function() {
        var name = ''
        if (this.data.input_name) {
            name = 'To '+this.data.input_name
        }
        wx.navigateTo({
            url: '../result/result?input_name='+name+'&input_text='+this.data.input_text+'&back_to_index=0'
        })
    },
    listen_input_name: function(e) {
        this.data.input_name = e.detail.value
    },
    listen_input_text: function(e) {
        this.data.input_text = e.detail.value
    },
    // onLoad: function(){
    //     this.get_access_token()
    // },
    // get_access_token: function(){
    //     var url = 'https://api.weixin.qq.com/cgi-bin/token'
    //     var appid = 'wx133b7f49e64065cc'
    //     var appsecret = 'cc5905fb975bc9da62d3028176827f39'
    //     wx.request({
    //         url: url,
    //         method: 'GET',
    //         data: {
    //             grant_type: 'client_credential',
    //             appid: appid,
    //             secret: appsecret
    //         },
    //         header: {
    //             'content-type': 'application/json'
    //         },
    //         success: function(res) {
    //             console.log(res)
    //         }
    //     })
    // }
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
