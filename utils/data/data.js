import { GET, POST } from './network';

module.exports = {
  getGoods(config) {
    config.url = '/booking/restaurant/items';
    POST(config);
  },
  getCategories(config) {
    config.url = '/booking/restaurant/categories';
    POST(config);
  }
}