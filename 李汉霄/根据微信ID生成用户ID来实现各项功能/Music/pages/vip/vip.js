// pages/vip/vip.js
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
          level: user.user_level,
          id: user.user_id,
          judge:user.user_ifvip
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
  
  backIndex:function(){
    this.data.judge='是';
    wx.request({
      url:`http://www.badwoman.com.cn:8805/changeLevel/${Number(this.data.level)+1}/${this.data.id}`,
      success:(res)=>{
        wx.request({
          url: `http://www.badwoman.com.cn:8806/changeJudge/${this.data.judge}/${this.data.id}`,
          success:(res)=>{
            wx.reLaunch({
              url: '../index/index'
            })
          }
        })
      }
    })
  },

  choice1:function(){
    this.setData({
      name1:'choice',
      name2:'',
      name3:''
    })
  },

  choice2: function () {
    this.setData({
      name2: 'choice',
      name1:'',
      name3:''
    })
  },

  choice3: function () {
    this.setData({
      name3: 'choice',
      name1:'',
      name2:''
    })
  }
})