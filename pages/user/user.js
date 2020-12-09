// pages/user/user.js
Page({
  data: {
    headImage: '../../images/default-head.png', // ../../images/head-portrait.jpg
    user: {
      id: null,
      name: null
    },
  },
  /**
   * 前往登录界面
   */
  tapToLogin: function (e) {
    if (this.data.user.id === null || this.data.user.data === null) {
      wx.navigateTo({
        url: "../login/login"
      })
    }
  },
  /**
   * 退出登录
   */
  logout: function (e) {
    if (this.data.user.id === null || this.data.user.name === null) {
      return;
    }
    const that = this;
    wx.showModal({
      title: '提示',
      content: '确认退出？',
      success(res) {
        if (res.confirm) {
          that.setData({
            user: {
              id: null,
              name: null
            }
          })
        }
      }
    })
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    // 获取登录界面传来的用户参数
    if (options.user !== undefined) {
      this.setData({
        user: JSON.parse(options.user)
      })
    }
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

  }
})