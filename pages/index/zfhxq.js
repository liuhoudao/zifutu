// pages/index/zfhxq.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:'',
    date:'',
    bc:1,
    size:'18',
    sx:'false',
    img_w: 400,
    bg: "true"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    var that =this;
    that.setData({
      img: options.img,
      size: options.size,
      sx: options.sx,
      bg: options.bg,
      img_w: options.img_w
    })
    that.upload(that,options.img)
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
  // 生成图片
 upload: function(page, path) {
   var data = { 'size': page.data.size, 'sx': page.data.sx, 'img_w': page.data.img_w, 'bg': page.data.bg}
   console.log(data);
    wx.showToast({
      icon: "loading",
      title: "正在生成"
    }),
    wx.uploadFile({
      url: 'https://fangchan.for.pub/api.php/Bblogin/uploade_cs',
      filePath: path,
      name: 'file',
      formData: data,
      header: { "Content-Type": "multipart/form-data" },
      success: function (res) {
        console.log(page.data.date);
        //上传成功返回数据
       page.setData({
          date: JSON.parse(res.data).data
        })
        if (res.statusCode != 200) {
          wx.showModal({
            title: '提示',
            content: '生成失败',
            showCancel: false
          })
          return;
        }
      
      },
      fail: function (e) {
        console.log(e);
        wx.showModal({
          title: '提示',
          content: '生成失败',
          showCancel: false
        })
      },
      complete: function () {
        wx.hideToast(); //隐藏Toast
      }
    })
  },
  save(){
    var that = this;
    var imgSrc = that.data.date;//base64编码
    var save = wx.getFileSystemManager();
    var number = Math.random();
    save.writeFile({
      filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
      data: imgSrc.slice(22),
      encoding: 'base64',
      success: res => {
        wx.saveImageToPhotosAlbum({
          filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
          success: function (res) {
            wx.showToast({
              title: '保存成功',
            })
            // app.globalData.share_tupu = '';
          },
          fail: function (err) {
            that.setData({
              bc:0
            })
            console.log(err)
          }
        })
        console.log(res)
      }, fail: err => {
        console.log(err)
      }
    })
  },
  openSetting(){
    var that = this;
    wx.openSetting({
      success(res) {
        if (res.authSetting['scope.writePhotosAlbum']){
          console.log(1)
            that.setData({
              bc:1
            })
        }
        // console.log(res.authSetting['scope.writePhotosAlbum'])
        // console.log(res.authSetting.scope.writePhotosAlbum)
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
      }
    })
  }
})
