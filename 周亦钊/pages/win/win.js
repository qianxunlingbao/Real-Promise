Page({
  data: {
    // input默认是1  
    num: 1,
    num1:1,
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled'
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
  },
  /* 点击加号 */
  bindPlus1: function () {
    var num1 = this.data.num1;
    // 不作过多考虑自增1  
    num1++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus1 = num1 < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num1: num1,
      minusStatus1: minusStatus1
    });
  },
  /* 输入框事件 */
  bindManual1: function (e) {
    var num1 = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num1: num1
    });
  },
  clickTo: function () {
    wx.navigateTo({
      url: '../name/name',
    })
  }
}) 