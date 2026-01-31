
import { Product, Category, Banner, GuideItem, GuideTreeSection } from './types';

export const MAIN_NAV: Category[] = [
  { id: 'guide', name: '装修指南', icon: 'fa-book', target: 'guide' },
  { id: 'eval', name: '建材评测', icon: 'fa-vial' },
  { id: 'promo', name: '可能关心的内容', icon: 'fa-heart' },
  { id: 'cases', name: '样例赏析', icon: 'fa-layer-group' },
  { id: 'story', name: '装修故事', icon: 'fa-home' },
];

export const CONTENT_TABS = [
  { id: 'all', name: '全部' },
  { id: 'recommend', name: '推荐' },
  { id: 'guide', name: '装修指南' },
  { id: 'eval', name: '建材评测' },
  { id: 'promo', name: '商品推介' },
  { id: 'cases', name: '样例赏析' },
  { id: 'story', name: '装修故事' },
];

export const DECORATION_GUIDE_TREE: GuideTreeSection[] = [
  {
    id: 'prep', title: '装修准备', icon: 'fa-clipboard-list',
    nodes: [
      { id: 'p1', title: '装修全流程大图：新手必收藏', importance: 'primary', children: [
        { id: 'p1-1', title: '设计阶段：确定风格与需求', importance: 'secondary' },
        { id: 'p1-2', title: '施工阶段：工期进度把控', importance: 'secondary' }
      ]},
      { id: 'p2', title: '半包、全包、清包深度优劣对比', importance: 'primary' },
      { id: 'p3', title: '2024装修预算分配“黄金比例”', importance: 'secondary' },
      { id: 'p4', title: '如何选择靠谱装修公司避坑指南', importance: 'primary' },
      { id: 'p5', title: '量房要注意的10个尺寸细节', importance: 'secondary' },
      { id: 'p6', title: '装修合同常见漏洞深度解析', importance: 'secondary' },
      { id: 'p7', title: '开工前的物业手续办理流程', importance: 'secondary' },
      { id: 'p8', title: '旧房拆改的加固与安全常识', importance: 'secondary' },
      { id: 'p9', title: '家人的居住习惯深度调研表', importance: 'secondary' },
      { id: 'p10', title: '装修贷款申请与利率对比', importance: 'secondary' }
    ]
  },
  {
    id: 'design', title: '室内设计', icon: 'fa-pencil-ruler',
    nodes: [
      { id: 'd1', title: '现代奶油风设计要点及配色方案', importance: 'primary' },
      { id: 'd2', title: '全屋灯光布局：无主灯设计深度指南', importance: 'primary' },
      { id: 'd3', title: '小户型显大：色彩与动线规划', importance: 'secondary' },
      { id: 'd4', title: '北欧、日式、法式风格区别全览', importance: 'secondary' },
      { id: 'd5', title: '收纳系统设计：从玄关到阳台', importance: 'secondary' },
      { id: 'd6', title: '开放式厨房的动线与油烟控制', importance: 'secondary' },
      { id: 'd7', title: '儿童房成长的多功能设计', importance: 'secondary' },
      { id: 'd8', title: '软硬装颜色呼应的“三色法则”', importance: 'secondary' },
      { id: 'd9', title: '背景墙材质：木饰面vs岩板vs涂料', importance: 'secondary' },
      { id: 'd10', title: '阳台改成书房/家政区的设计思路', importance: 'secondary' }
    ]
  },
  {
    id: 'utility', title: '墙改水电', icon: 'fa-bolt',
    nodes: [
      { id: 'u1', title: '强弱电箱位置规划及回路划分', importance: 'primary' },
      { id: 'u2', title: '全屋插座预留高度标准（图解）', importance: 'primary' },
      { id: 'u3', title: '水路走顶还是走地的终极选择', importance: 'secondary' },
      { id: 'u4', title: '中央空调与新风系统的点位对接', importance: 'secondary' },
      { id: 'u5', title: '智能家居网关与零火线预留', importance: 'secondary' },
      { id: 'u6', title: '热水循环泵铺设与零冷水方案', importance: 'secondary' },
      { id: 'u7', title: '厨卫排水管静音处理包管工艺', importance: 'secondary' },
      { id: 'u8', title: '软水机与净水系统的管路预留', importance: 'secondary' },
      { id: 'u9', title: '水电验收必查的10项隐蔽工程', importance: 'secondary' },
      { id: 'u10', title: '墙面横槽的禁忌与施工规范', importance: 'secondary' }
    ]
  },
  {
    id: 'waterproof', title: '防水瓷砖', icon: 'fa-shower',
    nodes: [
      { id: 'w1', title: '卫生间防水涂刷标准教程', importance: 'primary' },
      { id: 'w2', title: '瓷砖背胶与粘结剂的使用误区', importance: 'secondary' },
      { id: 'w3', title: '大理石纹瓷砖连纹铺贴方案', importance: 'secondary' },
      { id: 'w4', title: '环氧彩砂 vs 传统填缝剂', importance: 'secondary' },
      { id: 'w5', title: '墙砖压地砖工艺（压口细节）', importance: 'secondary' },
      { id: 'w6', title: '浴室闭水试验的24/48小时标准', importance: 'secondary' },
      { id: 'w7', title: '防滑砖、柔光砖、亮面砖选择', importance: 'secondary' },
      { id: 'w8', title: '波导线与过门石的搭配美学', importance: 'secondary' },
      { id: 'w9', title: '墙面空鼓率的检测与预防', importance: 'secondary' },
      { id: 'w10', title: '窗台石安装与密封防水处理', importance: 'secondary' }
    ]
  },
  {
    id: 'wood', title: '全屋木制', icon: 'fa-tree',
    nodes: [
      { id: 'wd1', title: '定制柜体板材环保级别分类', importance: 'primary' },
      { id: 'wd2', title: '隐形门施工细节及五金选购', importance: 'secondary' },
      { id: 'wd3', title: '全屋定制避坑：封边工艺对比', importance: 'secondary' },
      { id: 'wd4', title: '实木多层板 vs 欧松板 vs 颗粒板', importance: 'secondary' },
      { id: 'wd5', title: '衣柜内部分区：挂衣区与抽屉比', importance: 'secondary' },
      { id: 'wd6', title: '护墙板安装对墙面平整度的要求', importance: 'secondary' },
      { id: 'wd7', title: '木门安装与隔音胶条选配', importance: 'secondary' },
      { id: 'wd8', title: '极简无拉手设计的反弹器选购', importance: 'secondary' },
      { id: 'wd9', title: '橱柜高度计算：符合人体工程学', importance: 'secondary' },
      { id: 'wd10', title: '酒柜、展示柜的嵌入式灯带安装', importance: 'secondary' }
    ]
  },
  {
    id: 'paint', title: '墙面油漆', icon: 'fa-fill-drip',
    nodes: [
      { id: 'pa1', title: '五大乳胶漆品牌深度测评', importance: 'primary' },
      { id: 'pa2', title: '色卡选购：预防墙面颜色翻车', importance: 'primary' },
      { id: 'pa3', title: '艺术漆、微水泥与原木风搭配', importance: 'secondary' },
      { id: 'pa4', title: '腻子粉选购：耐水腻子的重要性', importance: 'secondary' },
      { id: 'pa5', title: '墙面开裂原因：网格布怎么贴', importance: 'secondary' },
      { id: 'pa6', title: '刷漆遍数：一底两面是最低标准', importance: 'secondary' },
      { id: 'pa7', title: '冬季/夏季施工对油漆干透的影响', importance: 'secondary' },
      { id: 'pa8', title: '墙顶面平整度验收：测距仪用法', importance: 'secondary' },
      { id: 'pa9', title: '彩色漆修补：调色漆的保存方法', importance: 'secondary' },
      { id: 'pa10', title: '黑板漆、投影漆的功能性应用', importance: 'secondary' }
    ]
  },
  {
    id: 'lighting', title: '开关灯具', icon: 'fa-lightbulb',
    nodes: [
      { id: 'l1', title: '线性灯带隐藏安装施工细节', importance: 'primary' },
      { id: 'l2', title: '智能开关面板接线图解', importance: 'secondary' },
      { id: 'l3', title: '色温选择：3000k vs 4000k', importance: 'secondary' },
      { id: 'l4', title: '显色指数 Ra90+ 的真实视感', importance: 'secondary' },
      { id: 'l5', title: '磁吸轨道灯的组装与自由组合', importance: 'secondary' },
      { id: 'l6', title: '主灯位改位：黄腊管与开槽规范', importance: 'secondary' },
      { id: 'l7', title: '射灯防眩光：黑杯还是深杯', importance: 'secondary' },
      { id: 'l8', title: '卫生间感应灯与防雾镜供电', importance: 'secondary' },
      { id: 'l9', title: '床头阅读灯的双控电路布置', importance: 'secondary' },
      { id: 'l10', title: '室外阳台与入户门灯的防雨', importance: 'secondary' }
    ]
  },
  {
    id: 'kitchen', title: '洁具厨具', icon: 'fa-sink',
    nodes: [
      { id: 'k1', title: '洗碗机预留尺寸及进出水位置', importance: 'primary' },
      { id: 'k2', title: '大单槽抽拉龙头的体验报告', importance: 'secondary' },
      { id: 'k3', title: '智能马桶选购：即热式还是储热', importance: 'secondary' },
      { id: 'k4', title: '集成灶与橱柜踢脚线的衔接', importance: 'secondary' },
      { id: 'k5', title: '浴室柜挂墙安装墙排工艺要求', importance: 'secondary' },
      { id: 'k6', title: '恒温花洒与燃气热水器的兼容', importance: 'secondary' },
      { id: 'k7', title: '厨房垃圾处理器的安装条件', importance: 'secondary' },
      { id: 'k8', title: '石英石 vs 岩板橱柜台面对比', importance: 'secondary' },
      { id: 'k9', title: '抽油烟机止逆阀的密封安装', importance: 'secondary' },
      { id: 'k10', title: '嵌入式烤箱/蒸箱的柜体预留', importance: 'secondary' }
    ]
  },
  {
    id: 'furniture', title: '地板家俱', icon: 'fa-chair',
    nodes: [
      { id: 'f1', title: '实木复合地板铺设工艺与找平', importance: 'primary' },
      { id: 'f2', title: '沙发材质：真皮还是猫抓布', importance: 'secondary' },
      { id: 'f3', title: '岩板餐桌防碎裂选购技巧', importance: 'secondary' },
      { id: 'f4', title: '床垫选择：独立袋装弹簧原理', importance: 'secondary' },
      { id: 'f5', title: '人体工学椅的核心支撑参数', importance: 'secondary' },
      { id: 'f6', title: '地板踢脚线：极简铝合金安装', importance: 'secondary' },
      { id: 'f7', title: '地暖环境下地板的热阻与环保', importance: 'secondary' },
      { id: 'f8', title: '全屋家具比例：1:3 黄金分割', importance: 'secondary' },
      { id: 'f9', title: '入户玄关柜的底部留空高度', importance: 'secondary' },
      { id: 'f10', title: '衣帽间步入式设计与除湿', importance: 'secondary' }
    ]
  },
  {
    id: 'appliances', title: '电器选购', icon: 'fa-tv',
    nodes: [
      { id: 'ap1', title: '嵌入式冰箱散热间隙预留方案', importance: 'primary' },
      { id: 'ap2', title: '2024 电视选购：MiniLED 还是 OLED', importance: 'secondary' },
      { id: 'ap3', title: '洗烘套装叠放支架与空间预留', importance: 'secondary' },
      { id: 'ap4', title: '空气净化器与全屋新风效率比', importance: 'secondary' },
      { id: 'ap5', title: '扫地机器人水箱版上下水改造', importance: 'secondary' },
      { id: 'ap6', title: '投影仪投影距离与流明参数', importance: 'secondary' },
      { id: 'ap7', title: '电压力锅、破壁机的收纳电器塔', importance: 'secondary' },
      { id: 'ap8', title: '智能窗帘电机与轨道预留尺寸', importance: 'secondary' },
      { id: 'ap9', title: '中央空调风口防结露处理', importance: 'secondary' },
      { id: 'ap10', title: '全屋WiFi6覆盖：AC+AP 组网', importance: 'secondary' }
    ]
  },
  {
    id: 'soft', title: '各式软装', icon: 'fa-couch',
    nodes: [
      { id: 's1', title: '窗帘材质遮光度对比实验', importance: 'primary' },
      { id: 's2', title: '挂画高度与比例的黄金法则', importance: 'secondary' },
      { id: 's3', title: '室内绿植选购：耐阴与空气净化', importance: 'secondary' },
      { id: 's4', title: '地毯搭配：色彩与家具的呼应', importance: 'secondary' },
      { id: 's5', title: '抱枕、搭巾的层次感堆叠技巧', importance: 'secondary' },
      { id: 's6', title: '香薰、摆件营造家居氛围感', importance: 'secondary' },
      { id: 's7', title: '桌旗与餐具的格调布置方案', importance: 'secondary' },
      { id: 's8', title: '装饰镜扩展空间视感的用法', importance: 'secondary' },
      { id: 's9', title: '墙面挂件：置物架与时钟搭配', importance: 'secondary' },
      { id: 's10', title: '床品面料：长绒棉 vs 真丝', importance: 'secondary' }
    ]
  },
  {
    id: 'others', title: '其他事项', icon: 'fa-ellipsis-h',
    nodes: [
      { id: 'o1', title: '装修开荒保洁深度检查细节', importance: 'primary' },
      { id: 'o2', title: '新房除甲醛：通风比绿植有效', importance: 'primary' },
      { id: 'o3', title: '乔迁仪式与入宅注意事项', importance: 'secondary' },
      { id: 'o4', title: '装修保修期内的维权方法', importance: 'secondary' },
      { id: 'o5', title: '燃气挂表与通气办理流程', importance: 'secondary' },
      { id: 'o6', title: '宽带移机与光纤入户位置', importance: 'secondary' },
      { id: 'o7', title: '成品保护：家具入场防磕碰', importance: 'secondary' },
      { id: 'o8', title: '施工尾款结算与发票管理', importance: 'secondary' },
      { id: 'o9', title: '居住一年后的家居优化建议', importance: 'secondary' },
      { id: 'o10', title: '小区邻里关系处理与装修噪音', importance: 'secondary' }
    ]
  }
];

