// pages/changeMessage/changeMessage.js
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
          word: user.user_word,
          sex: user.user_sex,
          birthday: user.user_birthday,
          area: user.user_area,
          school: user.user_school,
          work: user.user_work,
          selfword: user.user_word,
          selfmessage: user.user_message,
          id: user.user_id
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

  showList(e){
    wx.request({
      url: `http://www.badwoman.com.cn:8804/changeSex/${e.detail.value.sex}/${this.data.id}`
    })
    wx.request({
      url: `http://www.badwoman.com.cn:8804/changeBirthday/${e.detail.value.birthday}/${this.data.id}`
    })
    wx.request({
      url: `http://www.badwoman.com.cn:8804/changeArea/${e.detail.value.area}/${this.data.id}`
    })
    wx.request({
      url: `http://www.badwoman.com.cn:8804/changeSchool/${e.detail.value.school}/${this.data.id}`
    })
    wx.request({
      url: `http://www.badwoman.com.cn:8804/changeWork/${e.detail.value.work}/${this.data.id}`
    })
    wx.request({
      url: `http://www.badwoman.com.cn:8804/changeWord/${e.detail.value.selfword}/${this.data.id}`
    })
    wx.request({
      url: `http://www.badwoman.com.cn:8804/changeMessage/${e.detail.value.selfmessage}/${this.data.id}`
    })
    wx.switchTab({
      url: '/pages/message/message',
    })
  }
})