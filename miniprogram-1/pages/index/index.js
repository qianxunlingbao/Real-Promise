const app = getApp();
const regeneratorRuntime = require('../../utils/runtime.js')
let backgroundAudioManger;
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    percent:0,
    play:false,
    pause:true,
    count:0,
    length:0,
    showActionsheet: false,
    groups: [
      { text: '创建新歌单', value: 1 },
      { text: '歌单管理', value: 2 }
    ]
  },
  onLoad: function () {
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
                openid:id
              })
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
                      success: (res) => {
                       
                          wx.request({
                            url: 'http://www.badwoman.com.cn:8803/musicUsers',
                            success: (res) => {
                              for (var i = 0; i < res.data.data.length; i++) {
                                if (res.data.data[i].user_id == id) {
                                  var user = res.data.data[i];
                                }
                              }
                              that.setData({
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
                    })
                  } else {
                    wx.request({
                      url: `http://www.badwoman.com.cn:8807/lists/${id}`,
                      success: (res) => {
                        that.setData({
                          length: res.data.data == undefined ? 0 : res.data.data.length,
                          musiclist: res.data.data == undefined ? [] : res.data.data
                        })
                      }
                    })
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

    //实例化背景音频
    backgroundAudioManger = wx.getBackgroundAudioManager();
    backgroundAudioManger.title = 'random';
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

    /**
     * 获取当前设备的宽高
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  onReady:function(){
    //获得popup组件
    this.popup = this.selectComponent("#popup");
    this.confirm = this.selectComponent("#confirm");

  },
  onShow:function(){
    
    //刷新歌单
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
                openid: id
              })
              console.log(id);
              //渲染
              wx.request({
                url: `http://www.badwoman.com.cn:8807/lists/${id}`,
                header: { 'content-type': 'application/json' },
                success: (res) => {
                  that.setData({
                    length: res.data.data == undefined ? 0 : res.data.data.length,
                    musiclist: res.data.data == undefined ? [] : res.data.data
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
    });
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
      percent:app.globalData.percent
    })
    setTimeout(()=>{
      that.setData({
        name: app.globalData.title
      })
    },1000)
  },
  //  tab切换逻辑
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

switchPause(){
  this.setData({
    play: true,
    pause: false
  });
  backgroundAudioManger.title = app.globalData.title;
  backgroundAudioManger.src = app.globalData.src ;
  backgroundAudioManger.pause();
  backgroundAudioManger.play() ;
  app.globalData.play=true;
  app.globalData.pause=false;
  
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
  switchnext(){
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
  switchpre(){
    app.globalData.playIndex = (app.globalData.playIndex > 0) ? app.globalData.playIndex - 1 : app.globalData.list.length-1; 
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
    bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  tosearch:function(){
    wx.navigateTo({
      url: '/pages/search/search?play='+ this.data.play+'&pause='+this.data.pause,
    })
  },
  toMusic:function(){
    wx.navigateTo({
      url: '/pages/music/music',
    })
  },
  todetail:function(e){
     wx.navigateTo({
       url: '/pages/'+e.target.id+'/'+e.target.id,
     })
  },
  
  changeSlider:function(e){
    backgroundAudioManger.seek(e.detail/100*backgroundAudioManger.duration);
  },
  tolistdetail:function(e){
   wx.navigateTo({
     url: '/pages/listdetail/listdetail?id=' + e.currentTarget.id,
    })
  },
  onUnload:function(){
    this.setData({
      percent:app.globaData.percent
    })
  },
  showPopup() {
    this.popup.showPopup();
  },

  //取消事件
  _error() {
    this.popup.hidePopup();
  },
  error(){
    this.confirm.hideConfirm();
  },
  //确认事件
  success(){
    this.confirm.hideConfirm();
  },
  _success: async function (e) {
    try {
      var title = e.detail;
      var arr = this.data.musiclist.map((item) => item.list_name);
      if (arr.every((item) => {
        if (item == title) return false;
        else return true;
      })) {
        let uid = await new Promise((resolve, seject) => {
          let id;
          wx.request({
            url: 'http://www.badwoman.com.cn:8807/musicLists',
            header: { 'content-type': 'application/json' },
            success: (res) => {
              var arr = [];
              for (var i = 0; i < res.data.data.length; i++) {
                arr.push(res.data.data[i].list_id)
              }
              id = Math.max(...arr) + 1;
              wx.request({
                url: `http://www.badwoman.com.cn:8808/addList/${title}/${id}/${this.data.openid}`,
                header: { 'content-type': 'application/json' },
              })
              return resolve(id)
            }
          })
        })
        wx.navigateTo({
          url: '/pages/addsong/addsong?id=' + uid
        })

      } else {
        this.confirm.showConfirm();
      }
      this.setData({
        value:''
      })
      this.popup.hidePopup();



      
    } catch (err) {
      console.log(err);
    }
  }
  ,
  showsheet:function (){
    this.setData({
      showActionsheet: true
    })
  },
  close: function () {
    this.setData({
      showActionsheet: false
    })
  },
  btnClick(e) {
    this.close();
    if (e.detail.value == 1){
      this.popup.showPopup();
    }
    else if (e.detail.value == 2){
     wx.navigateTo({
       url: '/pages/listmanager/listmanager',
     })
    }
  }
})