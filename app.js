App({
	onLaunch: function () {
		console.log('App Launch')
	},
	globalData: {
    servser_address: "http://localhost:8889",
    image_address: "http://192.168.1.11/sfa",
    tapFlag: true, /*检测0.5秒内是否有重复点击*/
    networkFlag: true, /*检测是否正在网络请求*/
    syncOrdering: false, //是否同步点餐
		syncOrderingTime: 5 * 1000, //同步间隔
		hasLogin: false,
	}
});
