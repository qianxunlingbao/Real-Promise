// pages/music/music.js
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
    wx.request({
      url: 'http://www.badwoman.com.cn:8801/music',
      success: (res) => {
        for(var i=0;i<res.data.data.length;i++){
          if(res.data.data[i].music_name==this.options.name){
            var id=res.data.data[i].music_id;
            var name = res.data.data[i].music_name;
            var author = res.data.data[i].music_author;
            wx.request({
              url: `http://www.badwoman.com.cn:8802/musicword/${id}.txt`,
              success: (res) => {
                this.setData({
                  list: res.data,
                  src: `http://www.badwoman.com.cn:8802/music/${id}.mp3`,
                  name:name,
                  author:author,
                  poster: `http://www.badwoman.com.cn:8802/musicimage/${id}.JPG`
                })
              }
            });
          }
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
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

  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  }
})