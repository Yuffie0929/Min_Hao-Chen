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
    cacheSync: {},
    categorySelected: ''
  },
  onLoad: function (options) {
    let that = this;
    this.getDatas(() => {
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
  },

  getDatas(cb) {
    let categories = App.globalData.categories;
    let categorySelected = categories.length === 0 ? '' : categories[0].categoryName;
    this.setData({
      shop: App.globalData.shop,
      goods: App.globalData.goods,
      discounts: App.globalData.discounts,
      categories,
      categorySelected
    });

    cb();
  },
  initCart() {
    let cart = App.globalData.cart;
    let that = this;
    var total = 0;
    var origTotal = 0;
    var count = 0;

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
        id: 131,
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
      categorySelected: id
    });
    var self = this;
    setTimeout(function () {
      self.setData({
        categorySelected: id
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
    let goods = this.data.goods;
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

    if (!this.isSync) {
      this.isSync = true;
      setTimeout(() => {
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
          that.initCart();
          that.isSync = false
        })
      }, 5000)
    }
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
    let cart = this.data.cart;
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
      categorySelected,
      len = this.data.categories.length;
    let that = this;
    this.data.categories.forEach(function (category, i) {
      var containCount = 0;
      for (let itemId in that.data.goods) {
        if (category.id === that.data.goods[itemId].category) {
          containCount++;
        }
      }
      var _h = 70 + containCount * (46 * 3 + 20 * 2);
      if (scrollTop >= h - 100 / scale) {
        categorySelected = category.categoryName;
      }
      h += _h;
    });
    this.setData({
      categorySelected: categorySelected
    });
  },
});

