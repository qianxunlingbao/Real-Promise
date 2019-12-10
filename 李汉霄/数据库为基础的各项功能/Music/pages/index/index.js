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
    wx.request({
      url: 'http://www.badwoman.com.cn:8811/user',
      success: (res) => {
        for(var j=0;j<res.data.data.length;j++){
          if(res.data.data[j].ifchoice=='选中'){
            var id=res.data.data[j].user_id;
          }
        }
        wx.request({
          url: 'http://www.badwoman.com.cn:8803/musicUsers',
          success: (res) => {
            for (var i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].user_id == id) {
                var user = res.data.data[i];
              }
            }
            console.log(user);
            this.setData({
              level: user.user_level,
              word: user.user_word,
              judge: user.user_ifvip,
              id:user.user_id
            })
            if(this.data.judge=="不是"){
              this.setData({
                src:'../../images/huiyuantequan.png'
              })
            }else{
              this.setData({
                src:'../../images/huiyuantequan(1).png'
              })
            }
          }
        })
      }
    })
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
      url: '/pages/level/level'
    })
  },

  message:function(){
    wx.navigateTo({
      url:'/pages/message/message'
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
      url:'/pages/musicLists/musicLists'
    })
  },

  choiceUser:function(){
    wx.navigateTo({
      url: '/pages/choiceUser/choiceUser'
    })
  },

  toVip:function(){
    wx.navigateTo({
      url: '/pages/vip/vip'
    })
  }
})
