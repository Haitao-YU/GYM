// pages/login/login.js
const util = require('../../utils/util.js');
const app = getApp();

Page({
  data: {
    id: '',
    password: ''
  },

  /**
   * 点击按钮或软键盘确认后登录账号
   */
  handleLogin: function (e) {
    const that = this;
    const id = this.data.id;
    const password = this.data.password;

    // 前置检查
    if (id === '' || password === '') {
      wx.showToast({
        title: "用户名和密码不能为空",
        icon: "none",
      })
      return;
    }
    // 向服务器发送请求
    wx.request({
      url: app.grobalData.serverAddress + "/login/",
      method: "post",
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: Number(id),
        password: password.toString()
      },
      success(ret) {
        console.log(ret);
        if (ret.data.code === 201) {
          wx.showToast({
            title: "用户名不存在",
            icon: "none",
          })
          that.setData({
            id: ''
          })
        } else if (ret.data.code === 202) {
          wx.showToast({
            title: "密码错误",
            icon: "none",
          })
          that.setData({
            password: ''
          })
        } else {
          // 携带用户对象参数跳转到 '我的' 页面
          wx.reLaunch({
            url: '../user/user?user=' + JSON.stringify({
              id: ret.data.data.id,
              name: ret.data.data.name
            })
          })
        }
      },
      fail(ret) {
        wx.showToast({
          title: "服务器异常",
          icon: "loading",
        })
      }
    })
  },

  /**
   * 点击跳转注册账号
   */
  tapToRegister: function (e) {
    wx.navigateTo({
      url: '../register/register',
    })
  },

  /**
   * 点击跳转找回密码
   */
  tapToFindPassword: function (e) {
    wx.navigateTo({
      url: '../findPassword/findPassword',
    })
  },

  /**
   * 输入框监听统一接口
   */
  handleInput: function (e) {
    const name = e.currentTarget.dataset.name;
    const value = e.detail.value.replace(/\s+/g, '');
    this.setData({
      [name]: value
    })
  },

  onLoad: function (options) {

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