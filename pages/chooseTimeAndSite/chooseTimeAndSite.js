const util = require('../../utils/util.js')

Page({
  data: {
    /**
     * 来自服务器的数据
     */
    dayArr: [], //可选日期数组 ['2020-12-09','2020-12-10','2020-12-11']
    siteArr: ['A区', 'B区', 'C区'], //可选区域数组 ['A区','B区','C区']
    timeQuantumArr: [ //可选时间段数组 [['06:00', '07:00'],['09:00', '11:00'],['12:00', '14:00'],['16:00', '20:00']]
      ['06:00', '08:00'],
      ['08:00', '12:00'],
      ['12:00', '16:00'],
      ['16:00', '20:00']
    ],
    bookingOptionArr: [{ //指定日期、区域、时间段下的预约选项
      startTime: '06:00', // 开始时间
      endTime: '08:00', // 结束时间
      site: 'A区',
      capacity: 30, // 总容量
      remainingPlaces: 0 // 剩余名额
    }, {
      startTime: '09:00', // 开始时间
      endTime: '12:00', // 结束时间
      site: 'C区',
      capacity: 40, // 总容量
      remainingPlaces: 0 // 剩余名额
    }, {
      startTime: '13:30', // 开始时间
      endTime: '15:00', // 结束时间
      site: 'B区',
      capacity: 30, // 总容量
      remainingPlaces: 12 // 剩余名额
    }, {
      startTime: '15:30', // 开始时间
      endTime: '17:00', // 结束时间
      site: 'B区',
      capacity: 30, // 总容量
      remainingPlaces: 12 // 剩余名额
    }],
    bookingOptionArrToShow: [],
    /**
     * 本地数据
     */
    show: false, //控制下拉列表的显示隐藏
    filterConditionArr: ['全部', '筛选场地', '筛选时间段'], //筛选条件数组
    siteOrTimeQuantumArr: [], // 可选择时间段或者区域的数组,当筛选条件改变,该数组随之改变
    indexOfCondition: 0, // 选择的筛选条件下标
    indexOfDay: 0, // 选择的日期下标
    indexOfSiteOrTimeQuantum: 0, // 选择的区域或时间段下标

    house: { // 指定预约的场馆是什么,由上层页面传入该参数
      id: null,
      name: null,
    },
  },

  handleDayChange: function (e) {
    const indexOfDay = Number(e.detail.value);
    console.log(indexOfDay)
    this.setData({
      indexOfDay: indexOfDay
    })
    // TODO 向后台请求选择日期的当天时间段情况
    let bookingOptionArr;
    if (indexOfDay === 0) {
      bookingOptionArr = [{
        startTime: '06:00', // 开始时间
        endTime: '08:00', // 结束时间
        site: 'A区',
        capacity: 30, // 总容量
        remainingPlaces: 0 // 剩余名额
      }, {
        startTime: '09:00', // 开始时间
        endTime: '12:00', // 结束时间
        site: 'A区',
        capacity: 40, // 总容量
        remainingPlaces: 0 // 剩余名额
      }, {
        startTime: '13:30', // 开始时间
        endTime: '15:00', // 结束时间
        site: 'A区',
        capacity: 30, // 总容量
        remainingPlaces: 1 // 剩余名额
      }, {
        startTime: '13:30', // 开始时间
        endTime: '15:00', // 结束时间
        site: 'B区',
        capacity: 30, // 总容量
        remainingPlaces: 12 // 剩余名额
      }, {
        startTime: '15:30', // 开始时间
        endTime: '17:00', // 结束时间
        site: 'B区',
        capacity: 30, // 总容量
        remainingPlaces: 12 // 剩余名额
      }]
    } else if (indexOfDay === 1) {
      bookingOptionArr = [{
        startTime: '06:00',
        endTime: '08:00',
        site: 'A区',
        capacity: 30,
        remainingPlaces: 3
      }, {
        startTime: '09:00',
        endTime: '12:00',
        site: 'A区',
        capacity: 40,
        remainingPlaces: 0
      }, {
        startTime: '13:30',
        endTime: '15:00',
        site: 'A区',
        capacity: 30,
        remainingPlaces: 12
      }, {
        startTime: '13:30', // 开始时间
        endTime: '15:00', // 结束时间
        site: 'B区',
        capacity: 30, // 总容量
        remainingPlaces: 12 // 剩余名额
      }, {
        startTime: '15:30', // 开始时间
        endTime: '17:00', // 结束时间
        site: 'B区',
        capacity: 30, // 总容量
        remainingPlaces: 12 // 剩余名额
      }]
    } else if (indexOfDay === 2) {
      bookingOptionArr = [{
        startTime: '06:00',
        endTime: '08:00',
        site: 'A区',
        capacity: 30,
        remainingPlaces: 12
      }, {
        startTime: '09:00',
        endTime: '12:00',
        site: 'A区',
        capacity: 40,
        remainingPlaces: 40
      }, {
        startTime: '13:30',
        endTime: '15:00',
        site: 'A区',
        capacity: 30,
        remainingPlaces: 22
      }, {
        startTime: '13:30', // 开始时间
        endTime: '15:00', // 结束时间
        site: 'B区',
        capacity: 30, // 总容量
        remainingPlaces: 12 // 剩余名额
      }, {
        startTime: '15:30', // 开始时间
        endTime: '17:00', // 结束时间
        site: 'B区',
        capacity: 30, // 总容量
        remainingPlaces: 12 // 剩余名额
      }]
    }
    this.setData({
      bookingOptionArr: bookingOptionArr
    })

    // 重置筛选条件,并返回结果
    this.setData({
      indexOfCondition: 0,
      indexOfDay: 0,
      indexOfSiteOrTimeQuantum: 0,
    })
    this.doFilterToUpdateBookingOptionArrToShow();
  },

  bindSiteOrTimeQuantumChange: function (e) {
    this.setData({
      indexOfSiteOrTimeQuantum: e.detail.value
    })
    this.doFilterToUpdateBookingOptionArrToShow();
  },

  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show,
    });
  },

  // 点击下拉列表
  optionTap(e) {
    const indexOfCondition = e.currentTarget.dataset.index;
    this.setData({
      indexOfCondition: indexOfCondition,
      show: !this.data.show,
      indexOfSiteOrTimeQuantum: 0
    });
    if (indexOfCondition === 0) {
      this.setData({
        siteOrTimeQuantumArr: []
      })
    } else if (indexOfCondition === 1) {
      this.setData({
        siteOrTimeQuantumArr: this.data.siteArr
      })
    } else if (indexOfCondition === 2) {
      this.setData({
        siteOrTimeQuantumArr: this.data.timeQuantumArr
      })
    } else {
      throw "optionTap函数参数出错";
    }
    // 根据当前选项进行筛选
    this.doFilterToUpdateBookingOptionArrToShow();
  },


  // 筛选,根据当前条件更新 bookingOptionArrToShow
  doFilterToUpdateBookingOptionArrToShow: function () {
    const indexOfCondition = this.data.indexOfCondition;
    if (indexOfCondition === 0) { // 无需筛选
      this.setData({
        bookingOptionArrToShow: this.data.bookingOptionArr
      })
      return;
    } else { // 需要筛选
      const resultOption = [];
      const arr = this.data.siteOrTimeQuantumArr;
      const index = this.data.indexOfSiteOrTimeQuantum;
      if (indexOfCondition === 1) { // 筛选场地条件
        for (const option of this.data.bookingOptionArr) {
          if (option.site == arr[index]) {
            resultOption.push(option);
          }
        }
      } else if (indexOfCondition === 2) { // 筛选时间段条件
        for (const option of this.data.bookingOptionArr) {
          if (option.startTime >= arr[index][0] && option.endTime <= arr[index][1]) {
            resultOption.push(option);
          }
        }
      } else {
        throw "函数执行异常";
      }
      this.setData({
        bookingOptionArrToShow: resultOption
      })
    }
  },








  /**
   * 预定
   */
  book: function (e) {
    console.log(e);
    const option = this.data.bookingOptionArrToShow[e.currentTarget.dataset.index];
    if (option.remainingPlaces === 0) {
      wx.showToast({
        title: '名额不足',
        icon: 'none',
        duration: 500
      })
      return;
    }

    const name = this.data.house.name;
    const day = this.data.dayArr[this.data.indexOfDay];
    wx.showModal({
      title: '确认预约？',
      content: name + ' ' + day + ' ' + option.startTime + '~' + option.endTime + ' ' + option.site,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
    this.setData({
      bookingOptionArrToShow: this.data.bookingOptionArr
    })
  }
})