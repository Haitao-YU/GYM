const util = require('../../utils/util.js')

Page({
  data: {
    house: {
      id: null,
      name: null,
    }, // 预约的场馆,由上层页面传入参数
    dayIndex: 0, // 选择的日期 索引
    dayArr: new Array(), // 日期选项 
    ///////////////////////////////////////////////
    ///////// 一天中的各个时间段情况 ////////////////
    ///////////////////////////////////////////////
    timeQuantums: [{
      startTime: '06:00', // 开始时间
      endTime: '08:00', // 结束时间
      capacity: 30, // 总容量
      remainingPlaces: 0 // 剩余名额
    }, {
      startTime: '09:00', // 开始时间
      endTime: '12:00', // 结束时间
      capacity: 40, // 总容量
      remainingPlaces: 0 // 剩余名额
    }, {
      startTime: '13:30', // 开始时间
      endTime: '15:00', // 结束时间
      capacity: 30, // 总容量
      remainingPlaces: 12 // 剩余名额
    }]
  },
  bindDayChange: function (e) {
    const value = Number(e.detail.value);
    console.log(value)
    this.setData({
      dayIndex: value
    })
    // TODO 向后台请求选择日期的当天时间段情况
    let newTimeQuantums;
    if (value === 0) {
      newTimeQuantums = [{
        startTime: '06:00', // 开始时间
        endTime: '08:00', // 结束时间
        capacity: 30, // 总容量
        remainingPlaces: 0 // 剩余名额
      }, {
        startTime: '09:00', // 开始时间
        endTime: '12:00', // 结束时间
        capacity: 40, // 总容量
        remainingPlaces: 0 // 剩余名额
      }, {
        startTime: '13:30', // 开始时间
        endTime: '15:00', // 结束时间
        capacity: 30, // 总容量
        remainingPlaces: 1 // 剩余名额
      }]
    } else if (value === 1) {
      newTimeQuantums = [{
        startTime: '06:00',
        endTime: '08:00',
        capacity: 30,
        remainingPlaces: 3
      }, {
        startTime: '09:00',
        endTime: '12:00',
        capacity: 40,
        remainingPlaces: 0
      }, {
        startTime: '13:30',
        endTime: '15:00',
        capacity: 30,
        remainingPlaces: 12
      }]
    } else if (value === 2) {
      newTimeQuantums = [{
        startTime: '06:00',
        endTime: '08:00',
        capacity: 30,
        remainingPlaces: 12
      }, {
        startTime: '09:00',
        endTime: '12:00',
        capacity: 40,
        remainingPlaces: 40
      }, {
        startTime: '13:30',
        endTime: '15:00',
        capacity: 30,
        remainingPlaces: 22
      }]
    }

    this.setData({
      timeQuantums: newTimeQuantums
    })
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    // 获取上级页面传递的数据,得知当前是什么house的预约界面
    if (options.id !== undefined && options.name !== undefined) {
      this.setData({
        house: {
          id: options.id,
          name: options.name
        }
      })
    }
    // TODO: 向服务器询问最多提前n天预约
    const n = 3; // TODO
    var dayArr = this.data.dayArr;
    for (let i = 0; i < n; i++) {
      dayArr.push(util.formatTime(new Date(new Date().getTime() + 86400000 * i)).toString());
    }
    this.setData({
      dayArr: dayArr
    })
  },
})