const goods = [
  {
    id: '101',
    name: '意大利经典 Italian B.M.T.™',
    description: '有人说意大利经典是赛百味最大、最多肉、最美味的一款三明治。热那亚式萨拉米香肠、意大利辣香肠和火腿切片造就的经典美味倍受青睐。',
    image: '101',
    sold: 1014,
    price: 22,
    unit: ''
  },
  {
    id: '102',
    name: '意大利香肠 Italian Sausage',
    description: '意大利风味香肠肉香汁浓，热烤奶酪入口即融，搭配喜欢的面包、酱料和蔬菜，味香萦绕齿间回味无穷。',
    image: '102',
    sold: 1029,
    price: 22,
    unit: ''
  },
  {
    id: '103',
    name: '香烤鸡排 Roasted Chicken',
    description: '柔嫩无骨的鸡排烤得恰到好处，配上自选的新鲜蔬菜和独特调味品，每日烘焙的面包，鲜香四溢。',
    image: '103',
    sold: 1030,
    price: 2,
    unit: ''
  },
  {
    id: '104',
    name: '火鸡胸 Turkey Breast',
    description: '柔嫩火鸡胸切片，配以自选的新鲜蔬菜和酱料，风味独特。搭配墨西哥辣椒，酸辣美味挡不住。',
    image: '104',
    sold: 1030,
    price: 2,
    unit: ''
  },
  {
    id: '105',
    name: '日式照烧鸡 Chicken Teriyaki',
    description: '在柔嫩的鸡肉切片上淋上少量照烧调味酱，搭配自选的新鲜蔬菜和调味品，一起裹入每日烘焙的面包，亚洲口味心动不已。',
    image: '105',
    sold: 1030,
    price: 2,
    unit: ''
  },
  {
    id: '106',
    name: '金枪鱼 Tuna',
    description: '金枪鱼与奶油蛋黄酱的混合，创造出世上最妙不可言的滋味。SUBWAY®赛百味金枪鱼三明治可自选新鲜蔬菜、调味品以及每日烘焙的各式面包。',
    image: '106',
    sold: 1030,
    price: 25,
    unit: ''
  },
  {
    id: '107',
    name: '香热奇士 Subway Melt™',
    description: '柔嫩的鸡胸肉，烟熏的火腿，松脆的培根，热融融的奶酪，配以清脆的蔬菜和独特的调味品，一切都融合在每日烘焙的面包内，这种美妙滋味只能意会不可言传。',
    image: '107',
    sold: 1030,
    price: 2,
    unit: ''
  },
  {
    id: '108',
    name: '香烤牛肉 Roast Beef',
    description: '一款受人欢迎的经典美味，低于6克脂肪含量，柔嫩的香烤牛肉切片搭配自选的新鲜蔬菜和调味品，更健康更美味。',
    image: '108',
    sold: 1030,
    price: 2,
    unit: ''
  },
  {
    id: '109',
    name: '奇士牛排 Steak & Cheese',
    description: '令人垂涎三尺的柔嫩牛排切片，佐以洋葱和青椒，覆上一层热融融的奶酪，再配上各种自选的新鲜蔬菜和调味品，夹在每日烘焙的面包里，热气腾腾，美味难敌。',
    image: '109',
    sold: 1030,
    price: 2,
    unit: ''
  },
  {
    id: '110',
    name: '百味俱乐部 Subway Club™',
    description: '柔嫩的精选鸡胸肉，烟熏的香烤牛肉，美味的火腿切片，每日烘焙的面包，配以自选的清脆蔬菜和调味品，真正的百味融合，舍我其谁！',
    image: '110',
    sold: 1030,
    price: 25,
    unit: ''
  },
  {
    id: '111',
    name: '火腿 Ham',
    description: '鲜嫩味美的火腿配上SUBWAY®赛百味餐厅特有的蜜汁芥末酱，搭配您自选最爱的蔬菜，美味难以阻挡',
    image: '111',
    sold: 1030,
    price: 18,
    unit: ''
  },
  {
    id: '112',
    name: '火鸡胸 Turkey Breast',
    description: '柔嫩火鸡胸切片，配以自选的新鲜蔬菜和酱料，风味独特。搭配墨西哥辣椒，酸辣美味挡不住。',
    image: '112',
    sold: 1030,
    price: 20,
    unit: ''
  },
  {
    id: '401',
    name: '双色巧克力甜饼',
    description: '每日下单，现烤甜饼',
    image: '401',
    sold: 1030,
    price: 4,
    unit: '个'
  },
  {
    id: '402',
    name: '燕麦提子甜饼',
    description: '每日下单，现烤甜饼',
    image: '402',
    sold: 1030,
    price: 4,
    unit: '个'
  },
  {
    id: '403',
    name: '单色巧克力甜饼',
    description: '每日下单，现烤甜饼。0克反式脂肪酸。',
    image: '403',
    sold: 1030,
    price: 4,
    unit: '个'
  },
  {
    id: '501',
    name: '百事可乐',
    description: '百事可乐',
    image: '501',
    sold: 1030,
    price: 6,
    unit: '听'
  },
  {
    id: '502',
    name: '都乐果汁苹果',
    description: '都乐果汁苹果',
    image: '502',
    sold: 1030,
    price: 8,
    unit: '瓶'
  },
  {
    id: '503',
    name: '都乐果汁葡萄',
    description: '都乐果汁葡萄',
    image: '503',
    sold: 1030,
    price: 8,
    unit: '瓶'
  },
];

