import { GET, POST } from './network';

module.exports = {
  getGoods(config) {
    config.url = '/booking/restaurant/items';
    config.params = { restaurant_id: 1 }
    POST(config);
  },
  getCategories(config) {
    config.url = '/booking/restaurant/categories';
    config.params = {restaurant_id : 1}
    POST(config);
  }
}