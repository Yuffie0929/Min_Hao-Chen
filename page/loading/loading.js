const app = getApp();
const Data = require('../../utils/data/data');
const data = require('../../utils/data');
Page({
  data: {
  },
  onLoad: function (options) {
    let that = this;
    Promise.all([this.reqGoods(), this.reqCategories(), this.reqDiscount()]).then(function (res) {
      let goods = res[0];
      let categories = res[1];
      let discounts = res[2];

      if (discounts['CU_XIAO']) {
        Object.keys(discounts['CU_XIAO'].items).forEach((id) => {
          if (goods[id]) {
            goods[id].price = discounts['CU_XIAO'].items[id].sale_price;
          }
        });
      }

      Object.keys(goods).map((key)=>{
        let good = goods[key];
        categories = categories.map((category)=>{
          if(category.id === good.category){
            category.goods.push(good.id);
          }
          return category;
        })
      });

      categories = categories.filter((category)=>{
        return category.goods.length > 0;
      });

      app.globalData.categories = categories;
      app.globalData.goods = goods;
      app.globalData.discounts = discounts;
      that.reqTableOrder()
    }, function (res) {
      console.log(res);
    });
  },
  onShow: function () {

  },

  /*获取门店已有订单*/
  reqTableOrder() {
    let that = this;
    Data.syncOrder ((isDone)=>{
      if(isDone) {
        wx.redirectTo({
          url: '../shop/shop'
        })
      } else {
        setTimeout(() => {
          that.reqTableOrder();
        }, 2000)
      }
    })
  },
  /*获取品类信息*/
  reqCategories() {
    return new Promise((resolve, reject) => {
      Data.getCategories({
        success_0(res) {
          res = res.map((item)=>{
            item.goods = [];
            return item;
          });
          resolve(res);
        },
        success_1(res) {
          reject(res.msg || '未获取到品类信息');
        }
      })
    })
  },

  /*获取促销信息*/
  reqDiscount() {
    let that = this;
    return new Promise((resolve, reject) => {
      let discounts = data.discounts;
      if (discounts) {
        discounts = that.formatDiscount(discounts);
        resolve(discounts);
      } else {
        reject('未获取到促销信息')
      }
    });
  },
  formatDiscount(discounts) {
    let obj = {};
    discounts.map((discount) => {
      if (discount.type === 'CU_XIAO') {
        let obj = {};
        discount.items.map((item) => {
          obj[item.item_id] = item;
        });
        discount.items = obj;
      }
      obj[discount.type] = discount;
    });
    return obj;
  },


  /*获取商品信息*/
  reqGoods() {
    let that = this;
    return new Promise((resolve, reject) => {
      Data.getGoods({
        success_0(res) {
          let goods = that.formatGoodsData(res);

          resolve(goods);
        },
        success_1(res) {
          reject(res.msg || '未获取到商品信息');
        }
      })
    })
  },
  formatGoodsData(goods) {
    let obj = {};
    goods.map((good) => {
      good.pic = '../../images/web' + good.image + '.jpg';
      delete good.image;
      obj[good.id] = good;
    });
    return obj;
  },
});

