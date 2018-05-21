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
    this.getDatas();
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
      let itemCount = this.data.cart.items[itemId];
      if (itemCount > 0) {
        items.push({
          id: itemId,
          price: this.data.goods[itemId].price * itemCount,
          amount: itemCount
        });
      }
    }
    if (items.length > 0) {
      Data.insertOrder(items, this.data.cart.total, (isDone) => {
        if (isDone) {
          Util.alert("下单成功");
          App.globalData.cart = {};
          wx.navigateBack({
          })
        } else {
          Util.alert("提交失败");
        }
      })
    } else {
      Util.alert("请先选择餐品");
    }
  },
  errImage: function(e){
    let id = e.currentTarget.dataset.id;
    let goods = this.data.goods;
    goods[id].pic = '../../images/errImage.png';
    this.setData({
      goods
    });
  }
});

