
Page({
  data: {
    array: [],
  },

  /*ceshifuwuqi: function () {*/
  onLoad: function () {
    var that = this
    wx.request({
      url: `http://www.badwoman.com.cn:8801/music`,
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "GET",
      success(result) {
       
        that.setData({
          demo: result.data.data,
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  },

})
