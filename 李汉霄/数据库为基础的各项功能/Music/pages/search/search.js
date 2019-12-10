// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search2:'',
    list:[]
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
          url: `http://www.badwoman.com.cn:8810/searchHistory/${this.data.user_id}`,
          success: (res) => {
            if(res.data.status==-1){
              wx.request({
                url: 'http://www.badwoman.com.cn:8810/searchHistory',
                success:(res)=>{
                  var ids = [];
                  for (var k = 0; k < res.data.data.length; k++) {
                    ids.push(res.data.data[k].history_id)
                  }
                  this.setData({
                    history_id: Math.max(...ids) + 1
                  })
                  this.setData({
                    search: []
                  })
                }
              })
            }else{
              var ids=[];
              for (var k = 0; k < res.data.data.length; k++) {
                ids.push(res.data.data[k].history_id)
              }
              this.setData({
                history_id: Math.max(...ids) + 1
              })
              var arr = [];
              for (var i = 0; i < res.data.data.length; i++) {
                arr.push(res.data.data[i].history_name);
              }
              var hash = [];
              for (var j = 0; j < arr.length; j++) {
                if (hash.indexOf(arr[j]) == -1) {
                  hash.push(arr[j]);
                }
              }
              this.setData({
                search: hash
              })
            }
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
    var name=e.detail.value.userinput;
    wx.request({
      url: `http://www.badwoman.com.cn:8810/addHistory/${this.data.history_id}/${name}/${this.data.user_id}`,
      success: (res) => {
        //重新渲染
        wx.request({
          url: `http://www.badwoman.com.cn:8810/searchHistory/${this.data.user_id}`,
          success: (res) => {
            if (res.data.status == -1) {
              wx.request({
                url: 'http://www.badwoman.com.cn:8810/searchHistory',
                success: (res) => {
                  var ids = [];
                  for (var k = 0; k < res.data.data.length; k++) {
                    ids.push(res.data.data[k].history_id)
                  }
                  this.setData({
                    history_id: Math.max(...ids) + 1
                  })
                  this.setData({
                    search: []
                  })
                }
              })
            } else {
              var ids = [];
              for (var k = 0; k < res.data.data.length; k++) {
                ids.push(res.data.data[k].history_id)
              }
              this.setData({
                history_id: Math.max(...ids) + 1
              })
              var arr = [];
              for (var i = 0; i < res.data.data.length; i++) {
                arr.push(res.data.data[i].history_name);
              }
              var hash = [];
              for (var j = 0; j < arr.length; j++) {
                if (hash.indexOf(arr[j]) == -1) {
                  hash.push(arr[j]);
                }
              }
              this.setData({
                search: hash
              })
            }
            //跳转部分
            this.setData({
              search2: ''
            });
            function f(value) {
              if (value != name) {
                return true;
              } else {
                return false;
              }
            }
            wx.request({
              url: 'http://www.badwoman.com.cn:8801/music',
              success: (res) => {
                var arr2 = [];
                for (var i = 0; i < res.data.data.length; i++) {
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
          }
        })
      }
    })
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
        if(e.detail.value==''){
          this.setData({
            list:[]
          })
        }else{
          this.setData({
            list: map
          })
        }
      }
    });
  },

  clearLikethis:function(){
    this.setData({
      list:[]
    })
  },

  clearNav:function(e){
    var name3=this.data.search[e.target.id]
    wx.request({
      url: `http://www.badwoman.com.cn:8810/deleteHistory/${name3}/${this.data.user_id}`,
      success:(res)=>{
        //重新渲染
        wx.request({
          url: `http://www.badwoman.com.cn:8810/searchHistory/${this.data.user_id}`,
          success: (res) => {
            if (res.data.status == -1) {
              wx.request({
                url: 'http://www.badwoman.com.cn:8810/searchHistory',
                success: (res) => {
                  var ids = [];
                  for (var k = 0; k < res.data.data.length; k++) {
                    ids.push(res.data.data[k].history_id)
                  }
                  this.setData({
                    history_id: Math.max(...ids) + 1
                  })
                  this.setData({
                    search: []
                  })
                }
              })
            } else {
              var ids = [];
              for (var k = 0; k < res.data.data.length; k++) {
                ids.push(res.data.data[k].history_id)
              }
              this.setData({
                history_id: Math.max(...ids) + 1
              })
              var arr = [];
              for (var i = 0; i < res.data.data.length; i++) {
                arr.push(res.data.data[i].history_name);
              }
              var hash = [];
              for (var j = 0; j < arr.length; j++) {
                if (hash.indexOf(arr[j]) == -1) {
                  hash.push(arr[j]);
                }
              }
              this.setData({
                search: hash
              })
            }
          }
        })
      }
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
    wx.request({
      url: `http://www.badwoman.com.cn:8810/deleteAll/${this.data.user_id}`,
      success: (res) => {
        //重新渲染
        wx.request({
          url: `http://www.badwoman.com.cn:8810/searchHistory/${this.data.user_id}`,
          success: (res) => {
            if (res.data.status == -1) {
              wx.request({
                url: 'http://www.badwoman.com.cn:8810/searchHistory',
                success: (res) => {
                  var ids = [];
                  for (var k = 0; k < res.data.data.length; k++) {
                    ids.push(res.data.data[k].history_id)
                  }
                  this.setData({
                    history_id: Math.max(...ids) + 1
                  })
                  this.setData({
                    search: []
                  })
                }
              })
            } else {
              var ids = [];
              for (var k = 0; k < res.data.data.length; k++) {
                ids.push(res.data.data[k].history_id)
              }
              this.setData({
                history_id: Math.max(...ids) + 1
              })
              var arr = [];
              for (var i = 0; i < res.data.data.length; i++) {
                arr.push(res.data.data[i].history_name);
              }
              var hash = [];
              for (var j = 0; j < arr.length; j++) {
                if (hash.indexOf(arr[j]) == -1) {
                  hash.push(arr[j]);
                }
              }
              this.setData({
                search: hash
              })
            }
          }
        })
      }
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
  },

  hotWord:function(){
    wx.navigateTo({
      url: '/pages/hotword/hotword'
    })
  }
})