// pages/listdetail/listdetail.js
const app = getApp();
let backgroundAudioManger;
const regeneratorRuntime = require('../../utils/runtime.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    percent: 0,
    play: false,
    pause: true,
    showActionsheet: false,
    groups: [
      { text: '删除该歌曲', value: 1 },
      { text: '添加歌曲', value: 2 },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function (options) {
  
      var that = this;
      this.setData({
        id: options.id
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
              this.setData({
                user_id: res.data.openid
              })
              //渲染
              wx.request({
                url: `http://www.badwoman.com.cn:8807/lists/${id}`,
                header: { 'content-type': 'application/json' },
                success: (res) => {
                  let uid;
                  for (var i = 0; i < res.data.data.length; i++) {
                    if (res.data.data[i].list_id == this.data.id) {
                      uid = i;
                    }
                  }
                  var list = res.data.data[uid];
                  var arr = [];
                  arr.push(list.list_music1, list.list_music2, list.list_music3);
                  function removeEmpty(arr) {
                    for (var i = 0; i < arr.length; i++) {
                      if (arr[i] == "" || typeof (arr[i]) == "undefined") {
                        arr.splice(i, 1);
                        i = i - 1; // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位
                      }
                    }
                    return arr;
                  };

                  wx.request({
                    url: 'http://www.badwoman.com.cn:8801/music',
                    success: (res) => {
                      let secondlist = res.data.data;
                      app.globalData.list = removeEmpty(arr.map((item) => item > 0 ? { music_name: secondlist[item - 1].music_name, music_author: secondlist[item - 1].music_author, music_value: secondlist[item - 1].music_value, music_id: item } : ''));
                      that.setData({
                        list: app.globalData.list
                      })
                    }
                  })



                }
              })
              //渲染完成
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  
    
    //实例化背景音频
    backgroundAudioManger = wx.getBackgroundAudioManager();
    backgroundAudioManger.title = 'random';
    backgroundAudioManger.src = 'random';

    //监听播放停止，将进度条归0
    backgroundAudioManger.onStop(() => {
      app.globalData.percent = 0;
    })
    //监听播放结束
    backgroundAudioManger.onEnded(() => {
      app.globalData.percent = 0;
      this.setData({
        play: false,
        pause: true
      })
    }
    )
    //监听播放进度
    backgroundAudioManger.onTimeUpdate(() => {
      app.globalData.currentTime = backgroundAudioManger.currentTime;
      app.globalData.duration = backgroundAudioManger.duration;
      app.globalData.percent = 1.0 * backgroundAudioManger.currentTime / backgroundAudioManger.duration * 100;
      this.setData({
        percent: app.globalData.percent
      })
    })
    var that = this;
    this.setData({
      play: app.globalData.play,
      pause: app.globalData.pause,
    })
    this.setData({
      play: app.globalData.play,
      pause: app.globalData.pause,
      percent: app.globalData.percent
    })
    
    setTimeout(() => {
      that.setData({
        name: app.globalData.title
      });
      
    }, 1000)

   
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
  switchPause() {
    this.setData({
      play: true,
      pause: false,
      name: app.globalData.title
    });
    backgroundAudioManger.title = app.globalData.title;
    backgroundAudioManger.src = app.globalData.src; backgroundAudioManger.pause();
    backgroundAudioManger.play();
    app.globalData.play = true;
    app.globalData.pause = false;

  },
  switchPlay() {
    backgroundAudioManger.pause();
    this.setData({
      play: false,
      pause: true
    });
    app.globalData.play = false;
    app.globalData.pause = true;
  },
  switchnext() {
    app.globalData.playIndex = (app.globalData.playIndex == app.globalData.list.length - 1) ? 0 : app.globalData.playIndex + 1;
    app.globalData.src = app.globalData.list[app.globalData.playIndex].music_value;
    app.globalData.title = app.globalData.list[app.globalData.playIndex].music_name;
    app.globalData.txt = 'http://www.badwoman.com.cn:8802/musicword/' + app.globalData.list[app.globalData.playIndex].music_id + '.txt';

    this.setData({
      play: true,
      pause: false,
      name: app.globalData.title
    });
    backgroundAudioManger.title = app.globalData.title;
    backgroundAudioManger.src = app.globalData.src; backgroundAudioManger.play();
    app.globalData.play = true;
    app.globalData.pause = false;
  },
  switchpre() {
    app.globalData.playIndex = (app.globalData.playIndex > 0) ? app.globalData.playIndex - 1 : app.globalData.list.length - 1;
    app.globalData.src = app.globalData.list[app.globalData.playIndex].music_value;
    app.globalData.title = app.globalData.list[app.globalData.playIndex].music_name;
    app.globalData.txt = 'http://www.badwoman.com.cn:8802/musicword/' + app.globalData.list[app.globalData.playIndex].music_id + '.txt';
    this.setData({
      play: true,
      pause: false,
      name: app.globalData.title
    });
    backgroundAudioManger.title = app.globalData.title;
    backgroundAudioManger.src = app.globalData.src; backgroundAudioManger.play();
    app.globalData.play = true;
    app.globalData.pause = false;
  },
  playthis:function(e){
    app.globalData.src = this.data.list[e.currentTarget.id].music_value;
    app.globalData.title = this.data.list[e.currentTarget.id].music_name;
    app.globalData.txt = 'http://www.badwoman.com.cn:8802/musicword/' + this.data.list[e.currentTarget.id].music_id + '.txt';
    this.switchPause();
  },
  toMusic: function () {
    wx.navigateTo({
      url: '/pages/music/music',
    })
  },
  manager:function(e){
    this.setData({
      showActionsheet: true,
      target: e.currentTarget.id
    })
  },
  close: function () {
    this.setData({
      showActionsheet: false
    })
  },
  btnClick(e) {
    var that = this;
    this.close();
    if (e.detail.value == 1) {
      wx.request({
        url: `http://www.badwoman.com.cn:8807/lists/${this.data.user_id}`,
        success: (res) => {
          let uid;
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].list_id == this.data.id) {
              uid = i;
            }
          }
          var list = res.data.data[uid];
          var count2 = list.list_count - 1;
          var music = [];
          music.push(list.list_music1, list.list_music2, list.list_music3);
          music.splice(this.data.target, 1);
          music.push(0);
          wx.request({
            url: `http://www.badwoman.com.cn:8809/deleteMusic/${count2}/${music[0]}/${music[1]}/${music[2]}/${list.list_id}`,
          })
          var result = this.data.list;
          result.splice(this.data.target,1);
          this.setData({
            list:result
          })
        }
      })
    }else if(e.detail.value==2){
      wx.navigateTo({
        url: '/pages/addsong/addsong?id='+this.data.id,
      })
    }
   
  }
})