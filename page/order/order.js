const app = getApp();
const server = require('../../utils/server');
const data = require('../../utils/data');
const util = require('../../utils/util');

Page({
  data: {
    goods: {},
    goodsList: [],

    cartList: [{
      id: '101',
      count: 2,
    }, {
      id: '401',
      count: 1,
    }, {
      id: '402',
      count: 1,
    }, {
      id: '502',
      count: 2,
    }],
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
    let goods = {};
    data.goods.map((good)=>{
      good.pic = '../../imgs/web/' + good.image + '.jpg';
      delete good.image;
      goods[good.id] = good;
    });
    this.setData({
      goodsList: data.goodsList,
      goods: goods
    });
    console.log(this.data.goods)
  },
  onShow: function () {
    this.setData({
      classifySeleted: this.data.goodsList[0].id
    });
  },
  toggleList(){
    this.setData({
      listShow: !this.data.listShow
    });
	}
});

