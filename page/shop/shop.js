const app = getApp();
const server = require('../../utils/server');
const data = require('../../utils/data');
const util = require('../../utils/util');

Page({
	data: {
		goodId: '',
		goods: {},
		goodsList: [],
		cart: {
			count: 0,
			total: 0,
			list: {}
		},
		showCartDetail: false,
    shop: {
			logo: '../../imgs/web/logo.jpg',
			name: '赛百味(复兴门百盛店)',
      desc: '专注味觉100年'
		}
	},
  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
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

		let that = this;
    wx.setNavigationBarTitle({
      title: that.data.shop.name
    })
	},
	onShow: function () {
		this.setData({
			classifySeleted: this.data.goodsList[0].id
		});
	},
	tapAddCart: function (e) {
		this.addCart(e.target.dataset.id, 1);
	},
	tapMinusCart(e){
    this.addCart(e.target.dataset.id, -1);
	},
	tapReduceCart: function (e) {
		this.reduceCart(e.target.dataset.id);
	},
	addCart: function (id, n) {
		var num = this.data.cart.list[id] || 0;
		if(num === 0 && n < 0){
			return;
		}
		this.data.cart.list[id] = num + n;
		this.countCart();
	},
	reduceCart: function (id) {
		var num = this.data.cart.list[id] || 0;
		if (num <= 1) {
			delete this.data.cart.list[id];
		} else {
			this.data.cart.list[id] = num - 1;
		}
		this.countCart();
	},
	countCart: function () {
		var count = 0,
			total = 0;
		for (var id in this.data.cart.list) {
			var goods = this.data.goods[id];
			count += this.data.cart.list[id];
			total += goods.price * this.data.cart.list[id];
		}
		this.data.cart.count = count;
		this.data.cart.total = total;
		this.setData({
			cart: this.data.cart
		});
	},
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
			len = this.data.goodsList.length;
		this.data.goodsList.forEach(function (classify, i) {
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
    util.navigateTo({
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
  }
});

