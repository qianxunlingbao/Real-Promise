// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search:[],
    search2:'',
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var arr = [...this.data.search, e.detail.value.userinput];
    console.log(arr);
    this.setData({
      search:arr
    })
  },

  clearInputEvent:function(e){
    this.setData({
      search2:''
    });
    var name = this.data.search[this.data.search.length - 1];
    function f(value){
      if(value!=name){
        return true;
      }else{
        return false;
      }
    }
    wx.request({
      url: 'http://www.badwoman.com.cn:8801/music',
      success: (res) => {
        var arr2 = [];
        for(var i=0;i<res.data.data.length;i++){
          arr2.push(res.data.data[i].music_name);
        }
        if (arr2.every(f)) {
          wx.navigateTo({
            url: '/pages/error/error'
          });
        } else {
          wx.navigateTo({
            url: '/pages/music/music?name=' + name
          });
        }
      }
    });
  },

  somethingLikethis:function(e){
    wx.request({
      url: 'http://www.badwoman.com.cn:8801/music',
      success: (res) => {
        var map = res.data.data.map((item) => {
          var reg = new RegExp(e.detail.value);
          var str = item.music_name.match(reg);
          if (str != null) {
            return item.music_name;
          }
        })
        for (var i = map.length - 1; i >= 0; i--) {
          if (map[i] == undefined) {
            map.splice(i, 1);
          }
        }
        this.setData({
          list: map
        })
      }
    });
  },

  clearLikethis:function(){
    this.setData({
      list:[]
    })
  },

  clearNav:function(e){
    this.data.search.splice(e.target.id,1);
    this.setData({
      search:this.data.search
    })
  },

  choice:function(e){
    var value=this.data.list.splice(e.target.id,1);
    this.setData({
      search2:value,
      list:[]
    })
  },

  clearAll:function(){
    this.setData({
      search:[]
    })
  },

  gotoMusic:function(e){
    var name2 = this.data.search[e.target.id];
    function f(value) {
      if (value != name2) {
        return true;
      } else {
        return false;
      }
    }
    wx.request({
      url: 'http://www.badwoman.com.cn:8801/music',
      success: (res) => {
        var arr3 = [];
        for (var i = 0; i < res.data.data.length; i++) {
          arr3.push(res.data.data[i].music_name);
        }
        if (arr3.every(f)) {
          wx.navigateTo({
            url: '/pages/error/error'
          });
        } else {
          wx.navigateTo({
            url: '/pages/music/music?name=' + name2
          });
        }
      }
    });
  }
})