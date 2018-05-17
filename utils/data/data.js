import { GET, POST } from './network';
const app = getApp();

module.exports = {
  getGoods(config) {
    config.url = '/booking/restaurant/items';
    config.params = { restaurant_id: app.globalData.shop.id }
    POST(config);
  },
  getCategories(config) {
    config.url = '/booking/restaurant/categories';
    config.params = { restaurant_id: app.globalData.shop.id }
    POST(config);
  },
  syncOrder(callBack) {
    let that = this;
    var config = {
      url : '/booking/order/syncorder',
      params : {
        restaurant_id: app.globalData.shop.id,
        table_num: app.globalData.table
      },
      success_0(res) {
        app.globalData.cart = res;
        callBack(true);
      },
      success_1(res) {
        callBack(false);
      }
    }
    POST(config);
  },
  getAddItem(items, callBack) {
    var config = {
      url: '/booking/order/additem',
      params: {
        restaurant_id: app.globalData.shop.id,
        table_num: app.globalData.table,
        item_detail: JSON.stringify({ 'data': items })
      },
      success_0(res) {
        app.globalData.cart = res;
        callBack(true);
      },
      success_1(res) {
        callBack(false);
      }
    }
    POST(config);
  },
  insertOrder(items, total, callBack) {
    var config = {
      url: '/booking/order/insert',
      params: {
        restaurantId: app.globalData.shop.id,
        tableNum: app.globalData.table,
        orderNum: app.globalData.cart.order_num,
        orderStatus: 0,
        items: JSON.stringify(items),
        total: total
      },
      success_0(res) {
        callBack(true);
      },
      success_1(res) {
        callBack(false);
      }
    }
    POST(config);
  }
}