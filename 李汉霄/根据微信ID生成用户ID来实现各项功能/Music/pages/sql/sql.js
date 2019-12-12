// pages/sql/sql.js
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
        this.setData({
          list:res.data.data
        })
      }
    });
    wx.request({
      url: 'http://www.badwoman.com.cn:8803/musicUsers',
      success: (res) => {
        this.setData({
          list2: res.data.data
        })
      }
    });
    wx.request({
      url: 'http://www.badwoman.com.cn:8807/musicLists',
      success: (res) => {
        this.setData({
          list3: res.data.data
        })
      }
    });
    wx.request({
      url: 'http://www.badwoman.com.cn:8810/searchHistory',
      success: (res) => {
        this.setData({
          list4: res.data.data
        })
      }
    });
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

  }
})