// pages/listmanager/listmanager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sum:0,
    alter : '全选',
    all:false,
    deletelist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得popup组件
    this.popup = this.selectComponent("#popup");
    this.confirm = this.selectComponent("#confirm");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      sum:0,
      alter:'全选',
      all:'false'
    })
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
  choose:function(){
    if(this.data.alter == '全选'){
      let arr = this.data.musiclist.map((item)=>item.list_id);
      let length = this.data.musiclist.length;
      this.setData({
        alter:'取消全选',
        all:true,
        sum: length,
        deletelist:arr
      })
    }else if(this.data.alter == '取消全选'){
      this.setData({
        alter:'全选',
        all:false,
        sum:0,
        deletelist:[]
      })
    }
  },
  checkboxChange: function (e) {
    this.setData({
      sum:e.detail.value.length,
      deletelist:e.detail.value
    })
    if(e.detail.value.length==4){
      this.setData({
        alter:'取消全选'
      })
    }else{
      this.setData({
        alter: '全选'
      })
    }
  },
  delete:function(){
    if(this.data.sum == 0){
      this.popup.showPopup();
    }else{
      this.confirm.showConfirm();
    }
  },
  //取消事件
  _error() {
    this.popup.hidePopup();
  },
  error() {
    this.confirm.hideConfirm();
  } , 
  //成功回调 
  success(){
    var arr = [...this.data.deletelist];
    this.confirm.hideConfirm();
    for(var i = 0; i <arr.length;i++){
      wx.request({
        url: `http://www.badwoman.com.cn:8808/deleteList/${arr[i]}`,
        header: { 'content-type': 'application/json' },
      });
    }
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
    this.setData({
      sum:0,
      alter:'全选',
      all:false
    })
  }

})