export const GUIDE_POOL: GuideItem[] = [
  { id: 'g1', title: '奶油风装修配色全攻略', author: '家装小能手', authorAvatar: 'https://i.pravatar.cc/100?u=a1', cover: 'https://images.unsplash.com/photo-1616489953149-755e149d3ed8?auto=format&fit=crop&w=500&q=80', likes: '1.2k', category: '装修指南' },
  { id: 'g2', title: '水电改造千万别省钱', author: '硬核工头', authorAvatar: 'https://i.pravatar.cc/100?u=a2', cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=500&q=80', likes: '856', category: '装修指南' },
  { id: 'g3', title: '全屋瓷砖怎么挑？', author: '建材测评师', authorAvatar: 'https://i.pravatar.cc/100?u=a3', cover: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=500&q=80', likes: '2.4k', category: '建材评测' },
  { id: 'g4', title: '灯具选购避坑指南', author: '灯光设计师', authorAvatar: 'https://i.pravatar.cc/100?u=a4', cover: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=500&q=80', likes: '3.1k', category: '装修指南' },
  { id: 'g5', title: '现代简约风案例赏析', author: '空间摄影师', authorAvatar: 'https://i.pravatar.cc/100?u=a5', cover: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=500&q=80', likes: '5.2k', category: '样例赏析' },
  { id: 'g6', title: '50万装修账单公开', author: '小徐同学', authorAvatar: 'https://i.pravatar.cc/100?u=a6', cover: 'https://images.unsplash.com/photo-1554224155-16974a425555?auto=format&fit=crop&w=500&q=80', likes: '921', category: '装修故事' },
  { id: 'g7', title: '智能马桶选购心得', author: '家电评测王', authorAvatar: 'https://i.pravatar.cc/100?u=a7', cover: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&w=500&q=80', likes: '1.8k', category: '建材评测' },
  { id: 'g8', title: '极简沙发推荐', author: '软装博主', authorAvatar: 'https://i.pravatar.cc/100?u=a8', cover: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=80', likes: '750', category: '商品推介' },
  { id: 'g9', title: '阳台改书房绝绝子', author: '改造家', authorAvatar: 'https://i.pravatar.cc/100?u=a9', cover: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=500&q=80', likes: '2.1k', category: '样例赏析' },
  { id: 'g10', title: '硬装避坑100条', author: '老工长', authorAvatar: 'https://i.pravatar.cc/100?u=a10', cover: 'https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&w=500&q=80', likes: '4.4k', category: '装修指南' },
  { id: 'g11', title: '法式复古混搭现代', author: '艺术家Lily', authorAvatar: 'https://i.pravatar.cc/100?u=a11', cover: 'https://images.unsplash.com/photo-1615529151169-7b1ff50dc7f2?auto=format&fit=crop&w=500&q=80', likes: '6.7k', category: '装修故事' },
  { id: 'g12', title: '全屋定制板材对比', author: '木材专家', authorAvatar: 'https://i.pravatar.cc/100?u=a12', cover: 'https://images.unsplash.com/photo-1611486212354-9174095f9c42?auto=format&fit=crop&w=500&q=80', likes: '1.2k', category: '建材评测' },
  { id: 'g13', title: '磁吸轨道灯安装法', author: '电工阿强', authorAvatar: 'https://i.pravatar.cc/100?u=a13', cover: 'https://images.unsplash.com/photo-1517991104123-1d56a72ad0bd?auto=format&fit=crop&w=500&q=80', likes: '890', category: '装修指南' },
  { id: 'g14', title: '50平公寓天花板', author: '设计狮', authorAvatar: 'https://i.pravatar.cc/100?u=a14', cover: 'https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?auto=format&fit=crop&w=500&q=80', likes: '3.3k', category: '样例赏析' },
  { id: 'g15', title: '网红家居黑名单', author: '避坑指南', authorAvatar: 'https://i.pravatar.cc/100?u=a15', cover: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=500&q=80', likes: '1.1k', category: '商品推介' },
  { id: 'g16', title: '顶级家电清单', author: '极客少年', authorAvatar: 'https://i.pravatar.cc/100?u=a16', cover: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=500&q=80', likes: '2.5k', category: '装修故事' },
  { id: 'g17', title: '无主灯设计翻车现场', author: '灯光避雷针', authorAvatar: 'https://i.pravatar.cc/100?u=a17', cover: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=500&q=80', likes: '4.8k', category: '装修指南' },
  { id: 'g18', title: '进口涂料深度拆解', author: '化工男', authorAvatar: 'https://i.pravatar.cc/100?u=a18', cover: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=500&q=80', likes: '640', category: '建材评测' },
  { id: 'g19', title: '侘寂风别墅赏析', author: '顶级豪宅说', authorAvatar: 'https://i.pravatar.cc/100?u=a19', cover: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&w=500&q=80', likes: '9.1k', category: '样例赏析' },
  { id: 'g20', title: '装修隐形增项', author: '预算控制狂', authorAvatar: 'https://i.pravatar.cc/100?u=a20', cover: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=500&q=80', likes: '2.3k', category: '装修指南' },
  { id: 'g21', title: '智能窗帘实测', author: '数码宅', authorAvatar: 'https://i.pravatar.cc/100?u=a21', cover: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80', likes: '420', category: '商品推介' },
  { id: 'g22', title: '小两口8万穷装房', author: '生活家', authorAvatar: 'https://i.pravatar.cc/100?u=a22', cover: 'https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?auto=format&fit=crop&w=500&q=80', likes: '5.5k', category: '装修故事' },
];

export const ANNOUNCEMENTS = [
  { id: 1, title: '🔥 11.11 家装狂欢节即将开启！全场建材每满3000减500。', content: '11.11家装狂欢节详细规则：全场大牌建材参与，包含瓷砖、卫浴、灯具等。每满3000元立减500元，上不封顶！活动时间：11月1日至11月11日。' },
];

export const ARTICLES = [
  { id: 1, title: '2024最新瓷砖选购指南：教你如何避坑', cover: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=400&q=80', views: '2.5w' },
  { id: 2, title: '小户型如何扩容？这5个收纳设计真的绝了', cover: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=400&q=80', views: '1.8w' },
];

export const BANNERS: Banner[] = [
  { id: 1, image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80', link: '#' },
];

export const PRODUCTS: Product[] = [
  { id: '1', name: '哑光防滑柔光大理石瓷砖 800x800', price: 88, originalPrice: 128, image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=400&q=80', category: '瓷砖', tag: '热销', sales: '5000+' },
  { id: '2', name: '北欧简约全铜客厅吊灯 变色光', price: 1299, image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=400&q=80', category: '灯饰', tag: '爆款', sales: '800+' },
];
