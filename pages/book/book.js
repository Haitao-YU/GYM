// pages/category/category.js
Page({

  data: {
    houses: [{
      id: 0,
      name: "羽毛球馆",
      info: "注意事项:xxxxxxxx\n说明信息:xxxxx\n闭馆时间等,这里可以放最多三段内容",
      capacity: 200,
      needSite: true
    }, {
      id: 1,
      name: "乒乓球馆",
      info: "注意事项:xxxxxxxx\n说明信息:xxxxx\n闭馆时间等,这里可以放最多三段内容",
      capacity: 200,
      needSite: true
    }, {
      id: 2,
      name: "篮球馆",
      info: "注意事项:xxxxxxxx\n说明信息:xxxxx\n闭馆时间等,这里可以放最多三段内容",
      capacity: 200,
      needSite: false
    }, {
      id: 3,
      name: "田径馆",
      info: "注意事项:xxxxxxxx\n说明信息:xxxxx\n闭馆时间等,这里可以放最多三段内容",
      capacity: 200,
      needSite: false
    }, {
      id: 4,
      name: "网球馆",
      info: "注意事项:xxxxxxxx\n说明信息:xxxxx\n闭馆时间等,这里可以放最多三段内容",
      capacity: 200,
      needSite: true
    }, {
      id: 5,
      name: "健身房",
      info: "注意事项:xxxxxxxx\n说明信息:xxxxx\n闭馆时间等,这里可以放最多三段内容",
      capacity: 200,
      needSite: false
    }]
  },

  choosed: function (e) {
    const house = this.data.houses[e.currentTarget.dataset.index];
    // 需要选择场地的馆
    if (house.needSite) {
      wx.navigateTo({
        url: '../chooseTimeAndSite/chooseTimeAndSite?id=' + house.id + '&name=' + house.name
      })
    } else {
      // 无需选择场地,直接选择时间的馆,跳转至选择时间界面
      wx.navigateTo({
        url: '../chooseTime/chooseTime?id=' + house.id + '&name=' + house.name
      })
    }
  }
})