const categories = [
  {
    id: 'hot',
    classifyName: '热销',
    goods: ['106']
  },
  {
    id: 'new',
    classifyName: '新品',
    goods: ['105']
  },
  {
    id: 'classics',
    classifyName: '经典',
    goods: ['101', '102', '103', '104', '105']
  },
  {
    id: 'premium',
    classifyName: '精选',
    goods: ['106', '107', '108', '109', '110']
  },
  {
    id: 'lowfat',
    classifyName: '低脂',
    goods: ['103', '108', '110', '111', '112']
  },
  /*{
    id: 'wrap',
    classifyName: '百味卷',
    goods: [3, 4]
  },
  {
    id: 'salad',
    classifyName: '沙拉',
    goods: [3, 4]
  },
  {
    id: 'catering',
    classifyName: '聚餐服务',
    goods: [3, 4]
  },*/
  {
    id: 'drinks',
    classifyName: '饮料',
    goods: ['501', '502', '503']
  },
  {
    id: 'sides',
    classifyName: '小食',
    goods: ['401', '402', '403']
  }
];

const cartList = [
  {
    id: '101',
    count: 2,
  },
  {
    id: '401',
    count: 1,
  },
  {
    id: '402',
    count: 1,
  },
  {
    id: '502',
    count: 2,
  }];

const discounts = [
  {
    id: '111',
    description: '菜品价格促销',
    restaurant_id: '',
    creat_date: '',
    begin_date: '',
    end_date: '',
    type: 'CU_XIAO',
    order_change: [],
    items: [
      {"item_id": "1", "sale_price": 2},
      {"item_id": "11", "sale_price": 15},
      {"item_id": "1111", "sale_price": 18}
      ],
    is_against: '222'
  },
  {
    id: '222',
    description: '满减活动',
    restaurant_id: '',
    creat_date: '',
    begin_date: '',
    end_date: '',
    type: 'MAN_JIAN',
    order_change: [
      {condition: 50, discount: 5},
      {condition: 80, discount: 10}
    ],
    items: [],
    is_against: '333'
  },
  {
    id: '333',
    description: '满折活动',
    restaurant_id: '',
    creat_date: '',
    begin_date: '',
    end_date: '',
    type: 'MAN_ZHE',
    order_change: [
      {condition: 30, discount: 9}, //折扣用下拉框选 1 1.5 2 2.5 3...
      {condition: 60, discount: 8}
    ],
    items: [],
    is_against: '222'
  },
];
/*获取门店信息*/
/*获取产品详情*/
/*获取品类详情*/
/*获取促销详情*/

/*菜品同步接口*/


module.exports = {
  goods,
  categories,
  cartList,
  discounts
};