const App = getApp();
const Data = require('../../utils/data/data');
const Util = require('../../utils/util');
const data = require('../../utils/data');
Page({
	data: {
    shop: {},
		goodId: '',
		goods: {},
    categories: [],
    discounts: {},
		cart: {
			count: 0,
			total: 0,
			list: {}
		},
		showCartDetail: false
	},
  onLoad: function (options) {
		let categories = App.globalData.categories;
    let classifySeleted = categories.length === 0 ? '' : categories[0].id;
    this.setData({
      shop:  App.globalData.shop,
      goods: App.globalData.goods,
      categories,
      discounts: App.globalData.discounts,
      classifySeleted
    });
    wx.setNavigationBarTitle({
      title: this.data.shop.name
    })
  },
  onReady: function () {
    this.dialog = this.selectComponent("#item_info");
  },

  /*菜品品类*/
  tapClassify: function (e) {
    var id = e.target.dataset.id;
    this.setData({
      classifyViewed: id
    });
    var self = this;
    setTimeout(function () {
      self.setData({
        classifySeleted: id
      });
    }, 100);
  },
  /*餐品详情*/
  _showDialog(e){
    this.setData({
      goodId: e.currentTarget.dataset.id
    });
    this.dialog.showDialog();
  },
  _minusEvent(){
    /*减法*/
    this.addCart(this.data.goodId, -1);
  },
  _addEvent(){
    /*加法*/
    this.addCart(this.data.goodId, 1);
  },
	/*购物车操作*/
	tapAddCart: function (e) {
		this.addCart(e.target.dataset.id, 1);
	},
	tapMinusCart(e){
    this.addCart(e.target.dataset.id, -1);
	},
	addCart: function (id, n) {
		let cartList = this.data.cart.list;
		let goods = this.data.goods;
		let count = cartList[id] ? cartList[id].count : 0;
		if(count === 0 && n < 0){
			return;
		}
		count = count + n;
		if(count){
			let price = goods[id]['sale_price'] || goods[id]['price'];
      let total = Util.accMul(count, price);
      total = Util.formatMoney(total);
      cartList[id] = {
      	total,
        count
			};
		} else {
			delete cartList[id]
		}
		this.countCart();
	},
	countCart: function () {
    let count = 0, total = 0;
		for (let id in this.data.cart.list) {
			count += this.data.cart.list[id].count;
			total += this.data.cart.list[id].total;
		}
		this.data.cart.count = count;
		this.data.cart.total = total;
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
		let cartList = [];
		let goodsObj = this.data.goods;
		let cartObj = this.data.cart.list;
    Object.keys(cartObj).forEach((key)=>{
    	if(cartObj[key]){
        goodsObj[key]['count'] = cartObj[key];
        cartList.push(goodsObj[key]);
			}
    });
    console.log(cartList);
    wx.setStorageSync('__goods_list', cartList);
    let that = this;
    wx.navigateTo({
      url: '../order/order',
			params: {

			},
      fail:function(e){
        wx.showToast({
          title: e.errMsg,
          icon: "none",
          duration: 2000,
          success: function () {
            setTimeout(function () {
              that.data.go = true;
            }, 2000)
          }
        })
      },
    })

		/*server.sendTemplate(e.detail.formId, null, function (res) {
			if (res.data.errorcode == 0) {
				wx.showModal({
					showCancel: false,
					title: '恭喜',
					content: '订单发送成功！下订单过程顺利完成，本例不再进行后续订单相关的功能。',
					success: function(res) {
						if (res.confirm) {
							wx.navigateBack();
						}
					}
				})
			}
		}, function (res) {
			console.log(res)
		});*/

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

