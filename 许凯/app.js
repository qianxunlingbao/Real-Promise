//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
   
  },
  onShow:function(){
    wx.request({
      url: 'http://www.badwoman.com.cn:8801/music',
      success: (res) => {
        this.globalData.list = res.data.data;
        this.globalData.playIndex = 0;
        this.globalData.src = 'http://www.badwoman.com.cn:8802/music/' + this.globalData.list[this.globalData.playIndex].music_id + '.mp3';
        this.globalData.title = this.globalData.list[this.globalData.playIndex].music_name;
        this.globalData.txt = 'http://www.badwoman.com.cn:8802/musicword/' + this.globalData.list[this.globalData.playIndex].music_id + '.txt';
      }
    })
  },
  globalData: {
    type:'',
    userInfo: null,
    playIndex: 0, //当前播放列表的index
    currentTime: 0, //当前播放时间
    duration: 0, //总时长
    percent:0,//进度条占比
    play:false,
    pause:true,
    recordclick:0,
    circle: 1,
    optionList: ['收藏到歌单', '歌手', '专辑', '来源', '音质'],
  },

})