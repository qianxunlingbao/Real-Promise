Page({
  data: {
    TodayList: [],
    Today: "",
    input: ""
  },
  save: function () {
    wx.setStorageSync('TodayList', this.data.TodayList);
  },
  loadData: function () {
    var todo = wx.getStorageSync('TodayList');
    if (todo) {
      this.setData({
        TodayList: todo
      });
    }
  },
  AddInput: function (e) {
    this.setData({
      input: e.detail.value
    });
  },
  toggleTodoHandle: function (e) {
    var todo = this.data.TodayList;
    var index = e.currentTarget.id;
    this.setData({
      TodayList: todo
    });
    this.save();
  },
  AddConfirm: function (e) {
    var that = this;
    var todo = this.data.TodayList;
    todo.push({ description: this.data.input, completed: false })
    that.setData({ TodayList: todo, input: '' });
    console.log(this.data.TodayList)
    this.save();
  },
  removeTodoHandle: function (e) {
    var todo = this.data.TodayList;
    var index = e.currentTarget.id;
    todo.splice(index, 1);
    console.log(todo);
    this.setData({
      TodayList: todo
    });
    this.save();
  },
  onLoad: function (options) {
 },
  onReady: function () {
  },
  onShow: function () {
  },
  onHide: function () {
  },
  onUnload: function () {
  },
  onPullDownRefresh: function () {
  },
  onReachBottom: function () {
  },
  onShareAppMessage: function () {
  }
})