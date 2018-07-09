// // pages/books/book1/book1.js
// Component({
//   options: {
//     multipleSlots: true // 在组件定义时的选项中启用多slot支持
//   },
//   /**
//    * 组件的属性列表
//    */
//   properties: {

//   },

//   /**
//    * 组件的初始数据
//    */
//   data: {
//    listed:"111111"
//   },

//   /**
//    * 组件的方法列表
//    */
//   methods: {

//   }
// })


Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerTexts: {
      type: String,
      value: 'default value',
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {},
    listed: "222222",
    listimg:[
      { pic:"https://pic.maizuo.com/usr/movie/20d5856282de23076b4349fb8c42e2b5.jpg?x-oss-process=image/resize,m_fixed,h_0,w_300",title:"斗罗大陆"},
      { pic: "https://pic.maizuo.com/usr/movie/7e62d5bf19601e62227fa9f528c4fc81.jpg?x-oss-process=image/resize,m_fixed,h_0,w_300", title: "天赋武神" },
      { pic: "https://pic.maizuo.com/usr/movie/f3357e10bc51cc5d69313ac80672a0fb.jpg?x-oss-process=image/resize,m_fixed,h_0,w_300", title: "神孔天下" },
      { pic: "https://pic.maizuo.com/usr/movie/08a081fe5e8b4887ca015eec364586dc.jpg?x-oss-process=image/resize,m_fixed,h_0,w_300", title: "花千骨" },
      { pic: "https://pic.maizuo.com/usr/movie/83ac3271d943213c6d3d5dd1e6bb995c.jpg?x-oss-process=image/resize,m_fixed,h_0,w_300", title: "九五自尊" },
      { pic: "https://pic.maizuo.com/usr/movie/78604363258e1f013139530d7b544bcf.jpg?x-oss-process=image/resize,m_fixed,h_0,w_300", title: "画皮" }
    ]

  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function () { },
    handleTap:function(ev){
      console.log(ev.currentTarget.dataset.index);
      wx.navigateTo({
        url: `/pages/getbook/getbook?titled=${ev.currentTarget.dataset.index}`,
      })

    }
  }
})