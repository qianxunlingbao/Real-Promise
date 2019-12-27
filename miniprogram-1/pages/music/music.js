//index.js
//获取应用实例
var util = require('../../utils/util.js');
const regeneratorRuntime = require('../../utils/runtime.js')
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
    flag: true,
    name: '',
    isFavorite: false,  //收藏喜欢
    switchloop: 1,   //循环播放和随机播放
    name:'',
    showActionsheet: false,
    groups: [
      { text: '蓝色背景', value: 1 },
      { text: '红色背景', value: 2 },
      { text: '粉色背景', value: 3 },
      { text: '浅蓝色背景', value: 4 },
      { text: '紫色背景', value: 5 },
      { text: '默认背景', value: 6 },

    ]
  },
  change(e) {
    console.log(1)


  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow:function(){
    var that = this;
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
    })
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
              //渲染
              wx.request({
                url: `http://www.badwoman.com.cn:8807/lists/${id}`,
                header: { 'content-type': 'application/json' },
                success: (res) => {
                  if (res.data.data != undefined){
                    let musiclist = res.data.data
                    for (var i = 0; i < musiclist.length; i++) {
                      if (musiclist[i].list_name == '我喜欢的音乐' && musiclist.list_count > 0) {
                        let num = i;
                        console.log(num);
                        wx.request({
                          url: 'http://www.badwoman.com.cn:8801/music',
                          header: { 'content-type': 'application/json' },
                          success: (res) => {
                            for (var j = 0; j < res.data.data.length; j++) {
                              if (res.data.data[j].music_name == app.globalData.title) {
                                var id3 = res.data.data[j].music_id;
                                wx.request({
                                  url: `http://www.badwoman.com.cn:8807/lists/${id}`,
                                  header: { 'content-type': 'application/json' },
                                  success: (res) => {
                                    if (res.data.data[num].list_music1 == id3 || res.data.data[num].list_music2 == id3 || res.data.data[num].list_music3 == id3) {
                                      that.setData({
                                        isFavorite: true
                                      })
                                    }
                                  }
                                })
                              }
                            }

                          }
                        })
                      } else if (musiclist[i].list_name == '我喜欢的音乐' && musiclist.list_count == 0) {
                        that.setData({
                          isFavorite: false
                        })
                      }

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
  },
  onLoad: function (options) {
    this.setData({
      backcolor:app.globalData.backcolor
    })
    var that = this;
    if(options.name != undefined){
      let i;
      for (i = 0; i < app.globalData.list.length; i++) {
        if (options.name == app.globalData.list[i].music_name) {
          app.globalData.playIndex = i;
          app.globalData.src = app.globalData.list[app.globalData.playIndex].music_value;
          app.globalData.title = app.globalData.list[app.globalData.playIndex].music_name;
          app.globalData.txt = 'http://www.badwoman.com.cn:8802/musicword/' + app.globalData.list[app.globalData.playIndex].music_id + '.txt';
        }
      }
      if (i == app.globalData.list.length && app.globalData.list[i - 1].music_name != options.name) {
        wx.request({
          url: 'http://www.badwoman.com.cn:8801/music',
          success: (res) => {
            for (var j = 0; j < res.data.data.length; j++) {
              if (res.data.data[j].music_name == options.name) {
                app.globalData.list.push(res.data.data[j]);
                app.globalData.playIndex = i;
                app.globalData.src = app.globalData.list[app.globalData.playIndex].music_value;
                app.globalData.title = app.globalData.list[app.globalData.playIndex].music_name;
                app.globalData.txt = 'http://www.badwoman.com.cn:8802/musicword/' + app.globalData.list[app.globalData.playIndex].music_id + '.txt';
              }
            }
          }
        })
      }

    }
    
    backgroundAudioManger = wx.getBackgroundAudioManager();
    backgroundAudioManger.title = app.globalData.title||'random';
    backgroundAudioManger.src = 'random';
    backgroundAudioManger.onTimeUpdate(() => {
      app.globalData.timer = backgroundAudioManger.currentTime;
      app.globalData.percent = 1.0 * backgroundAudioManger.currentTime / backgroundAudioManger.duration * 100;
      this.setData({
        percent: 1.0 * backgroundAudioManger.currentTime / backgroundAudioManger.duration * 100
      })
      //obj获取歌词的时间调用utils文件的util.js中的时间计算
      var obj = util.formatMs2Obj(app.globalData.timer)
      //str将时间的分钟和秒钟按照 分钟：秒钟 进行整合用于下一步跟歌词的比较
      var str = obj.minute + ":" + obj.second
      //str1将用于记录当前的数据用于与record比较
      var str1 = obj.minute + obj.second
      //获取从app.js全局变量，利用全局变量记录之前数据
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
              this.data.updistance -= 70 //移动向上一次
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
      if(app.globalData.type==1){
        that.switchnext();
      }else if(app.globalData.type == 2){
        that.switchPause();
      }else if(app.globalData.type == 3){
        if(Math.random()>0.5){
          that.switchnext()
        }else{
          that.switchpre();
        }
      }
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
  dis:function(){
    this.setData({
      isFavorite:false
    })
  }
  ,
  comment:function(){
    this.setData({
      showActionsheet:true
    })
  },
  switchnext() {
    var that = this;
    this.dis();
    app.globalData.playIndex = (app.globalData.playIndex == app.globalData.list.length - 1) ? 0 : app.globalData.playIndex + 1;
    app.globalData.src = app.globalData.list[app.globalData.playIndex].music_value;
    app.globalData.title = app.globalData.list[app.globalData.playIndex].music_name;
    app.globalData.txt = 'http://www.badwoman.com.cn:8802/musicword/' + app.globalData.list[app.globalData.playIndex].music_id + '.txt';
    this.setData({
      play: true,
      pause: false,
      name: app.globalData.title,
    });
    backgroundAudioManger.title = app.globalData.title;
    backgroundAudioManger.src = app.globalData.src; backgroundAudioManger.play();
    app.globalData.play = true;
    app.globalData.pause = false;
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
    })

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
              //渲染
              wx.request({
                url: `http://www.badwoman.com.cn:8807/lists/${id}`,
                header: { 'content-type': 'application/json' },
                success: (res) => {
                  if (res.data.data != undefined) {
                    let musiclist = res.data.data
                    for (var i = 0; i < musiclist.length; i++) {
                      if (musiclist[i].list_name == '我喜欢的音乐' && musiclist.list_count > 0) {
                        let num = i;
                        wx.request({
                          url: 'http://www.badwoman.com.cn:8801/music',
                          header: { 'content-type': 'application/json' },
                          success: (res) => {
                            for (var j = 0; j < res.data.data.length; j++) {
                              if (res.data.data[j].music_name == app.globalData.title) {
                                var id3 = res.data.data[j].music_id;

                                wx.request({
                                  url: `http://www.badwoman.com.cn:8807/lists/${id}`,
                                  header: { 'content-type': 'application/json' },
                                  success: (res) => {
                            
                                    if (res.data.data[num].list_music1 == id3 || res.data.data[num].list_music2 == id3 || res.data.data[num].list_music3 == id3) {
                                      that.setData({
                                        isFavorite: true
                                      })
                                    }
                                  }
                                })
                              }
                            }

                          }
                        })
                      } else if (musiclist[i].list_name == '我喜欢的音乐' && musiclist.list_count == 0){
                        that.setData({
                          isFavorite: false
                        })
                      }

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
  },
  switchpre() {
    this.dis();
    var that = this;
    app.globalData.playIndex = (app.globalData.playIndex > 0) ? app.globalData.playIndex - 1 : app.globalData.list.length - 1;
    app.globalData.list[app.globalData.playIndex].music_value;
    app.globalData.title = app.globalData.list[app.globalData.playIndex].music_name;
    app.globalData.txt = 'http://www.badwoman.com.cn:8802/musicword/' + app.globalData.list[app.globalData.playIndex].music_id + '.txt';
    this.setData({
      play: true,
      pause: false,
      name: app.globalData.title,
    });
    backgroundAudioManger.title = app.globalData.title;
    backgroundAudioManger.src = app.globalData.src; backgroundAudioManger.play();
    app.globalData.play = true;
    app.globalData.pause = false;
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
    })
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
              //渲染
              wx.request({
                url: `http://www.badwoman.com.cn:8807/lists/${id}`,
                header: { 'content-type': 'application/json' },
                success: (res) => {
                  if (res.data.data != undefined) {
                    let musiclist = res.data.data
                    for (var i = 0; i < musiclist.length; i++) {
                      if (musiclist[i].list_name == '我喜欢的音乐' && musiclist.list_count > 0) {
                        let num = i;
                        wx.request({
                          url: 'http://www.badwoman.com.cn:8801/music',
                          header: { 'content-type': 'application/json' },
                          success: (res) => {
                            for (var j = 0; j < res.data.data.length; j++) {
                              if (res.data.data[j].music_name == app.globalData.title) {
                                var id3 = res.data.data[j].music_id;
                                wx.request({
                                  url: `http://www.badwoman.com.cn:8807/lists/${id}`,
                                  header: { 'content-type': 'application/json' },
                                  success: (res) => {
                                    if (res.data.data[num].list_music1 == id3 || res.data.data[num].list_music2 == id3 || res.data.data[num].list_music3 == id3) {
                                      that.setData({
                                        isFavorite: true
                                      })
                                    }
                                  }
                                })
                              }
                            }

                          }
                        })
                      } else if (musiclist[i].list_name == '我喜欢的音乐' && musiclist.list_count == 0) {
                        that.setData({
                          isFavorite: false
                        })
                      }

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
  },
  changeSlider(e) {
    backgroundAudioManger.seek(e.detail / 100.0 * backgroundAudioManger.duration);
  },

  
  a: function () {
    this.setData({ flag: true })
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
    if (isFavorite == false) {
      var roomId = that.data.roomId;
      that.setData({
        isFavorite: true
      })
      wx.showToast({
        title: '收藏成功',
        icon: 'none'
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
                var uid = res.data.openid;
                that.setData({
                  openid: uid
                })
                wx.request({
                  url: `http://www.badwoman.com.cn:8807/lists/${uid}`,
                  header: { 'content-type': 'application/json' },
                  success:async res => {
                    try{
                      let musiclist = (res.data.data == undefined ? [] : res.data.data);
                      let i = 0;
                      if (musiclist.length == 0) {
                        let id1 = await new Promise((resolve, reject) => {
                          wx.request({
                            url: 'http://www.badwoman.com.cn:8807/musicLists',
                            header: { 'content-type': 'application/json' },
                            success: (res) => {
                              var arr = [];
                              for (var i = 0; i < res.data.data.length; i++) {
                                arr.push(res.data.data[i].list_id)
                              }
                              let id = Math.max(...arr) + 1;
                              return resolve(id);
                            }
                          })
                        })
                        let title = '我喜欢的音乐'
                        wx.request({
                          url: `http://www.badwoman.com.cn:8808/addList/${title}/${id1}/${uid}`,
                          header: { 'content-type': 'application/json' },
                          success: async function (res) {
                            try {
                              let uid1 = id1;
                              let id3 = await new Promise((resolve, reject) => {
                                let id4;
                                wx.request({
                                  url: 'http://www.badwoman.com.cn:8801/music',
                                  header: { 'content-type': 'application/json' },
                                  success: (res) => {
                                    for (var num = 0; num < res.data.data.length; num++) {
                                      if (res.data.data[num].music_name == app.globalData.name) {
                                        id4 = res.data.data[num].music_id;
                                        return resolve(id4);
                                      }
                                    }
                                  }
                                })
                              })
                              wx.request({
                                url: `http://www.badwoman.com.cn:8809/addMusic/1/${uid1}/${id3}`,
                                header: { 'content-type': 'application/json' },
                              })
                            } catch (err) {
                              console.log(err);
                            }
                          }
                        })
                      }
                      else{
                        let targetid;
                        for(var i = 0; i < musiclist.length;i++){
                          if(musiclist[i].list_name == '我喜欢的音乐'){
                            targetid = musiclist[i].list_id;
                          }
                        }
                        wx.request({
                          url: 'http://www.badwoman.com.cn:8801/music',
                          header: { 'content-type': 'application/json' },
                          success: (res) => {
                            for (var i = 0; i < res.data.data.length; i++) {
                              if (res.data.data[i].music_name == app.globalData.name) {
                                var id3 = res.data.data[i].music_id;
                                wx.request({
                                  url: `http://www.badwoman.com.cn:8807/lists/${uid}`,
                                  header: { 'content-type': 'application/json' },
                                  success: (res) => {
                                    let id;
                                    for (var i = 0; i < res.data.data.length; i++) {
                                      if (res.data.data[i].list_id == targetid) {
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
                      }
                    }catch(e){console.log(e)}
                    
                }})}})}else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
    //取消收藏
    else if (isFavorite == true) {
      var roomId = that.data.roomId;
      that.setData({
        isFavorite: false
      })
      wx.showToast({
        title: '取消成功',
        icon: 'none'
      })
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
                wx.request({
                  url: `http://www.badwoman.com.cn:8807/lists/${id}`,
                  success: (res) => {
                    let uid;
                    for (var i = 0; i < res.data.data.length; i++) {
                      if (res.data.data[i].list_name == '我喜欢的音乐' && res.data.data[i].list_count > 0) {
                        uid = i;
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
                        result.splice(this.data.target, 1);
                        this.setData({
                          list: result
                        })
                      }
                    }
                    
                  }
                })
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      });
    }

  },
  close: function () {
    this.setData({
      showActionsheet: false
    })
  },
  btnClick(e) {
    this.close();
    if (e.detail.value == 1) {
      this.setData({
        backcolor:"url('https://i02piccdn.sogoucdn.com/92af1c4100fc1466')"
      })
      app.globalData.backcolor = "url('https://i02piccdn.sogoucdn.com/92af1c4100fc1466')";
    }else if (e.detail.value == 2) {
      this.setData({
        backcolor:"url('https://i03piccdn.sogoucdn.com/ccd1c5002c7fb8f2')"
      })
      app.globalData.backcolor = "url('https://i03piccdn.sogoucdn.com/ccd1c5002c7fb8f2')";
    }else if(e.detail.value == 3){
      this.setData({
        backcolor: "url('https://i04piccdn.sogoucdn.com/f54d7f5e1e8a2830')"
      })
      app.globalData.backcolor = "url('https://i04piccdn.sogoucdn.com/f54d7f5e1e8a2830')";
    } else if (e.detail.value == 4) {
      this.setData({
        backcolor: "url('https://i04piccdn.sogoucdn.com/124a583f224b37bd')"
      })
      app.globalData.backcolor = "url('https://i04piccdn.sogoucdn.com/124a583f224b37bd')";
    } else if (e.detail.value == 5) {
      this.setData({
        backcolor: "url('https://i02piccdn.sogoucdn.com/2eba69e5b1d904dc')"
      })
      app.globalData.backcolor = "url('https://i02piccdn.sogoucdn.com/2eba69e5b1d904dc')";
    }else if(e.detail.value == 5){
      this.setData({
        backcolor:"url('https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2092734177,601963171&fm=26&gp=0.jpg')"
      })
      app.globalData.backcolor = "url('https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2092734177,601963171&fm=26&gp=0.jpg')";
    }
  },
  musicChoose: function () {
    var that = this;
    var switchloop = that.data.switchloop;
    if (switchloop == 1) {
      that.setData({
        switchloop: 2
      })
      app.globalData.type = 2;
    }
    //随机播放
    else if (switchloop == 2) {
        that.setData({
          switchloop: 3
        })
        app.globalData.type = 3;
      }
    //单曲循环播放
    else if (switchloop == 3) {
      app.globalData.playIndex = (app.globalData.playIndex == app.globalData.list.length - 1) ? 0 : app.globalData.playIndex;
      //app.globalData.src = 'http://www.badwoman.com.cn:8802/music/' + app.globalData.list[app.globalData.playIndex].src + './mp3';
      //app.globalData.title = app.globalData.list[app.globalData.playIndex].music_name;
      that.setData({
        switchloop: 1
      })
    }
  },
},
  
)