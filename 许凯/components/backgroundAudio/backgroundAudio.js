// components/InnerAudio/innerAudio.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
   img:{
     type:String,
     value: "http://pic27.nipic.com/20130324/9252150_152129329000_2.jpg"},
    title: {
      type:String,
      value: ''
    },
    percent:{
      type:Number,
      value:0
    },
    play:{
      type:Boolean,
      value:false
      },
    pause:{
      type: Boolean,
      value: true
    }
  },
    
  /**
   * 组件的初始数据
   */
  data: {
  },
  /**
   * 组件的方法列表
   */
  methods: { 
    switchPause:function(e){
 this.triggerEvent('switchPause');
     
    },
    switchPlay: function (e) {
 this.triggerEvent('switchPlay');
      
    },
    changeSlider:function(e){
      this.triggerEvent('changeSlider', e.detail.value);
    },
    toMusic:function(){
      this.triggerEvent('toMusic');
    },
    switchnext: function () {
      this.triggerEvent('switchnext');
    },
    switchpre: function () {
      this.triggerEvent('switchpre');
    }
  },
  },
   

)