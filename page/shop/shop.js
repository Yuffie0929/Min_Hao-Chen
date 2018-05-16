const App = getApp();
const Data = require('../../utils/data/data');
const Util = require('../../utils/util');
Page({
  data: {
    animationData: {},
    top: 0,


    shop: {},
    goodId: '',
    goods: {},
    categories: [],
    discounts: {},
    activities: [],
    cart: {
      count: 0,
      total: 0,
      sale_total: 0,
      list: {}
    },
    showCartDetail: false
  },
  onLoad: function (options) {
    let that = this;
    this.getDatas(()=>{
      that.initCart();
      that.countDiscounts();
      wx.setNavigationBarTitle({
        title: that.data.shop.name
      })
      that.initAnimation();
    });
  },
  onReady: function () {
    this.dialog = this.selectComponent("#item_info");
    console.log(JSON.stringify(Object.values(this.data.goods)));
  },

  getDatas(cb) {
    let categories = App.globalData.categories;
    let categorySeleted = categories.length === 0 ? '' : categories[0].id;
    this.setData({
      shop: App.globalData.shop,
      goods: App.globalData.goods,
      categories,
      discounts: App.globalData.discounts,
      categorySeleted
    });
    cb();
  },
  initCart(){
    let cart = wx.getStorageSync('__cart_list');
    if(cart !== 'undefined' && cart){
      this.setData({
        cart
      });
      this.countCart();
    } else {
      cart = this.data.cart;
      this.setData({
        cart
      });
    }
  },
  countDiscounts() {
    let MAN_JIAN = this.data.discounts['MAN_JIAN'];
    let MAN_ZHE = this.data.discounts['MAN_ZHE'];
    let activities = this.data.activities;
    if (MAN_JIAN && MAN_JIAN.order_change.length > 0) {
      let MAN_JIAN_TEXT = MAN_JIAN.order_change.map((active)=>{
        let condition = active.condition;
        let discount = active.discount;
        return `满${condition}减${discount};`
      });
      activities.push({
        id: 131,
        color: '#C90400',
        firstFont: '减',
        type: 'MAN_JIAN',
        text: MAN_JIAN_TEXT.join('')
      });
    }
    if (MAN_ZHE && MAN_ZHE.order_change.length > 0) {
      let MAN_ZHE_TEXT = MAN_ZHE.order_change.map((active)=>{
        let condition = active.condition;
        let discount = active.discount;
        return `满${condition}打${discount}折;`
      });
      activities.push({
        id: 141,
        color: '#C97C00',
        firstFont: '折',
        type: 'MAN_ZHE',
        text: MAN_ZHE_TEXT.join('')
      });
    }
    this.setData({
      activities
    });
  },
  initAnimation(){
    let animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    });

    let step = 50;
    let n = 0;
    this.animation = animation;
    let length = this.data.activities.length;

    setInterval(function () {
      this.animation.top(-n * step + 'rpx').step();
      n++;
      this.setData({
        animationData: this.animation.export()
      });
      if (n === length) {
        setTimeout(()=>{
          n = 0;
          this.animation.top('0rpx').step();
          this.setData({
            animationData: this.animation.export()
          })
        }, 1500)
      }
    }.bind(this), 3000);
  },
  /*菜品品类*/
  didClickCategory: function (e) {
    var id = e.target.dataset.id;
    this.setData({
      categoryViewed: id
    });
    var self = this;
    setTimeout(function () {
      self.setData({
        categorySeleted: id
      });
    }, 100);
  },
  /*餐品详情*/
  didClickItem(e) {
    this.setData({
      goodId: e.currentTarget.dataset.id
    });
    this.dialog.showDialog();
  },
  _minusEvent() {
    /*减法*/
    this.addCart(this.data.goodId, -1);
  },
  _addEvent() {
    /*加法*/
    this.addCart(this.data.goodId, 1);
  },
  /*购物车操作*/
  tapAddCart: function (e) {
    console.log(e);
    this.addCart(e.target.dataset.id, 1);
  },
  tapMinusCart(e) {
    this.addCart(e.target.dataset.id, -1);
  },
  addCart: function (id, n) {
    let cartList = this.data.cart.list;
    let goods = this.data.goods;
    let count = cartList[id] ? cartList[id].count : 0;
    if (count === 0 && n < 0) {
      return;
    }
    count = count + n;
    if (count) {
      let price = goods[id]['price'];
      let sale_price = goods[id]['sale_price'] || goods[id]['price'];
      let total = Util.accMul(count, price);
      let sale_total = Util.accMul(count, sale_price);
      total = Util.formatMoney(total);
      sale_total = Util.formatMoney(sale_total);
      cartList[id] = {
        sale_total,
        total,
        count
      };
    } else {
      delete cartList[id]
    }
    this.countCart();
  },
  countCart: function () {
    let count = 0, total = 0, sale_total = 0;
    for (let id in this.data.cart.list) {
      count += this.data.cart.list[id].count;
      total += this.data.cart.list[id].total;
      sale_total += this.data.cart.list[id].sale_total;
    }
    this.data.cart.count = count;
    this.data.cart.total = total;
    this.data.cart.sale_total = sale_total;
    this.setData({
      cart: this.data.cart
    });
  },
  showCartDetail: function () {
    this.setData({
      showCartDetail: !this.data.showCartDetail
    });
  },
  hideCartDetail: function () {
    this.setData({
      showCartDetail: false
    });
  },
  /*下单*/
  submit: function (e) {
    let cart = this.data.cart
    wx.setStorageSync('__cart_list', cart);
    Util.navigateTo({
      url: '../order/order'
    })
  },


  /*功能*/
  onGoodsScroll: function (e) {
    if (e.detail.scrollTop > 10 && !this.data.scrollDown) {
      this.setData({
        scrollDown: true
      });
    } else if (e.detail.scrollTop < 10 && this.data.scrollDown) {
      this.setData({
        scrollDown: false
      });
    }

    var scale = e.detail.scrollWidth / 570,
      scrollTop = e.detail.scrollTop / scale,
      h = 0,
      classifySeleted,
      len = this.data.categories.length;
    this.data.categories.forEach(function (classify, i) {
      var _h = 70 + classify.goods.length * (46 * 3 + 20 * 2);
      if (scrollTop >= h - 100 / scale) {
        classifySeleted = classify.id;
      }
      h += _h;
    });
    this.setData({
      classifySeleted: classifySeleted
    });
  },
});

