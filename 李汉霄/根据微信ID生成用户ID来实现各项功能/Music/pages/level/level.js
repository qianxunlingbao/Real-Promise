// pages/level/level.js
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
      url: 'http://www.badwoman.com.cn:8803/musicUsers',
      success: (res) => {
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].user_id == this.options.id) {
            var user = res.data.data[i];
          }
        }
        this.setData({
          level:user.user_level,
          id:user.user_id
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

  vip:function(){
    wx.navigateTo({
      url: '/pages/vip/vip?id='+this.data.id
    })
  }
})