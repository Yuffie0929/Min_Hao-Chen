const app = getApp();
const server = require('../../utils/server');
const data = require('../../utils/data');
const util = require('../../utils/util');

Page({
  data: {
    goods: {},
    goodsList: [],

    cartList: [],
    cartCount: 0,
    cartTotal: 0,
    listShow: false, //true为展开状态 false为关闭状态

    shop: {
      logo: '../../imgs/web/logo.jpg',
      name: '赛百味(复兴门百盛店)',
      desc: '专注味觉100年'
    }
  },
  onLoad: function (options) {
    let goods = {}, cartTotal = 0, cartCount = 0;
    data.goods.map((good)=>{
      good.pic = '../../imgs/web/' + good.image + '.jpg';
      delete good.image;
      goods[good.id] = good;
    });
    let cartList = data.cartList.map((item)=>{
      item.total = util.accMul(goods[item.id].price, item.count);
      cartCount = util.accAdd(cartCount, item.count);
      cartTotal = util.accAdd(cartTotal, item.total);
      return item;
    });
    this.setData({
      goodsList: data.goodsList,
      goods,
      cartList,
      cartCount,
      cartTotal
    });
  },
  onShow: function () {

  },
  toggleList(){
    this.setData({
      listShow: !this.data.listShow
    });
	}
});

