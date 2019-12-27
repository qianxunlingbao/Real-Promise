// pages/addsong/addsong.js
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
      id:options.id
    })
    var that = this;
    wx.login({
      success: (res) => {
        if (res.code) {
          wx.request({
            url: 'https://b.qazwsxedcrfv.club/openID',
            method: "POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              code: res.code
            },
            success: (res) => {
              var id = res.data.openid;
              that.setData({
                user_id: id
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    this.confirm = this.selectComponent("#confirm");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {

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
  addMusic(e) {
    var name = e.detail.value.musicName;
    wx.request({
      url: 'http://www.badwoman.com.cn:8801/music',
      header: { 'content-type': 'application/json' },
      success: (res) => {
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].music_name == name) {
            var id3 = res.data.data[i].music_id;
            wx.request({
              url: `http://www.badwoman.com.cn:8807/lists/${this.data.user_id}`,
              header: { 'content-type': 'application/json' },
              success: (res) => {
                let id;
                for(var i = 0; i < res.data.data.length;i++){
                  if (res.data.data[i].list_id == this.data.id){
                    id = i;
                  }
                }
                var list = res.data.data[id];
                var arr3 = [];
                arr3.push(list.list_music1, list.list_music2, list.list_music3);
                function f(value) {
                  if (value != id3) {
                    return true;
                  } else {
                    return false;
                  }
                }
                for (var i = 0; i < arr3.length; i++) {
                  if (arr3.every(f)) {
                    if (list.list_count < 3) {
                      var count = list.list_count + 1;
                      wx.request({
                        url: `http://www.badwoman.com.cn:8809/addMusic/${count}/${list.list_id}/${id3}`,
                        header: { 'content-type': 'application/json' },
                        success: (res) => {
                          //重新渲染
                          var arr2 = [];
                          wx.request({
                            url: `http://www.badwoman.com.cn:8807/lists/${this.data.user_id}`,
                            header: { 'content-type': 'application/json' },
                            success: (res) => {
                              var musicList = res.data.data[id];
                              wx.request({
                                url: 'http://www.badwoman.com.cn:8801/music',
                                header: { 'content-type': 'application/json' },
                                success: (res) => {
                                  for (var i = 0; i < res.data.data.length; i++) {
                                    if (res.data.data[i].music_id == musicList.list_music1) {
                                      var name1 = res.data.data[i].music_name;
                                    }
                                    if (res.data.data[i].music_id == musicList.list_music2) {
                                      var name2 = res.data.data[i].music_name;
                                    }
                                    if (res.data.data[i].music_id == musicList.list_music3) {
                                      var name3 = res.data.data[i].music_name;
                                    }
                                  }
                                  arr2.push(name1, name2, name3);
                                  var arr3 = [];
                                  for (var i = 0; i < arr2.length; i++) {
                                    if (arr2[i] != undefined) {
                                      arr3.push(arr2[i]);
                                    }
                                  }
                                  this.setData({
                                    arr: arr3
                                  })
                                }
                              })
                              this.setData({
                                count: musicList.list_count,
                                name: musicList.list_name,
                                error: '',
                                error2: '添加成功!'
                              })
                            }
                          })
                          //重新渲染完成
                        }
                      })
                    } else {
                      this.setData({
                        error: '当前歌单的歌曲数量已达上限!(上限为3首)',
                        error2: ''
                      })
                    }
                  } else {
                    this.setData({
                      error: '此歌曲已在歌单内!',
                      error2: ''
                    })
                  }
                }
              }
            })
          } else {
            this.setData({
              error: '未找到要添加的歌曲!',
              error2: ''
            })
          }
        }
        this.setData({
          value: ''
        })
      }
    })
    

  },
  _error() {
    this.confirm.hideConfirm();
  },
  //确认事件
  _success() {
    this.confirm.hideConfirm();
  },
})