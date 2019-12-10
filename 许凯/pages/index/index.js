const app = getApp();
let backgroundAudioManger;
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    percent:0,
    play:false,
    pause:true,
    name:''
  },
  onReady:function(){
    this.setData({
      name: app.globalData.title
    })
  },
  onShow:function(){
    this.setData({
      play: app.globalData.play,
      pause: app.globalData.pause,
      percent:app.globalData.percent
    })
  },
  onLoad: function () {
    this.setData({
      play:app.globalData.play,
      pause:app.globalData.pause,
    }),

    //实例化背景音频
    backgroundAudioManger = wx.getBackgroundAudioManager();
    backgroundAudioManger.title = 'random';
    //监听加载
    backgroundAudioManger.onWaiting(()=>{
      console.log('加载中');
    })
    backgroundAudioManger.onCanplay(() => {
      console.log('加载完成');
    })
    //监听播放停止，将进度条归0
    backgroundAudioManger.onStop(() => {
     app.globalData.percent = 0;
    })
    //监听播放进度
    backgroundAudioManger.onTimeUpdate(() => {
      app.globalData.currentTime = backgroundAudioManger.currentTime ;
      app.globalData.duration = backgroundAudioManger.duration;
      app.globalData.percent = 1.0 * backgroundAudioManger.currentTime / backgroundAudioManger.duration * 100;
      this.setData({
        percent: app.globalData.percent
      })
    })
    //监听开始跳转
    backgroundAudioManger.onSeeking(() => {
      console.log('开始跳转');
    })
    //监听跳转完成
    backgroundAudioManger.onSeeked(()=>{
      console.log('跳转完成');
      
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
    var that = this;

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
  backgroundAudioManger.src = app.globalData.src ; backgroundAudioManger.play() ;
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
    app.globalData.src = 'http://www.badwoman.com.cn:8802/music/' + app.globalData.list[app.globalData.playIndex].src + './mp3';
    app.globalData.title = app.globalData.list[app.globalData.playIndex].music_name;
    this.setData({
      play: true,
      pause: false
    });
    backgroundAudioManger.title = app.globalData.title;
    backgroundAudioManger.src = app.globalData.src; backgroundAudioManger.play();
    app.globalData.play = true;
    app.globalData.pause = false;
  },
  switchpre(){
    app.globalData.playIndex = (app.globalData.playIndex > 0) ? app.globalData.playIndex - 1 : app.globalData.list.length-1; 
    app.globalData.src = 'http://www.badwoman.com.cn:8802/music/'+app.globalData.list[app.globalData.playIndex].src+'./mp3';
    app.globalData.title = app.globalData.list[app.globalData.playIndex].music_name;
    this.setData({
      play: true,
      pause: false
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
  changeSlider:function(e){
    backgroundAudioManger.seek(e.detail/100*backgroundAudioManger.duration);
  },
  onHide:function(){
    console.log(app.globalData.play,app.globalData.pause);
  },
  onUnload:function(){
    this.setData({
      percent:app.globaData.percent
    })
  }
})