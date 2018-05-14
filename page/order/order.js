const App = getApp();
const Data = require('../../utils/data/data');
const Util = require('../../utils/util');

Page({
  data: {
    shop: {},
    goods: {},
    discounts: {},

    cartList: [],
    cartCount: 0,
    cartTotal: 0,
    cartSaleTotal: 0,
    listShow: false, //true为展开状态 false为关闭状态
  },
  onLoad(options){
    let that = this;
    this.getDatas(()=>{
      that.countDiscounts();
    });
  },
  getDatas(cb){
    let cart = wx.getStorageSync('__cart_list');
    let cartList = cart.list;
    cartList = Object.keys(cartList).map((id)=>{
      cartList[id].id = id;
      return cartList[id];
    });
    this.setData({
      cartList,
      cartCount: cart.count,
      cartTotal: cart.total,
      cartSaleTotal: cart.sale_total,
      shop:  App.globalData.shop,
      goods: App.globalData.goods,
      discounts: App.globalData.discounts
    });
    cb();
  },
  countDiscounts(){

  },
  toggleList(){
    this.setData({
      listShow: !this.data.listShow
    });
	}
});

