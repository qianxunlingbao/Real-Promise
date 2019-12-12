// pages/musicLists/musicLists.js
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
    this.setData({
      user_id:this.options.id
    })
    wx.request({
      url: `http://www.badwoman.com.cn:8807/lists/${this.data.user_id}`,
      success: (res) => {
        if(res.data.status==-1){
          this.setData({
            list:[]
          })
        }else{
          var arr = [];
          for (var i = 0; i < res.data.data.length; i++) {
            arr.push(res.data.data[i].list_name);
          }
          this.setData({
            list: arr
          })
        }
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

  listMessage:function(e){
    wx.navigateTo({
      url:'/pages/listMessage/listMessage?id1='+e.target.id+'&id2='+this.data.user_id
    })
    console.log(e);
  },

  addList:function(){
    wx.navigateTo({
      url:'/pages/addList/addList?id='+this.data.user_id
    })
  },

  deleteList:function(e){
    wx.request({
      url: `http://www.badwoman.com.cn:8807/lists/${this.data.user_id}`,
      success: (res) => {
        var delete_id=res.data.data[e.target.id].list_id;
        wx.request({
          url: `http://www.badwoman.com.cn:8808/deleteList/${delete_id}`,
          success:(res)=>{
            wx.request({
              url: `http://www.badwoman.com.cn:8807/lists/${this.data.user_id}`,
              success: (res) => {
                if(res.data.status==-1){
                  this.setData({
                    list: []
                  })
                }else{
                  var arr2 = [];
                  for (var i = 0; i < res.data.data.length; i++) {
                    arr2.push(res.data.data[i].list_name);
                  }
                  this.setData({
                    list: arr2
                  })
                }
              }
            });
          }
        });
      }
    });
    
  },

  backIndex:function(){
    wx.reLaunch({
      url: '/pages/index/index'
    })
  }
})