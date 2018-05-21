import { GET, POST } from './network';
const app = getApp();

module.exports = {
  getStoreDetail(callBack) {
    let config = {
      url: '/booking/restaurant/detail',
      params: { restaurant_id: app.globalData.shop.id },
      success_0(res) {
        console.log(JSON.stringify(res));
        app.globalData.shop = res;
        callBack(true);
      },
      success_1(res) {
        callBack(false);
      }
    }
    POST(config);
  },
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

  getAddItem(items, callBack) {
    let config = {
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
    };
    POST(config);
  },
  syncOrder(callBack) {
    let config = {
      url: '/booking/order/syncorder',
      params: {
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
    };
    POST(config);
  },
  insertOrder(items, total, callBack) {
    let config = {
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
    };
    POST(config);
  }
}