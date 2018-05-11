Component({
  options: {
    multipleSlots: true
  },
  properties: {
    good: {
      type: Object,
      value: {}
    },
    num: {
      type: Object,
      value: {}
    },
    // 弹窗标题
    title: {
      type: String,
      value: '标题'
    },
    // 弹窗内容
    content :{
      type : String ,
      value : '弹窗内容'
    },
    // 弹窗取消按钮文字
    cancelText :{
      type : String ,
      value : '取消'
    },
    // 弹窗确认按钮文字
    confirmText :{
      type : String ,
      value : '确定'
    }
  },
  data: {
    // 弹窗显示控制
    isShow: false
  },
  methods: {
    //隐藏弹框
    hideDialog(){
      this.setData({
        isShow: !this.data.isShow
      })
    },
    //展示弹框
    showDialog(){
      this.setData({
        isShow: !this.data.isShow
      })
    },

    _tapMinusCart(){
      this.triggerEvent("minusEvent")
    },
    _tapAddCart(){
      this.triggerEvent("addEvent");
    },
    _closeEvent(){
      this.hideDialog();
      this.triggerEvent("closeEvent")
    }
  }
})