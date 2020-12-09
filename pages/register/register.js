// pages/register/register.js
const app = getApp();

Page({
  data: {
    id: '',
    name: '',
    password: '',
    _password: ''
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
    if (name === '_password') {
      if (!this.data.password.startsWith(value)) {
        wx.showToast({
          title: "检测到两次密码输入不一致",
          icon: "none",
          duration: 500
        })
      }
    }
  },


  /**
   * 注册表单提交
   */
  handleRegister: function (e) {
    const id = this.data.id;
    const name = this.data.name;
    const password = this.data.password;
    const _password = this.data._password;
    if (id === '' || name === '' || password === '' || _password === '') {
      wx.showToast({
        title: "请填写全部信息",
        icon: "none"
      })
      return;
    }
    if (password !== _password) {
      wx.showToast({
        title: "两次密码输入不一致",
        icon: "none"
      })
      return;
    }
    // 向服务器发送请求
    wx.request({
      url: app.grobalData.serverAddress + "/register/",
      method: "post",
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: Number(id),
        name: name.toString(),
        password: password.toString()
      },
      success(ret) {
        console.log(ret);
        if (ret.data.code === 203) {
          wx.showToast({
            title: "账号已存在",
            icon: "none",
          })
          that.setData({
            id: ''
          })
        } else {
          // 注册成功跳转
          wx.reLaunch({
            url: '../login/login'
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
   * 生命周期函数--监听页面加载
   */
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