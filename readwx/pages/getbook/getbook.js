// pages/getbook/getbook.js
Page({
  data: {
    getlist: [
      "第一章", "第二章", "第三章", "第四章", "第五章", "第六章", "第七章", "第八章", "第九章", "第十章", "第十一章", "第十二章", "第十三章", "第十四章", "第十五章", "第十六章", "第十七章", "第十八章", "第十九章", "第二十章", "第二十章", "第二十章", "第二十章", "第二十章",
    ],
    title:""
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "书籍详情"
    }),
    console.log(options.titled)
    this.setData({
      title: options.titled
    })
  },
  getzhang:function(ev){
    console.log(ev.currentTarget.dataset.index);
    console.log(this.data.title)
    var that = this;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export()

    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 200)

    
    wx.navigateTo({
      url: `/pages/logs/logs?title=${that.data.title}&zhangjie=${ev.currentTarget.dataset.index}`,
    })
  },
  //事件处理函数
  bindViewTap: function (ev) {
    console.log(ev.currentTarget.dataset.index);
    wx.navigateTo({
      url: `/pages/logs/logs?title=${ev.currentTarget.dataset.index}`,
    })
  },
  ceshi:function(){
    console.log("ss")
    wx.navigateTo({
      url: `/pages/pagetion/pagetion`
    })
  },


  menu: function () {
    console.log("aaa")
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 200,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(200).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      chooseSize: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 10)
  },
  hideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export()

    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 200)
  },
  
  
})
