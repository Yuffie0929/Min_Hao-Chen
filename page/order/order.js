const App = getApp();
const Data = require('../../utils/data/data');
const Util = require('../../utils/util');

Page({
  data: {
    shop: {},
    goods: {},
    discounts: {},
    cart :{},
    listShow: false, //true为展开状态 false为关闭状态
  },
  onLoad(options){
    let that = this;
    this.getDatas();
    console.log(this.data.cart.items);
  },
  getDatas(){
    this.setData({
      cart: App.globalData.cart,
      shop:  App.globalData.shop,
      goods: App.globalData.goods,
      discounts: App.globalData.discounts
    });
  },
  toggleList(){
    this.setData({
      listShow: !this.data.listShow
    });
	},
  didClickSubmit () {
    var items = [];
    for (let itemId in this.data.cart.items) {
      items.push({
          id:itemId,
          price: this.data.goods[itemId].price * this.data.cart.items[itemId],
          amount: this.data.cart.items[itemId]
        });
    }
    Data.insertOrder(items, this.data.cart.total,(isDone)=>{
      if (isDone) {
        Util.alert("下单成功");
      } else{
        Util.alert("提交失败");
      }
    })
  }
});

