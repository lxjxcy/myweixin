//logs.js
var util = require('../../utils/util.js')
var touchDotx = 0;//触摸时的原点 
var touchDoty = 0;//触摸时的原点 
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = "";// 记录/清理时间记录 
Page({
  data: {
    lineHeight:"2",
    // logs: []
    scroll_top: 0,
    borderred: "lr",//翻页选中颜色
    lr: true,//左右翻页判断
    tb: false,//上下翻页判断
    Text: `第一页-------“萧炎，斗之力，三段！级别：低级！”测验魔石碑之旁，一位中年男子，看了一眼碑上所显示出来的信息，语气漠然的将之公布了出来…
中年男子话刚刚脱口，便是不出意外的在人头汹涌的广场上带起了一阵嘲讽的骚动。
   “三段？嘿嘿，果然不出我所料，这个“天才”这一年又是在原地踏步！”
“哎，这废物真是把家族的脸都给丢光了。”
“要不是族长是他的父亲，这种废物，早就被驱赶出家族，任其自生自灭了，哪还有机会待在家族中白吃白喝。”
“唉，昔年那名闻乌坦城的天才少年，如今怎么落魄成这般模样了啊？”
“谁知道呢，或许做了什么亏心事，惹得神灵降怒了吧…”
    周围传来的不屑嘲笑以及惋惜轻叹，落在那如木桩待在原地的少年耳中，恍如一根根利刺狠狠的扎在心脏一般，让得少年呼吸微微急促。
少年缓缓抬起头来，露出一张有些清秀的稚嫩脸庞，漆黑的眸子木然的在周围那些嘲讽的同龄人身上扫过，少年嘴角的自嘲，似乎变得更加苦涩了。
    “这些人，都如此刻薄势力吗？或许是因为三年前他们曾经在自己面前露出过最谦卑的笑容，所以，如今想要讨还回去吧…”苦涩的一笑，萧炎落寞的转身，安静的回到了队伍的最后一排，孤单的身影，与周围的世界，有些格格不入。
“下一个，萧媚！”
    听着测验人的喊声，一名少女快速的人群中跑出，少女刚刚出场，附近的议论声便是小了许多，一双双略微火热的目光，牢牢的锁定着少女的脸颊…
    少女年龄不过十四左右，虽然并算不上绝色，不过那张稚气未脱的小脸，却是蕴含着淡淡的妩媚，清纯与妩媚，矛盾的集合，让得她成功的成为了全场瞩目的焦点…
    少女快步上前，小手轻车熟路的触摸着漆黑的魔石碑，然后缓缓闭上眼睛…
在少女闭眼片刻之后，漆黑的魔石碑之上`,
    initFontSize: '14',
    getlist:[
      "第一章", "第二章", "第三章", "第四章", "第五章", "第六章", "第七章", "第八章", "第九章", "第十章", "第十一章", "第十二章", "第十三章", "第十四章", "第十五章", "第十六章", "第十七章", "第十八章", "第十九章", "第二十章", "第二十章", "第二十章", "第二十章", "第二十章",
    ],
    colorArr: [{
      value: '#f7eee5',
      name: '米白',
      font: ''
    }, {
      value: '#e9dfc7',
      name: '纸张',
      font: '',
      id: "font_normal"
    }, {
      value: '#a4a4a4',
      name: '浅灰',
      font: ''
    }, {
      value: '#cdefce',
      name: '护眼',
      font: ''
    }, {
      value: '#283548',
      name: '灰蓝',
      font: '#7685a2',
      bottomcolor: '#fff'
    }, {
      value: '#0f1410',
      name: '夜间',
      font: '#4e534f',
      bottomcolor: 'rgba(255,255,255,0.7)',
      id: "font_night"
    }],
    nav: false,//底部显示和隐藏
    topnav:false, //顶部显示和隐藏
    ziti: false,//设置显示和隐藏
    menulist: false,//顶部中的菜单显示和隐藏
    _num: 1,//背景色的索引
    bodyColor: '#e9dfc7',//默认背景色
    daynight: false,
    zj: 'none',
    chooseSize: false,
    animationData: {},
    animationDatab: {},
    animationDatat: {},
    animationDatas:{},
    zhangjie:"第一章"
  },
  onLoad: function (options) {
    console.log(options.title)
    if (options.zhangjie!=''){
      this.setData({
        zhangjie:options.zhangjie
      })
    }else{
      this.setData({
        zhangjie:"第一章"
      })
    }
    wx.setNavigationBarTitle({
      title: options.title
    })
   
    // 本地提取字号大小
    var that = this;
    wx.getStorage({
      key: 'initFontSize',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          initFontSize: res.data
        })
      }
    })
    // 本地提取行距
    wx.getStorage({
      key: 'lineHeight',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          lineHeight: res.data
        })
      }
    })

    //存储背景色
    wx.getStorage({
      key: 'bodyColor',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          bodyColor: res.data
        })
      }
    })
    wx.getStorage({
      key: '_num',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          _num: res.data
        })
      }
    })
    wx.getStorage({
      key: 'daynight',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          daynight: res.data
        })
      }
    })  
   },
  //事件处理函数
  //字体变大
  bindBig: function () {
    var that = this;
    if (that.data.initFontSize > 20) {
      return;
    }
    var FontSize = parseInt(that.data.initFontSize)
    that.setData({
      initFontSize: FontSize += 1
    })
    // console.log(that.data.initFontSize)
    wx.setStorage({
      key: "initFontSize",
      data: that.data.initFontSize
    })
  },
  //字体变小
  bindSmall: function () {
    var that = this;
    if (that.data.initFontSize < 12) {
      return;
    }
    var FontSize = parseInt(that.data.initFontSize)
    that.setData({
      initFontSize: FontSize -= 1
    })
    // console.log(that.data.initFontSize)
    wx.setStorage({
      key: "initFontSize",
      data: that.data.initFontSize
    })
  },
  // 设置行距
  lineH15:function(){
    var that = this;
    that.setData({
      lineHeight: "1.5"
    })
    wx.setStorage({
      key: "lineHeight",
      data: that.data.lineHeight
    })
  },
  lineH2: function () {
    var that = this;
    that.setData({
      lineHeight: "2"
    })
    wx.setStorage({
      key: "lineHeight",
      data: that.data.lineHeight
    })
  },
  lineH25: function () {
    var that = this;
    that.setData({
      lineHeight: "2.5"
    })
    wx.setStorage({
      key: "lineHeight",
      data: that.data.lineHeight
    })
  },
  //点击中间区域显示底部导航
  midaction: function () {
    var that = this;
    if (that.data.nav == false && that.data.topnav==false) {
    var animationt = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    that.animation = animationt
    animationt.translateY(-100).step()
    var animationb = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    that.animation = animationb
    animationb.translateY(150).step()
    that.setData({
      animationDatat: animationt.export(),
      animationDatab: animationb.export(),
      topnav: true,
      nav:true
    })
    setTimeout(function () {
      animationt.translateY(0).step()
      animationb.translateY(0).step()
      that.setData({
        animationDatat: animationt.export(),
         animationDatab: animationb.export()
      })
    }, 10)
    } else {
    var animationt = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    var animationb = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    var animations = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    that.animation = animationt
    animationt.translateY(-100).step()
    that.animation = animationb
    animationb.translateY(150).step()
    that.animation = animations
    animations.translateY(300).step()
    that.setData({
      animationDatat: animationt.export(),
      animationDatab: animationb.export(),
      animationDatas: animations.export()

    })
    setTimeout(function () {
      animationt.translateY(0).step()
      animationb.translateY(0).step()
      animationb.translateY(0).step()
      that.setData({
        animationDatat: animationt.export(),
        animationDatab: animationb.export(),
        animationDatas: animations.export(),
        nav: false,
        ziti: false,
        topnav: false,
        menulist: false,
      })
    }, 200)
    }
  },
  // show: function (pers, linernum, num, animation){
  //   var that = this;
  //   var animation = wx.createAnimation({
  //     duration: linernum,
  //     timingFunction: 'linear'
  //   })
  //   that.animation = animation
  //   animation.translateY(num).step()
  //   that.setData({
  //     animationData: animation.export(),
  //     pers: true
  //   })
  //   setTimeout(function () {
  //     animation.translateY(0).step()
  //     that.setData({
  //       animation: animation.export()
  //     })
  //   }, 10)
  // },
  //点击设置出现窗口
  zitiaction: function () {
    if (this.data.ziti == false) {
      this.setData({
        ziti: true,
      })
    } else {
      this.setData({
        ziti: false
      })
    }
  },
  // 点击出现分享菜单栏
  showlist:function(){
    if (this.data.menulist == false) {
      this.setData({
        menulist: true
      })
    } else {
      this.setData({
        menulist: false
      })
    }
  },
  // 目录
  menu:function(){
    console.log("aaa")
    var that = this;
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export(),
      chooseSize: true
    })
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
    animation.translateY(400).step()
    that.setData({
      animationData: animation.export()

    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false,
        nav: false,
        ziti: false,
        topnav: false,
        menulist: false

      })
    }, 200)
  },
  // 选择章节
  getzhang:function(ev){
    console.log(ev.currentTarget.dataset.index);
    var that=this;
    that.setData({
      zhangjie: ev.currentTarget.dataset.index,
      nav: false,
      topnav: false,
      ziti: false,

    })
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(400).step()
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
  //选择背景色
  bgChange: function (e) {
    console.log(e.target.dataset.num)
    console.log(e)
    this.setData({
      _num: e.target.dataset.num,
      bodyColor: this.data.colorArr[e.target.dataset.num].value
    })
    wx.setStorage({
      key: "bodyColor",
      data: this.data.colorArr[e.target.dataset.num].value
    })
    wx.setStorage({
      key: "_num",
      data: e.target.dataset.num
    })
  },
  //切换白天夜晚
  dayNight: function () {
    if (this.data.daynight == true) {
      this.setData({
        daynight: false,
        bodyColor: '#e9dfc7',
        _num: 1,
      })
      wx.setStorage({
        key: "bodyColor",
        data: '#e9dfc7'
      })
      wx.setStorage({
        key: "_num",
        data: 1
      })

    } else {
      this.setData({
        daynight: true,
        bodyColor: '#000',
        _num: 5,
        menulist: false,
      })
      wx.setStorage({
        key: "bodyColor",
        data: '#000'
      })
      wx.setStorage({
        key: "_num",
        data: 5
      })
    }
    wx.setStorage({
      key: "daynight",
      data: this.data.daynight
    })
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
    if (this.data.lr) {
      var touchMove = e.touches[0].pageX;
      // 向左滑动  
      if (touchMove - touchDotx <= -40 && time < 30) {
        this.setData({
          Text: '第二页-------------本书主角，被敌对石族的人称为“罪”血后代，在上界化名荒、昊天、魔曦、帝。为《遮天》中的荒天帝。曾拥有至尊骨，为天生至尊，却被其族兄石毅及其母亲夺取，导致重病垂死，一番波折后被父母寄养在石村，后走出石村，走向大荒，登临九天，创造遮天修炼体系，独断万古。仙古纪元的祖祭灵，无上仙王巨头，与禁区之主交情甚好。在仙古九天十地即将战败时，在异域杀得九进九出，多名不朽出动也无法阻拦，使异域人至今后怕。仙古时曾在涅槃的时候被两名仙域的仙王围攻以雷霆击杀导致柳神法身俱毁不得不从头再来，最终受创涅槃为一枚种子。曾为下界石村的祭灵，常以一棵柳树的形态扎根石村，由一株焦黑的雷击木逐步恢复至三千柳条绽放。偶尔显化人身，性别不详。去过堤坝处，后留下一叶助石昊走出堤坝界。现已随石昊前往上苍常以一清漪的主身，已与次身融合归一常以一棵柳树的形态扎根石村，去过堤坝处，后留下一叶助石昊走出堤坝界。现已随石昊前往上苍。照天术等，曾在荒域访求少年英才。清漪的主身，已与次身融合归一常以一棵柳树的形态扎根石村，去过堤坝处，后留下一叶助石昊走出堤坝界。现已随石昊前往上苍。照天术等，曾在荒域访求少年英才。清漪的主身，已与次身融合归一常以一棵柳树的形态扎根石村，棵柳树的形态扎根石村，',
          scroll_top: 0
        })
      }
      // 向右滑动 
      if (touchMove - touchDotx >= 40 && time < 30) {
        this.setData({
          Text: '第一页------------------女主角之一，下界荒域火国公主，在火族祖地得朱雀传承。荒域大变后，随火皇进入三千道州。为躲避纷争，在一片火桑林中隐居下来。因曾听说石昊在七神下界时战死，暗自伤心，并为其立衣冠冢。后被上界而来的石昊寻到，二人的感情逐渐升温。石昊征战仙古回来后，与火灵儿成婚。现已随石昊前往上苍。女主角之一，来自三千道州补天教的女修。修有化天神通和御龙术、补天术、真龙宝术（龙吟术）、神凰宝术（凤鸣音）、照天术等，曾在荒域访求少年英才。清漪的主身，已与次身融合归一常以一棵柳树的形态扎根石村，由一株焦黑的雷击木逐步恢复至三千柳条绽放。偶尔显化人身，性别不详。去过堤坝处，后留下一叶助石昊走出堤坝界。现已随石昊前往上苍。照天术等，曾在荒域访求少年英才。清漪的主身，已与次身融合归一常以一棵柳树清漪的主身，已与次身融合归一常以一棵柳树的形态扎根石村，去过堤坝处，后留下一叶助石昊走出堤坝界。现已随石昊前往上苍。照天术等，曾在荒域访求少年英才。清漪的主身，已与次身融合归一常以一棵柳树的形态扎根石村，去过堤坝处，后留下一叶助石昊走出堤坝界。现已随石昊前往上苍。照天术等，曾在荒域访求少年英才。清漪的主身，已与次身融合归一常以一棵柳树的形态扎根石村，的形态扎根石村，偶尔显化人身，性别不详。去过堤坝处，后留下一叶助石昊走出堤坝界。现已随石昊前往上苍。照天术等，曾在荒域访求少年',
          scroll_top: 0
        })
      }
    }
    if (this.data.tb) {
      var touchMove = e.touches[0].pageY;
      // 向上滑动  
      if (touchMove - touchDoty <= -40 && time < 30) {
        this.setData({
          Text: '第二页------------------------------本书主角，被敌对石族的人称为“罪”血后代，在上界化名荒、昊天、魔曦、帝。为《遮天》中的荒天帝。曾拥有至尊骨，为天生至尊，却被其族兄石毅及其母亲夺取，导致重病垂死，一番波折后被父母寄养在石村，后走出石村，走向大荒，登临九天，创造遮天修炼体系，独断万古。仙古纪元的祖祭灵，无上仙王巨头，与禁区之主交情甚好。在仙古九天十地即将战败时，在异域杀得九进九出，多名不朽出动也无法阻拦，使异域人至今后怕。仙古时曾在涅槃的时候被两名仙域的仙王围攻以雷霆击杀导致柳神法身俱毁不得不从头再来，最终受创涅槃为一枚种子。曾为下界石村的祭灵，常以一棵柳树的形态扎根石村，由一株焦黑的雷击木逐步恢复至三千柳条绽放。偶尔显化人身，性别不详。去过堤坝处，后留下一叶助石昊走出堤坝界。现已随石昊前往上苍常以一棵柳树的形态扎根石村，由一株焦黑的雷击木逐步恢复至三千柳条绽放。偶尔显化人身，性别不详。去过堤坝处，后留下一叶助石昊走出堤坝界。现已随石昊前往上苍常以一棵柳树的形态扎根石村，由一株焦黑的雷击木逐步恢复至三千柳条绽放。偶尔显化人身，性别不详。去过堤坝处，后留下一叶清漪的主身，已与次身融合归一常以一棵柳树的形态扎根石村，去过堤坝处，后留下一叶助石昊走出堤坝界。现已随石昊前往上苍。照天术等，曾在荒域访求少年英才。清漪的主身，已与次身融合归一常以一棵柳树的形态扎根石村，去过堤坝处，后留下一叶助石昊走出堤坝界。现已随石昊前往上苍。照天术等，曾在荒域访求少年英才。清漪的主身，已与次身融合归一',
          scroll_top: 0
        })
      }
      // 向下滑动 
      if (touchMove - touchDoty >= 40 && time < 30) {
        this.setData({
          Text: '第一页---------------女主角之一，下界荒域火国公主，在火族祖地得朱雀传承。荒域大变后，随火皇进入三千道州。为躲避纷争，在一片火桑林中隐居下来。因曾听说石昊在七神下界时战死，暗自伤心，并为其立衣冠冢。后被上界而来的石昊寻到，二人的感情逐渐升温。石昊征战仙古回来后，与火灵儿成婚。现已随石昊前往上苍。女主角之一，来自三千道州补天教的女修。修有化天神通和御龙术、补天术、真龙宝术（龙吟术）、神凰宝术（凤鸣音）、照天术等，曾在荒域访求少年英才。清漪的主身，已与次身融合归一常以一棵柳树的形态扎根石村，由一株焦黑的雷击木逐步恢复至三千柳条绽放。偶尔显化人身，性别不详。去过堤坝处，后留下一叶助石昊走出堤坝界。现已随石昊前往上苍。照天术等，曾在荒域访求少年英才。清漪的主身，已与次身融合归一常以一棵柳树的形态扎根石村，去过堤坝处，后留下一叶助石昊走出堤坝界。现已随石昊前往上苍。照天术等，曾在荒域访求少年英才。清漪的主身，已与次身融合归一常以一棵柳树的形态扎根石村，去过堤坝处，后留下一叶助石昊走出堤坝界。现已随石昊前往上苍。照天术等，曾在荒域访求少年英才。清漪的主身，已与次身融合归一常以一棵柳树的形态扎根石村清漪的主身，已与次身融合归一常以一棵柳树的形态扎根石村，去过堤坝处，后留下一叶助石昊走出堤坝界。现已随石昊前往上苍。照天术等，曾在荒域访求少年英才。清漪的主身，已与次身融合归一常以一棵柳树的形态扎根石村，去过堤坝处，后留下一叶助石昊走出堤坝界。现已随石昊前往上苍。照天术等，曾在荒域访求少年英才。清漪的主身，，',
          scroll_top: 0
        })
      }
    }

  },
  // 触摸结束事件 
  touchEnd: function (e) {
    clearInterval(interval); // 清除setInterval 
    time = 0;
  },
  topB: function () {
    this.setData({
      borderred: "tb",
      lr: false,
      tb: true

    })
  },
  leftR: function () {
    this.setData({
      borderred: "lr",
      lr: true,
      tb: false
    })
  }
})
