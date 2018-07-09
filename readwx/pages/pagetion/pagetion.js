
var touchDotx = 0;//触摸时的原点 
var touchDoty = 0;//触摸时的原点 
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = "";// 记录/清理时间记录 
Page({
  data: {
    // logs: []
    scroll_top: 0,
    borderred:"lr",
    lr:true,
    tb:false,
    leftr:"0",
    rightl:"0",
    tipb:"0",
    bootomt:"0",
    num:1,
    rl:"xl",

    Text: "第1页",   
  },
  onLoad: function () {
    
  },
 
 
  // 触摸开始事件 
  touchStart: function (e) {
    touchDotx = e.touches[0].pageX; // 获取触摸时的原点 
    touchDoty = e.touches[0].pageY; 
    // 使用js计时器记录时间  
    interval = setInterval(function () {
      time++;
    }, 200);
  },
  // 触摸移动事件 
  touchMove: function (e) {

   if(this.data.lr){
     var touchMove = e.touches[0].pageX;
     // 向左滑动 
    
     if (touchMove - touchDotx <= -40 && time < 30) {
       this.setData({
         leftr:"1"
       })
       var numed = "第"+this.data.num+"页";
       var numss = this.data.num;
       if (this.data.num > 10) {
         wx.showToast({
           title: '最后一页了',
           icon: 'none',
           duration: 2000
         });
         return;
       }
       this.setData({
         Text: numed,
         num: numss,
         scroll_top: 0,
       })
       
     }
     // 向右滑动 
     if (touchMove - touchDotx >= 40 && time < 30) {
       this.setData({
         rightl: "1"
       })
       var numss = this.data.num
       var numed = "第" + this.data.num + "页"
       if (this.data.num <= 0) {
         var numed = "第" + "1" + "页"
       }
       this.setData({
         Text: numed,
         num: numss,
         scroll_top: 0,
       })
     
     }
   }
   if (this.data.tb) {
     var touchMove = e.touches[0].pageY;
     // 向上滑动  
     if (touchMove - touchDoty <= -40 && time < 30) {
       this.setData({
         topb: "1"
       })
       var numss = this.data.num
       var numed = "第" + this.data.num + "页"
       this.setData({
         Text: numed,
         num: numss,
         scroll_top: 0
       })
     }
     // 向下滑动 
     if (touchMove - touchDoty >= 40 && time < 30) {
       this.setData({
         bootomt: "1"
       })
       var numss = this.data.num
       var numed = "第" + this.data.num + "页"
       if (this.data.num <= 0) {
         var numed = "第" + "1" + "页"
       }
     
       this.setData({
         Text: numed,
         num: numss,
         scroll_top: 0
       })
     }
   }
   
  },
  // 触摸结束事件 
  touchEnd: function (e) {
    clearInterval(interval); // 清除setInterval 
    time = 0;
    var that=this;
    if (that.data.leftr=="1"){
      var nums = ++that.data.num;
      console.log("............" + nums);
      that.setData({
        leftr:"0",
        num: nums
      })
    }
    if (that.data.rightl == "1") {
      var nums = --that.data.num;
      console.log("............" + nums);
      that.setData({
        rightl: "0",
        num: nums
      })
    }
    if (that.data.topb == "1") {

      var nums = ++that.data.num;
      console.log("............" + nums);
      that.setData({
        topb: "0",
        num: nums
      })
    }
    if (that.data.bootomt == "1") {
      var nums = --that.data.num;
      console.log("............" + nums);
      that.setData({
        bootomt: "0",
        num: nums
      })
    }
  },
  topB:function(){
    this.setData({
      borderred:"tb",
      lr:false,
      tb:true

    })
  },
  leftR:function(){
    this.setData({
      borderred: "lr",
      lr:true,
      tb:false
    })
  }
})
