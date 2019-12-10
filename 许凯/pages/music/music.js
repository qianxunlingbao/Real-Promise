//index.js
//获取应用实例
var util = require('../../utils/util.js');
const app = getApp();
let backgroundAudioManger;

Page({
  data: {
    songTextList: [],  //存储歌词的列表
    activeIndex: 0,    //第几行歌词进行改变
    updistance: 0,      //歌词移动位置
    percent: 0,
    play: false,
    pause: true,
    flag:true,
    name:'',
    isFavorite: "false" ,  //收藏喜欢
    switchloop:1 ,   //循环播放和随机播放
    optionList: [ '收藏到歌单', '歌手', '专辑', '来源','音质'],
    value: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3908123244,3954293269&fm=26&gp=0.jpg',
    hideFlag: true,//true-隐藏  false-显示
    animationData: {},//
    listmusic: [],
  },
  // 点击选项
  getOption: function (e) {
    var that = this;
    var listmusic = that.data.listmusic
    app.globalData.s = e.currentTarget.dataset.value
    if (e.currentTarget.dataset.value == '收藏到歌单') {
      console.log(app.globalData.optionList)
      //listmusic = app.globalData.optionList
      listmusic = ['新建歌单', '我喜欢的音乐', '一号歌单', '二号歌单', 'key社歌单'];
      var time1 = setTimeout(function () {
        that.showModal();//调用动画--滑入
        clearTimeout(time1);
        time1 = null;
      }, 100)
      that.setData({
        optionList: listmusic,
        hideFlag: true
      })
      e.currentTarget.dataset.value == null
    }
    else {
      that.setData({
        optionList: app.globalData.optionList,
        hideFlag: true
      })
    }
  },
  //取消
  mCancel: function () {
    var that = this;
    that.hideModal();
  },
  // ----------------------------------------------------------------------modal
  // 显示遮罩层
  showModal: function () {
    console.log(app.globalData.optionList)
    var that = this;
    that.setData({
      hideFlag: false
    })
    // 创建动画实例
    var animation = wx.createAnimation({
      duration: 400,//动画的持续时间
      timingFunction: 'ease',//动画的效果 默认值是linear->匀速，ease->动画以低速开始，然后加快，在结束前变慢
    })
    this.animation = animation; //将animation变量赋值给当前动画
    var time1 = setTimeout(function () {
      that.slideIn();//调用动画--滑入
      clearTimeout(time1);
      time1 = null;
    }, 100)
  },
  // 隐藏遮罩层
  hideModal: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 400,//动画的持续时间 默认400ms
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.slideDown();//调用动画--滑出
    var time1 = setTimeout(function () {
      that.setData({
        hideFlag: true
      })
      clearTimeout(time1);
      time1 = null;
    }, 220)//先执行下滑动画，再隐藏模块

  },
  //动画 -- 滑入
  slideIn: function () {
    if (app.globalData.s == '收藏到歌单') {
      this.animation.translateY(-200).step() // 在y轴偏移，然后用step()完成一个动画
      this.setData({
        //动画实例的export方法导出动画数据传递给组件的animation属性
        animationData: this.animation.export()
      })
      app.globalData.s = null
    }
    else {
      this.animation.translateY(0).step() // 在y轴偏移，然后用step()完成一个动画
      this.setData({
        //动画实例的export方法导出动画数据传递给组件的animation属性
        animationData: this.animation.export()
      })
    }
  },
  //动画 -- 滑出
  slideDown: function () {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },



  musicChoose: function () {
    var that = this;
    var switchloop = that.data.switchloop;
    if (switchloop == 1) {
      app.globalData.playIndex = (app.globalData.playIndex == app.globalData.list.length - 1) ? 0 : app.globalData.playIndex + 1;
      //app.globalData.src = 'http://www.badwoman.com.cn:8802/music/' + app.globalData.list[app.globalData.playIndex].src + './mp3';
      //app.globalData.title = app.globalData.list[app.globalData.playIndex].music_name;
      that.setData({
        switchloop: 2
      })
    }
    //随机播放
    else if (switchloop == 2) {
      var listlength = app.globalData //列表存储歌曲数
      var listcurrent = app.globalData //获取列表当前歌曲ID
      var ranDom = Math.floor(Math.random()*listlength)
      if (ranDom!=listcurrent){
        app.globalData.playIndex = (app.globalData.playIndex == app.globalData.list.length - 1) ? 0 : app.globalData.playIndex + ranDom;
       // app.globalData.src = 'http://www.badwoman.com.cn:8802/music/' + app.globalData.list[app.globalData.playIndex].src + './mp3';
       // app.globalData.title = app.globalData.list[app.globalData.playIndex].music_name;
        that.setData({
          switchloop: 3
        })
      }
      else{
        app.globalData.playIndex = (app.globalData.playIndex == app.globalData.list.length - 1) ? 0 : app.globalData.playIndex + ranDom;
       // app.globalData.src = 'http://www.badwoman.com.cn:8802/music/' + app.globalData.list[app.globalData.playIndex].src + './mp3';
       // app.globalData.title = app.globalData.list[app.globalData.playIndex].music_name;
        that.setData({
          switchloop: 3
        })
      }
      
      
    }
    //单曲循环播放
    else if (switchloop == 3) {
      app.globalData.playIndex = (app.globalData.playIndex == app.globalData.list.length - 1) ? 0 : app.globalData.playIndex ;
      //app.globalData.src = 'http://www.badwoman.com.cn:8802/music/' + app.globalData.list[app.globalData.playIndex].src + './mp3';
      //app.globalData.title = app.globalData.list[app.globalData.playIndex].music_name;
      that.setData({
        switchloop: 1
      })
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    console.log(options);
    this.setData({
      name: app.globalData.title
    })
    this.setData({
      play: app.globalData.play,
      pause: app.globalData.pause
    })
    this.setData({
      percent: app.globalData.percent
    })
    var str;
        wx.request({
          url: app.globalData.txt,
          success: (res) => {
            var str = res.data
            //去除，[]
            var result = str.split('\n').map(r => {
              var arr = r.trim().substr(1).split(']')
              return {
                time: arr[0],
                text: arr[1]
              }
            })
            this.setData({
              songTextList: result
            })
          }
        }),
    backgroundAudioManger = wx.getBackgroundAudioManager();
    backgroundAudioManger.title = app.globalData.title||'random';
    backgroundAudioManger.onTimeUpdate(() => {
      this.setData({
        percent: 1.0 * backgroundAudioManger.currentTime / backgroundAudioManger.duration * 100
      })
      app.globalData.timer = backgroundAudioManger.currentTime;
      app.globalData.percent=this.data.percent;
      //obj获取歌词的时间调用utils文件的util.js中的时间计算
      var obj = util.formatMs2Obj(app.globalData.timer)
      //str将时间的分钟和秒钟按照 分钟：秒钟 进行整合用于下一步跟歌词的比较
      var str = obj.minute + ":" + obj.second
      //str1将用于记录当前的数据用于与record比较
      var str1 = obj.minute + obj.second
      //记录上一秒时移动的次数 
      var record = app.globalData.record;
      //记录上一秒的时间（用于写下一个项目推出后再进入当前位置）
      var listenupdistance = app.globalData.listen;
      //小于歌词长度循环
      for (var i = 0; i < this.data.songTextList.length; i++) {
        //当时间与str相等时
        if (this.data.songTextList[i].time === str) {
          //确定行数
          if (this.data.activeIndex !== i) {
            //第i行歌词变色
            this.setData({
              activeIndex: i
            })
            app.globalData.record++ //全局记录时间秒数+1
            //出现向前移动拖拽时
            if (i < app.globalData.record) {
              app.globalData.record = i
              this.data.updistance += 70 * app.globalData.listen  //移动到初始位置
              app.globalData.listen = 0   //并将移动次数归零
              this.setData({
                updistance: this.data.updistance
              })
            }
            //当歌词长度超过一半时滚动
            if (i > 7) {
              app.globalData.listen++ //记录次数
              this.data.updistance -= 70  //移动向上一次
              this.setData({
                updistance: this.data.updistance
              })
            }
            break
          }
          this.data.songTextList
        }
      }

    })
    backgroundAudioManger.onEnded(() => {
      app.globalData.percent = 0;
      this.setData({
        play: false,
        pause: true
      })
    }
    )
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
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
        }
      })
    };
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onReady: function () {
    this.setData({
      name: app.globalData.title
    })
  },
  switchPause() {
    this.setData({
      play: true,
      pause: false
    });
    backgroundAudioManger.title = app.globalData.title;
    backgroundAudioManger.src = app.globalData.src; backgroundAudioManger.play();
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
  switchpre() {
    app.globalData.playIndex = (app.globalData.playIndex > 0) ? app.globalData.playIndex - 1 : app.globalData.list.length - 1;
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
  changeSlider(e) {
    console.log(e.detail);
    backgroundAudioManger.seek(e.detail / 100.0 * backgroundAudioManger.duration);
  },

  onReady: function () {
  },
  onUnload:function(){
    this.setData({
      percent:app.globalData.percent
    })
  },
  collect: function () {
    var that = this;
    var isFavorite = that.data.isFavorite;
    //收藏
    if (isFavorite == 'false') {
      var roomId = that.data.roomId;
      that.setData({
        isFavorite: 'true'
      })
      wx.showToast({
        title: '收藏成功',
        icon: 'none'
      })
    }
    //取消收藏
    else if (isFavorite == 'true') {
      var roomId = that.data.roomId;
      that.setData({
        isFavorite: 'false'
      })
      wx.showToast({
        title: '取消成功',
        icon: 'none'
      })
    }
    
  },

  onShareAppMessage: function (options) {
    return {
      title: "你若成风",
      path: '/pages/index/index', imgUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3362791289,712715179&fm=26&gp=0.jpg',

    }

  }
})