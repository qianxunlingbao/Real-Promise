//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //获取用户ID
    wx.login({
      success: (res)=>{
        if (res.code) {
          wx.request({
            url: 'http://www.badwoman.com.cn:8812/openID',
            method: "POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              code: res.code
            },
            success: (res)=>{
              var id=res.data.openid;
              //渲染
              wx.request({
                url: 'http://www.badwoman.com.cn:8803/musicUsers',
                success: (res) => {
                  function f(value) {
                    if (value != id) {
                      return true;
                    } else {
                      return false;
                    }
                  }
                  var arr = [];
                  for (var j = 0; j < res.data.data.length; j++) {
                    arr.push(res.data.data[j].user_id);
                  }
                  if (arr.every(f)) {
                    wx.request({
                      url: `http://www.badwoman.com.cn:8811/addUser2/${id}`,
                      success:(res)=>{
                        for (var j = 0; j < res.data.data.length; j++) {
                          wx.request({
                            url: 'http://www.badwoman.com.cn:8803/musicUsers',
                            success: (res) => {
                              for (var i = 0; i < res.data.data.length; i++) {
                                if (res.data.data[i].user_id == id) {
                                  var user = res.data.data[i];
                                }
                              }
                              this.setData({
                                level: user.user_level,
                                word: user.user_word,
                                judge: user.user_ifvip,
                                id: user.user_id
                              })
                              if (this.data.judge == "不是") {
                                this.setData({
                                  src: '../../images/huiyuantequan.png'
                                })
                              } else {
                                this.setData({
                                  src: '../../images/huiyuantequan(1).png'
                                })
                              }
                            }
                          })
                        }
                      }
                    })
                  } else {
                    for (var j = 0; j < res.data.data.length; j++) {
                      wx.request({
                        url: 'http://www.badwoman.com.cn:8803/musicUsers',
                        success: (res) => {
                          for (var i = 0; i < res.data.data.length; i++) {
                            if (res.data.data[i].user_id == id) {
                              var user = res.data.data[i];
                            }
                          }
                          this.setData({
                            level: user.user_level,
                            word: user.user_word,
                            judge: user.user_ifvip,
                            id: user.user_id
                          })
                          if (this.data.judge == "不是") {
                            this.setData({
                              src: '../../images/huiyuantequan.png'
                            })
                          } else {
                            this.setData({
                              src: '../../images/huiyuantequan(1).png'
                            })
                          }
                        }
                      })
                    }
                  }
                }
              })
              //渲染完成
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
    //获取头像用户名
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      console.log(app.globalData.userInfo);
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(res);
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          console.log(res);
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  level:function(){
    wx.navigateTo({
      url: '/pages/level/level?id='+this.data.id
    })
  },

  message:function(){
    wx.navigateTo({
      url:'/pages/message/message?id='+this.data.id
    })
  },

  vipmusic:function(){
    if(this.data.judge=='不是'){
      wx.navigateTo({
        url:'/pages/error/error'
      })
    }else{
      wx.navigateTo({
        url:'/pages/vipmusic/vipmusic'
      })
    }
  },

  myMusicLists:function(){
    wx.navigateTo({
      url:'/pages/musicLists/musicLists?id='+this.data.id
    })
  },

  toVip:function(){
    wx.navigateTo({
      url: '/pages/vip/vip?id='+this.data.id
    })
  }
})
