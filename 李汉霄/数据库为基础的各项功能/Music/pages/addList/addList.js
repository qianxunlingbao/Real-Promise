// pages/addList/addList.js
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
        for (var j = 0; j < res.data.data.length; j++) {
          if (res.data.data[j].ifchoice == '选中') {
            this.setData({
              user_id: res.data.data[j].user_id
            })
          }
        }
        wx.request({
          url: 'http://www.badwoman.com.cn:8807/musicLists',
          success: (res) => {
            var arr=[];
            for(var i=0;i<res.data.data.length;i++){
              arr.push(res.data.data[i].list_id)
            }
            this.setData({
              id:Math.max(...arr)+1
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

  showList(e){
    var name=e.detail.value.add;
    wx.request({
      url: `http://www.badwoman.com.cn:8808/addList/${name}/${this.data.id}/${this.data.user_id}`,
      success:(res)=>{
        wx.navigateTo({
          url: '/pages/musicLists/musicLists'
        })
      }
    })
  }
})