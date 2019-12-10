// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.request({
      url: 'http://www.badwoman.com.cn:8811/user',
      success: (res) => {
        for (var j = 0; j < res.data.data.length; j++) {
          if (res.data.data[j].ifchoice == '选中') {
            var id = res.data.data[j].user_id;
          }
        }
        wx.request({
          url: 'http://www.badwoman.com.cn:8803/musicUsers',
          success: (res) => {
            for (var i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].user_id == id) {
                var user = res.data.data[i];
              }
            }
            this.setData({
              level: user.user_level,
              word: user.user_word,
              judge: user.user_ifvip,
              sex:user.user_sex,
              birthday:user.user_birthday,
              area:user.user_area,
              school:user.user_school,
              work:user.user_work,
              selfword:user.user_word,
              selfmessage:user.user_message
            })
          }
        })
      }
    })
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

  changeMessage:function(){
    wx.navigateTo({
      url: '/pages/changeMessage/changeMessage'
    })
  },

  backIndex:function(){
    wx.reLaunch({
      url:'../index/index'
    })
  }
})