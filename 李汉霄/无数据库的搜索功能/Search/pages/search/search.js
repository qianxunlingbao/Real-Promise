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

  clearInputEvent:function(){
    this.setData({
      search2:''
    })
  },

  somethingLikethis:function(e){
    var arr = [{
      musicId: '001',
      musicName: '你若成风'
    }, {
      musicId: '002',
      musicName: '我若成风'
    }, {
      musicId: '003',
      musicName: '不成风'
    }, {
      musicId: '004',
      musicName: '成个屁风'
    },{
      musicId: '005',
      musicName: '我不成'
    },{
      musicId: '006',
      musicName: '我不风'
    },{
      musicId: '007',
      musicName: '我不'
    }];
    var map=arr.map((item)=>{
      var reg = new RegExp(e.detail.value);
      var str=item.musicName.match(reg);
      if(str!=null){
        return item.musicName;
      }
    })
    for(var i=map.length-1;i>=0;i--){
      if(map[i]==undefined){
        map.splice(i,1);
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
    this.data.search.splice(e.currentTarget.id,1);
    this.setData({
      search:this.data.search
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
  }
})