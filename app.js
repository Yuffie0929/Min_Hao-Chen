App({
	onLaunch: function () {
		console.log('App Launch');
	},
	globalData: {
		goods: {},
    categories: [],
    discounts: {},
    shop: {
      logo: '../../images/web/logo.jpg',
      name: '赛百味(复兴门百盛店)',
      desc: '专注味觉100年'
    },

    image_address: "http://192.168.1.11/sfa",
    tapFlag: true, /*检测0.5秒内是否有重复点击*/
    networkFlag: true, /*检测是否正在网络请求*/
    syncOrdering: false, //是否同步点餐
		syncOrderingTime: 5 * 1000, //同步间隔
		hasLogin: false,
	}
});
