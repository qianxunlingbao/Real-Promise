// pages/choiceUser/choiceUser.js
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
      url: 'http://www.badwoman.com.cn:8811/user',
      success: (res) => {
        this.setData({
          list:res.data.data
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

  choice:function(e){
    wx.request({
      url: 'http://www.badwoman.com.cn:8811/user',
      success: (res) => {
        var user_id=res.data.data[e.target.id].user_id;
        wx.request({
          url: `http://www.badwoman.com.cn:8811/userChoice/${user_id}`,
          success: (res) => {
            wx.request({
              url: `http://www.badwoman.com.cn:8811/changeChoice/${user_id}`,
              success: (res) => {
                wx.reLaunch({
                  url: '/pages/index/index'
                })
              }
            });
          }
        });
      }
    });
  },

  addUser:function(){
    var arr=[];
    wx.request({
      url: 'http://www.badwoman.com.cn:8811/user',
      success: (res) => {
        for(var i=0;i<res.data.data.length;i++){
          arr.push(res.data.data[i].user_id)
        }
        var user_id = Math.max(...arr) + 1;
        wx.request({
          url: `http://www.badwoman.com.cn:8811/addUser1/${user_id}`,
          success: (res) => {
            wx.request({
              url: `http://www.badwoman.com.cn:8811/addUser2/${user_id}`,
              success: (res) => {
                wx.request({
                  url: 'http://www.badwoman.com.cn:8811/user',
                  success: (res) => {
                    this.setData({
                      list: res.data.data
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  },

  deleteUser:function(e){
    wx.request({
      url: 'http://www.badwoman.com.cn:8811/user',
      success: (res) => {
        var user_id=res.data.data[e.target.id].user_id;
        wx.request({
          url: `http://www.badwoman.com.cn:8811/deleteUser1/${user_id}`,
          success: (res) => {
            wx.request({
              url: `http://www.badwoman.com.cn:8811/deleteUser2/${user_id}`,
              success: (res) => {
                wx.request({
                  url: `http://www.badwoman.com.cn:8811/deleteUser3/${user_id}`,
                  success: (res) => {
                    wx.request({
                      url: `http://www.badwoman.com.cn:8811/deleteUser4/${user_id}`,
                      success: (res) => {
                        wx.request({
                          url: 'http://www.badwoman.com.cn:8811/user',
                          success: (res) => {
                            this.setData({
                              list: res.data.data
                            })
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  }
})