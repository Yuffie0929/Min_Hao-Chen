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
    cart: {},
    categories: [],
    discounts: {},
    activities: [],
    showCartDetail: false,
    isSync: false,
    isCancelSync: false,
    cacheSync: {},
    categorySelected: '',
    categorySelectedStyle: ''
  },
  onLoad: function (options) {
    let that = this;
    this.getDatas(() => {
      that.initCart();
      that.countDiscounts();
      wx.setNavigationBarTitle({
        title: that.data.shop.restaurantName
      })
      that.initAnimation();
    });
    this.categorySelectedFlag = true;
  },
  onReady: function () {
    this.dialog = this.selectComponent("#item_info");
  },
  onShow: function () {
    let that = this;
    Util.showHub('Loading...');
    Data.syncOrder((isDone) => {
      that.initCart();
      Util.hideHub();
    });
  },

  getDatas(cb) {
    let categories = App.globalData.categories;
    let categorySelected = categories.length === 0 ? '' : 'id' + categories[0].id;
    let categorySelectedStyle = categories.length === 0 ? '' : 'id' + categories[0].id;
    this.setData({
      shop: App.globalData.shop,
      goods: App.globalData.goods,
      discounts: App.globalData.discounts,
      categories,
      categorySelected,
      categorySelectedStyle
    });

    cb();
  },
  initCart() {
    let cart = App.globalData.cart;
    let that = this;
    let total = 0;
    let origTotal = 0;
    let count = 0;

    for (let itemId in cart.items) {
      let good = that.data.goods[itemId];
      let quantity = cart.items[itemId];
      if (good && quantity > 0) {
        origTotal += good.origPrice * quantity;
        total += good.price * quantity;
        count++;
      }
    }
    cart.origTotal = origTotal;
    cart.total = total;
    cart.count = count;
    this.setData({
      cart: cart
    });
  },
  countDiscounts() {
    let MAN_JIAN = this.data.discounts['MAN_JIAN'];
    let MAN_ZHE = this.data.discounts['MAN_ZHE'];
    let activities = this.data.activities;
    if (MAN_JIAN && MAN_JIAN.order_change.length > 0) {
      let MAN_JIAN_TEXT = MAN_JIAN.order_change.map((active) => {
        let condition = active.condition;
        let discount = active.discount;
        return `满${condition}减${discount};`
      });
      activities.push({
        color: '#C90400',
        firstFont: '减',
        type: 'MAN_JIAN',
        text: MAN_JIAN_TEXT.join('')
      });
    }
    if (MAN_ZHE && MAN_ZHE.order_change.length > 0) {
      let MAN_ZHE_TEXT = MAN_ZHE.order_change.map((active) => {
        let condition = active.condition;
        let discount = active.discount;
        return `满${condition}打${discount}折;`
      });
      activities.push({
        color: '#C97C00',
        firstFont: '折',
        type: 'MAN_ZHE',
        text: MAN_ZHE_TEXT.join('')
      });
    }
    activities.push(activities[0]);
    this.setData({
      activities
    });
  },
  initAnimation() {
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
        setTimeout(() => {
          n = 0;
          this.animation.top('0rpx').step({ duration: 1 });
          this.setData({
            animationData: this.animation.export()
          })
        }, 1500)
      }
    }.bind(this), 3000);
  },
  /*菜品品类*/
  didClickCategory: function (e) {
    let id = e.target.dataset.id;
    this.setData({
      categorySelected: id,
      categorySelectedStyle: id,
    });
    this.categorySelectedFlag = false;
    let that = this;
    setTimeout(() => {
      that.categorySelectedFlag = true;
    }, 100)
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
    this.addCart(this.data.goodId, "minus");
  },
  _addEvent() {
    /*加法*/
    this.addCart(this.data.goodId, "plus");
  },
  /*购物车操作*/
  tapAddCart: function (e) {
    this.addCart(e.target.dataset.id, "plus");
  },
  tapMinusCart(e) {
    this.addCart(e.target.dataset.id, "minus");
  },
  addCart: function (id, n) {
    let cartList = this.data.cart.items;
    let count = cartList[id] ? cartList[id] : 0;
    if (count === 0 && n === "minus") {
      return;
    }
    let cacheCount = this.data.cacheSync[id] ? this.data.cacheSync[id] : 0;
    if (n === "minus") {
      count--;
      cacheCount--;
    } else {
      count++;
      cacheCount++;
    }
    this.data.cacheSync[id] = cacheCount;
    App.globalData.cart.items[id] = count;
    this.initCart();
    this.prepareSyncCart();
  },

  prepareSyncCart: function () {
    if (!this.isSync) {
      let that = this;
      this.isSync = true;
      setTimeout(() => {
        if (!that.isCancelSync) {
          Util.showHub('Loading...');
          that.syncCart((isDone)=> {
            that.initCart();
            that.isSync = false;
            Util.hideHub();
          });
        } else {
          that.isSync = false;
          that.isCancelSync = false;
        }
      }, 5000)
    }
  },
  syncCart: function (callBack) {
    let cacheSync = JSON.parse(JSON.stringify(this.data.cacheSync));
    this.data.cacheSync = {};
    let items = [];
    for (let cache in cacheSync) {
      let value = cacheSync[cache];
      if (value && value !== 0) {
        items.push({
          "id": cache,
          "action": cache > 0 ? "plus" : "minus",
          "amount": value
        })
      }
    }
    let that = this;
    Data.getAddItem(items, (isDone) => {
      callBack(isDone);
    })
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
    Util.showHub('Loading...');
    this.isCancelSync = true;
    let that = this;
    this.syncCart((isDone) => {
      if (isDone) {
        Util.hideHub();
        that.initCart();
        Util.navigateTo({
          url: '../order/order'
        })
      } else {
        setTimeout(() => {
          Util.hideHub();
          that.submit();
        }, 2000)
      }
    })
  },
  /*功能*/
  onGoodsScroll: function (e) {
    if (e.detail.scrollTop > 70 && !this.data.scrollDown) {
      this.setData({
        scrollDown: true
      });
    } else if (e.detail.scrollTop < 70 && this.data.scrollDown) {
      this.setData({
        scrollDown: false
      });
    }
    if (!this.categorySelectedFlag) return;
    let scale = e.detail.scrollWidth / 570,
      scrollTop = e.detail.scrollTop / scale,
      h = 0,
      categorySelectedStyle;
    this.data.categories.forEach(function (category, i) {
      let _h = 70 + category.goods.length * (46 * 3 + 20 * 2);
      if (scrollTop >= h - 100 / scale) {
        categorySelectedStyle = 'id' + category.id;
      }
      h += _h;
    });
    this.setData({
      categorySelectedStyle: categorySelectedStyle ? categorySelectedStyle : 'id' + this.data.categories[0].id
    });
  },
  errImage: function (e) {
    let id = e.currentTarget.dataset.id;
    let goods = this.data.goods;
    goods[id].pic = '../../images/errImage.png';
    this.setData({
      goods
    });
  }
});

