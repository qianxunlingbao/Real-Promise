// pages/search/search.js
const app = getApp();
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
  onShow:function(){
    let data;
    var that = this;
    wx.getStorage({
      key: 'storage',
      success: function (res) {
        data = res.data;
        that.setData({
          search: data
        })
      }
    })
  }
,
  showList(e){
    var arr = [...this.data.search, e.detail.value.userinput];
    let that = this;
    wx.setStorage({
      key: 'storage',
      data: arr,
    }),
     that.setData({data1:e.detail.value.userinput});
  },

  clearInputEvent:function(){
    this.setData({
      search2:''
    })
  },

  somethingLikethis:function(e){
    var arr = app.globalData.list;
    if(e.detail.value==''){
      map = ''
    }else{
      var map = arr.map((item) => {
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
    }
   
    this.setData({
      list:map
    })
  },

  clearLikethis:function(){
    this.setData({
      list:[]
    })
  },

  clearNav:function(e){
    var arr = this.data.search;arr.splice(e.currentTarget.id,1);
    wx.setStorage({
      key: 'storage',
      data: arr,
    })
    this.setData({
      search:arr
    })
  },

  choice:function(e){
    var value=this.data.list.splice(e.currentTarget.id,1);
    this.setData({
      search2:value,
      list:[]
    })
  },

  clearAll:function(){
    this.setData({
      search:[]
    })
    wx.clearStorage();
  },
  toMusic(){
    wx.navigateTo({
      url:'/pages/music/music?name='+this.data.data1,
    })
  }
})