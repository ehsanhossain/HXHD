import type { Locale } from './config';

/**
 * UI dictionary for the three site languages.
 *
 * Scope: navigation, chrome, calls to action, hero, section headings, footer
 * and page intros. Product names, grade codes and datasheet values stay in
 * English deliberately — they are manufacturer specifications and are quoted
 * that way in trade worldwide.
 *
 * `{n}` placeholders are substituted by the `t()` helper.
 */
export type Dict = typeof en;

const en = {
  // Utility bar
  'util.portfolio': 'Regional portfolio:',
  'util.china': 'China',
  'util.bangladesh': 'Bangladesh',
  'util.asean': 'ASEAN',

  // Navigation
  'nav.about': 'About Us',
  'nav.products': 'Products',
  'nav.services': 'Services',
  'nav.industries': 'Industries',
  'nav.knowledge': 'Knowledge',
  'nav.career': 'Careers',
  'nav.support': 'Support',
  'nav.home': 'Home',
  'nav.openMenu': 'Open menu',
  'nav.closeMenu': 'Close menu',
  'nav.searchProducts': 'Search products',
  'nav.chooseLanguage': 'Choose language',

  // Common actions
  'cta.requestSample': 'Request Sample',
  'cta.exploreProducts': 'Explore {n} Products',
  'cta.talkToTeam': 'Talk to Technical Team',
  'cta.callTeam': 'Call Technical Team',
  'cta.view': 'View',
  'cta.viewAll': 'View All {n} Products',
  'cta.viewProduct': 'View product',
  'cta.findProduct': 'Find Your Product',
  'cta.seeAll': 'See all products',
  'cta.startEnquiry': 'Start an enquiry',
  'cta.contact': 'Contact HXHD',
  'cta.distributor': 'Distributor Inquiry',
  'cta.browseCatalogue': 'Browse catalogue',
  'cta.subscribe': 'Subscribe',
  'cta.requestQuote': 'Request a Quote',
  'cta.datasheet': 'Datasheet',
  'cta.backToProducts': 'Back to all products',
  'cta.browseProducts': 'Browse Products',
  'cta.sendEnquiry': 'Send an Enquiry',

  // Hero — slide 1
  'hero.s1.eyebrow': 'Hubei Hongxing Hongda New Materials',
  'hero.s1.l1': 'Emulsion & functional',
  'hero.s1.l2': 'chemical solutions',
  'hero.s1.l3': 'that perform',
  // Hero copy is read in about a second before the slide turns, and on a phone
  // every extra line pushes the buttons off-screen. One idea per slide.
  'hero.s1.copy':
    'Polymer emulsions, waterproofing and coating systems — built for consistent performance and export-ready supply.',
  // Hero — slide 2
  'hero.s2.eyebrow': 'Waterproofing systems',
  'hero.s2.l1': 'Waterproofing that',
  'hero.s2.l2': 'holds under load',
  'hero.s2.l3': 'and low temperature',
  'hero.s2.copy':
    'Flexible to −15 °C and workable on damp substrates — for roofing, basements and infrastructure.',
  // Hero — slide 3
  'hero.s3.eyebrow': 'Architectural coatings',
  'hero.s3.l1': 'Exterior and interior',
  'hero.s3.l2': 'wall coatings',
  'hero.s3.l3': 'built to last',
  'hero.s3.copy':
    'Acrylic and styrene emulsions for exterior and interior walls — weather resistant, batch after batch.',
  // Hero — slide 4
  'hero.s4.eyebrow': 'Adhesives & bonding',
  'hero.s4.l1': 'Tile bonding and',
  'hero.s4.l2': 'surface adhesion',
  'hero.s4.l3': 'you can specify',
  'hero.s4.copy':
    'Ceramic tile adhesives and transparent bonding systems for durable adhesion on demanding substrates.',

  'hero.productsInCatalogue': 'Products in catalogue',
  'hero.pause': 'Pause slideshow',
  'hero.resume': 'Resume slideshow',
  'hero.chooseSlide': 'Choose slide',

  // Trust markers
  'trust.established': 'Established 2000',
  'trust.production': 'China + Bangladesh Production',
  'trust.oem': 'OEM / Custom Formulation',
  'trust.docs': 'Export-Ready Documentation',

  // Quick search strip
  'search.placeholder': 'Search by name, code or application',
  'search.quickFilters': 'Quick filters',
  'search.cataloguePlaceholder': 'Search by product name, code or application',
  'search.clear': 'Clear search',
  'search.label': 'Search',

  // Section headings
  'sec.applications': 'Applications',
  'sec.applicationsTitle': 'Solutions engineered for real-world applications',
  'sec.applicationsLead':
    'Select an application to explore the emulsion systems and compatible products we manufacture for it.',
  'sec.catalogue': 'Catalogue',
  'sec.popular': 'Popular products',
  'sec.company': 'The company',
  'sec.companyTitle': 'We make it happen',
  'sec.documentation': 'Documentation',
  'sec.knowledge': 'Knowledge',
  'sec.viewSolutions': 'View solutions',
  'sec.exploreAll': 'Explore the full catalogue',
  'sec.allProducts': 'All {n} products',

  // Footer
  'footer.supportTitle': 'Need documentation, samples or distributor support?',
  'footer.categories': 'Product Categories',
  'footer.services': 'Services',
  'footer.resources': 'Resources',
  'footer.contact': 'Contact',
  'footer.rights': 'All rights reserved.',
  'footer.tagline':
    'Hubei Hongxing Hongda New Materials Co., Ltd. — polymer emulsions, waterproofing systems, coatings and functional additives.',

  // Newsletter
  'news.title': 'Stay up to date with HXHD',
  'news.copy': 'Occasional updates on new grades, documentation and applications.',
  'news.emailLabel': 'Email address',
  'news.thanks': 'Thanks — subscribed as {email}.',

  // Products page
  'products.title': 'Products',
  'products.intro':
    '{n} products across {c} categories — emulsions, coatings, adhesives and functional additives.',
  'products.showing': 'Showing {a} of {b} products',
  'products.filtered': '(filtered)',
  'products.clearFilters': 'Clear filters',
  'products.filters': 'Filters',
  'products.reset': 'Reset',
  'products.category': 'Product category',
  'products.none': 'No products found',
  'products.noneHelp': 'Try a different search term or clear your filters.',
  'products.resetAll': 'Reset All Filters',
  'products.pagination': 'Product pagination',
  'products.prev': 'Previous page',
  'products.next': 'Next page',

  // Product detail
  'detail.keyCharacteristics': 'Key characteristics',
  'detail.description': 'Product description',
  'detail.technicalData': 'Technical data',
  'detail.moreIn': 'More in {category}',
  'detail.reviews': '({n} reviews)',

  // Page heroes
  'page.services.eyebrow': 'Services · Bangladesh',
  'page.services.title': 'Technical support and supply, delivered locally',
  'page.industries.eyebrow': 'Industries · Bangladesh',
  'page.industries.title': 'Materials for the sectors Bangladesh builds on',
  'page.knowledge.eyebrow': 'Knowledge',
  'page.knowledge.title': 'Guidance that supports better formulation decisions',
  'page.about.eyebrow': 'About HXHD',
  'page.about.title': 'Advancing polymer science and high-performance emulsions since 2000',
  'page.career.eyebrow': 'Careers at HXHD',
  'page.career.title': 'Shape the future of materials science and global manufacturing',
  'page.contact.eyebrow': 'Get in touch',
  'page.contact.title': 'Contact us',
};

const zh: Dict = {
  'util.portfolio': '区域业务：',
  'util.china': '中国',
  'util.bangladesh': '孟加拉国',
  'util.asean': '东盟',

  'nav.about': '关于我们',
  'nav.products': '产品',
  'nav.services': '服务',
  'nav.industries': '应用行业',
  'nav.knowledge': '知识中心',
  'nav.career': '招贤纳士',
  'nav.support': '支持',
  'nav.home': '首页',
  'nav.openMenu': '打开菜单',
  'nav.closeMenu': '关闭菜单',
  'nav.searchProducts': '搜索产品',
  'nav.chooseLanguage': '选择语言',

  'cta.requestSample': '索取样品',
  'cta.exploreProducts': '浏览 {n} 款产品',
  'cta.talkToTeam': '联系技术团队',
  'cta.callTeam': '致电技术团队',
  'cta.view': '查看',
  'cta.viewAll': '查看全部 {n} 款产品',
  'cta.viewProduct': '查看产品',
  'cta.findProduct': '查找产品',
  'cta.seeAll': '查看全部产品',
  'cta.startEnquiry': '发起询价',
  'cta.contact': '联系 HXHD',
  'cta.distributor': '经销商咨询',
  'cta.browseCatalogue': '浏览产品目录',
  'cta.subscribe': '订阅',
  'cta.requestQuote': '索取报价',
  'cta.datasheet': '技术资料',
  'cta.backToProducts': '返回全部产品',
  'cta.browseProducts': '浏览产品',
  'cta.sendEnquiry': '发送询盘',

  'hero.s1.eyebrow': '湖北红星宏达新材料',
  'hero.s1.l1': '高性能乳液与',
  'hero.s1.l2': '功能化学品',
  'hero.s1.l3': '解决方案',
  'hero.s1.copy':
    '聚合物乳液、防水与涂料体系——为稳定的配方性能与出口供应而生。',
  'hero.s2.eyebrow': '防水体系',
  'hero.s2.l1': '经得起荷载与',
  'hero.s2.l2': '低温考验的',
  'hero.s2.l3': '防水方案',
  'hero.s2.copy':
    '低温柔性达 −15 °C，可在潮湿基面施工——适用于屋面、地下室与基础设施。',
  'hero.s3.eyebrow': '建筑涂料',
  'hero.s3.l1': '内外墙涂料',
  'hero.s3.l2': '持久耐候',
  'hero.s3.l3': '品质稳定',
  'hero.s3.copy':
    '内外墙用丙烯酸与苯丙乳液——耐候性优异，批次间稳定可靠。',
  'hero.s4.eyebrow': '胶粘与粘结',
  'hero.s4.l1': '瓷砖粘结与',
  'hero.s4.l2': '表面附着力',
  'hero.s4.l3': '可按需指定',
  'hero.s4.copy':
    '瓷砖背涂胶与透明粘结体系——在复杂基面上实现耐久粘结。',

  'hero.productsInCatalogue': '目录产品数',
  'hero.pause': '暂停轮播',
  'hero.resume': '继续轮播',
  'hero.chooseSlide': '选择幻灯片',

  'trust.established': '成立于 2000 年',
  'trust.production': '中国 + 孟加拉国生产基地',
  'trust.oem': 'OEM / 定制配方',
  'trust.docs': '出口文件齐备',

  'search.placeholder': '按名称、型号或应用搜索',
  'search.quickFilters': '快速筛选',
  'search.cataloguePlaceholder': '按产品名称、型号或应用搜索',
  'search.clear': '清除搜索',
  'search.label': '搜索',

  'sec.applications': '应用领域',
  'sec.applicationsTitle': '面向实际工况设计的解决方案',
  'sec.applicationsLead': '选择应用领域，查看我们为其生产的乳液体系与配套产品。',
  'sec.catalogue': '产品目录',
  'sec.popular': '热门产品',
  'sec.company': '关于公司',
  'sec.companyTitle': '我们让它成为现实',
  'sec.documentation': '技术文件',
  'sec.knowledge': '知识中心',
  'sec.viewSolutions': '查看方案',
  'sec.exploreAll': '浏览完整目录',
  'sec.allProducts': '全部 {n} 款产品',

  'footer.supportTitle': '需要技术文件、样品或经销支持？',
  'footer.categories': '产品类别',
  'footer.services': '服务',
  'footer.resources': '资源',
  'footer.contact': '联系方式',
  'footer.rights': '版权所有。',
  'footer.tagline':
    '湖北红星宏达新材料有限公司——聚合物乳液、防水体系、涂料及功能助剂。',

  'news.title': '订阅 HXHD 最新动态',
  'news.copy': '不定期发送新品、技术文件与应用资讯。',
  'news.emailLabel': '电子邮箱',
  'news.thanks': '感谢订阅——已登记 {email}。',

  'products.title': '产品',
  'products.intro': '{c} 个产品类别，共 {n} 款产品——乳液、涂料、胶粘剂及功能助剂。',
  'products.showing': '显示 {b} 款中的 {a} 款',
  'products.filtered': '（已筛选）',
  'products.clearFilters': '清除筛选',
  'products.filters': '筛选',
  'products.reset': '重置',
  'products.category': '产品类别',
  'products.none': '未找到产品',
  'products.noneHelp': '请尝试其他关键词，或清除筛选条件。',
  'products.resetAll': '重置全部筛选',
  'products.pagination': '产品分页',
  'products.prev': '上一页',
  'products.next': '下一页',

  'detail.keyCharacteristics': '主要特性',
  'detail.description': '产品说明',
  'detail.technicalData': '技术参数',
  'detail.moreIn': '更多{category}产品',
  'detail.reviews': '（{n} 条评价）',

  'page.services.eyebrow': '服务 · 孟加拉国',
  'page.services.title': '本地化的技术支持与供应',
  'page.industries.eyebrow': '应用行业 · 孟加拉国',
  'page.industries.title': '服务孟加拉国支柱产业的材料',
  'page.knowledge.eyebrow': '知识中心',
  'page.knowledge.title': '助力更优配方决策的技术指南',
  'page.about.eyebrow': '关于宏星宏达',
  'page.about.title': '始于2000年，深耕高分子乳液与高性能材料',
  'page.career.eyebrow': '招贤纳士',
  'page.career.title': '加入我们，共同塑造材料科学与全球制造的未来',
  'page.contact.eyebrow': '联系我们',
  'page.contact.title': '联系我们',
};

const bn: Dict = {
  'util.portfolio': 'আঞ্চলিক পোর্টফোলিও:',
  'util.china': 'চীন',
  'util.bangladesh': 'বাংলাদেশ',
  'util.asean': 'আসিয়ান',

  'nav.about': 'আমাদের সম্পর্কে',
  'nav.products': 'পণ্য',
  'nav.services': 'সেবা',
  'nav.industries': 'শিল্পখাত',
  'nav.knowledge': 'জ্ঞানকেন্দ্র',
  'nav.career': 'ক্যারিয়ার',
  'nav.support': 'সহায়তা',
  'nav.home': 'হোম',
  'nav.openMenu': 'মেনু খুলুন',
  'nav.closeMenu': 'মেনু বন্ধ করুন',
  'nav.searchProducts': 'পণ্য খুঁজুন',
  'nav.chooseLanguage': 'ভাষা নির্বাচন করুন',

  'cta.requestSample': 'নমুনার অনুরোধ',
  'cta.exploreProducts': '{n} টি পণ্য দেখুন',
  'cta.talkToTeam': 'কারিগরি দলের সাথে কথা বলুন',
  'cta.callTeam': 'কারিগরি দলকে কল করুন',
  'cta.view': 'দেখুন',
  'cta.viewAll': 'সবগুলো {n} টি পণ্য দেখুন',
  'cta.viewProduct': 'পণ্য দেখুন',
  'cta.findProduct': 'আপনার পণ্য খুঁজুন',
  'cta.seeAll': 'সব পণ্য দেখুন',
  'cta.startEnquiry': 'অনুসন্ধান শুরু করুন',
  'cta.contact': 'HXHD-এর সাথে যোগাযোগ',
  'cta.distributor': 'পরিবেশক অনুসন্ধান',
  'cta.browseCatalogue': 'ক্যাটালগ দেখুন',
  'cta.subscribe': 'সাবস্ক্রাইব',
  'cta.requestQuote': 'কোটেশন চান',
  'cta.datasheet': 'ডেটাশিট',
  'cta.backToProducts': 'সব পণ্যে ফিরে যান',
  'cta.browseProducts': 'পণ্য দেখুন',
  'cta.sendEnquiry': 'অনুসন্ধান পাঠান',

  'hero.s1.eyebrow': 'হুবেই হংশিং হংদা নিউ ম্যাটেরিয়ালস',
  'hero.s1.l1': 'ইমালশন ও কার্যকরী',
  'hero.s1.l2': 'রাসায়নিক সমাধান',
  'hero.s1.l3': 'যা কাজ করে',
  'hero.s1.copy':
    'পলিমার ইমালশন, ওয়াটারপ্রুফিং ও কোটিং সিস্টেম — ধারাবাহিক পারফরম্যান্স ও রপ্তানি-প্রস্তুত সরবরাহের জন্য।',
  'hero.s2.eyebrow': 'ওয়াটারপ্রুফিং সিস্টেম',
  'hero.s2.l1': 'ভার ও নিম্ন তাপমাত্রায়',
  'hero.s2.l2': 'টিকে থাকা',
  'hero.s2.l3': 'ওয়াটারপ্রুফিং',
  'hero.s2.copy':
    '−১৫ °C পর্যন্ত নমনীয় ও ভেজা তলে প্রয়োগযোগ্য — ছাদ, বেসমেন্ট ও অবকাঠামোর জন্য।',
  'hero.s3.eyebrow': 'স্থাপত্য কোটিং',
  'hero.s3.l1': 'অভ্যন্তরীণ ও বাহ্যিক',
  'hero.s3.l2': 'দেয়াল কোটিং',
  'hero.s3.l3': 'দীর্ঘস্থায়ী মানের',
  'hero.s3.copy':
    'ভেতর ও বাইরের দেয়ালের জন্য অ্যাক্রিলিক ও স্টাইরিন ইমালশন — আবহাওয়া-প্রতিরোধী, প্রতি ব্যাচে সমান।',
  'hero.s4.eyebrow': 'আঠা ও বন্ধন',
  'hero.s4.l1': 'টাইল বন্ধন ও',
  'hero.s4.l2': 'পৃষ্ঠতলের আঠালোতা',
  'hero.s4.l3': 'আপনার স্পেসিফিকেশনে',
  'hero.s4.copy':
    'সিরামিক টাইল অ্যাডহেসিভ ও স্বচ্ছ বন্ধন সিস্টেম — কঠিন তলেও টেকসই আঠালোতা।',

  'hero.productsInCatalogue': 'ক্যাটালগে পণ্য',
  'hero.pause': 'স্লাইডশো বিরতি',
  'hero.resume': 'স্লাইডশো চালু করুন',
  'hero.chooseSlide': 'স্লাইড নির্বাচন করুন',

  'trust.established': '২০০০ সালে প্রতিষ্ঠিত',
  'trust.production': 'চীন ও বাংলাদেশে উৎপাদন',
  'trust.oem': 'OEM / কাস্টম ফর্মুলেশন',
  'trust.docs': 'রপ্তানি-প্রস্তুত ডকুমেন্টেশন',

  'search.placeholder': 'নাম, কোড বা প্রয়োগ অনুযায়ী খুঁজুন',
  'search.quickFilters': 'দ্রুত ফিল্টার',
  'search.cataloguePlaceholder': 'পণ্যের নাম, কোড বা প্রয়োগ অনুযায়ী খুঁজুন',
  'search.clear': 'সার্চ মুছুন',
  'search.label': 'খুঁজুন',

  'sec.applications': 'প্রয়োগক্ষেত্র',
  'sec.applicationsTitle': 'বাস্তব প্রয়োগের জন্য প্রকৌশলকৃত সমাধান',
  'sec.applicationsLead':
    'একটি প্রয়োগক্ষেত্র বেছে নিন এবং আমরা তার জন্য যে ইমালশন সিস্টেম ও পণ্য তৈরি করি তা দেখুন।',
  'sec.catalogue': 'ক্যাটালগ',
  'sec.popular': 'জনপ্রিয় পণ্য',
  'sec.company': 'প্রতিষ্ঠান',
  'sec.companyTitle': 'আমরা তা বাস্তবে রূপ দিই',
  'sec.documentation': 'ডকুমেন্টেশন',
  'sec.knowledge': 'জ্ঞানকেন্দ্র',
  'sec.viewSolutions': 'সমাধান দেখুন',
  'sec.exploreAll': 'সম্পূর্ণ ক্যাটালগ দেখুন',
  'sec.allProducts': 'সবগুলো {n} টি পণ্য',

  'footer.supportTitle': 'ডকুমেন্টেশন, নমুনা বা পরিবেশক সহায়তা প্রয়োজন?',
  'footer.categories': 'পণ্য বিভাগ',
  'footer.services': 'সেবা',
  'footer.resources': 'রিসোর্স',
  'footer.contact': 'যোগাযোগ',
  'footer.rights': 'সর্বস্বত্ব সংরক্ষিত।',
  'footer.tagline':
    'হুবেই হংশিং হংদা নিউ ম্যাটেরিয়ালস কোং লিমিটেড — পলিমার ইমালশন, ওয়াটারপ্রুফিং সিস্টেম, কোটিং ও কার্যকরী অ্যাডিটিভ।',

  'news.title': 'HXHD-এর সাথে আপডেট থাকুন',
  'news.copy': 'নতুন গ্রেড, ডকুমেন্টেশন ও প্রয়োগ নিয়ে মাঝে মাঝে আপডেট।',
  'news.emailLabel': 'ইমেইল ঠিকানা',
  'news.thanks': 'ধন্যবাদ — {email} দিয়ে সাবস্ক্রাইব করা হয়েছে।',

  'products.title': 'পণ্যসমূহ',
  'products.intro':
    '{c} টি বিভাগে {n} টি পণ্য — ইমালশন, কোটিং, অ্যাডহেসিভ ও কার্যকরী অ্যাডিটিভ।',
  'products.showing': '{b} টির মধ্যে {a} টি পণ্য দেখানো হচ্ছে',
  'products.filtered': '(ফিল্টার করা)',
  'products.clearFilters': 'ফিল্টার মুছুন',
  'products.filters': 'ফিল্টার',
  'products.reset': 'রিসেট',
  'products.category': 'পণ্য বিভাগ',
  'products.none': 'কোনো পণ্য পাওয়া যায়নি',
  'products.noneHelp': 'অন্য কিছু লিখে দেখুন অথবা ফিল্টার মুছে দিন।',
  'products.resetAll': 'সব ফিল্টার রিসেট',
  'products.pagination': 'পণ্য পেজিনেশন',
  'products.prev': 'পূর্ববর্তী পাতা',
  'products.next': 'পরবর্তী পাতা',

  'detail.keyCharacteristics': 'প্রধান বৈশিষ্ট্য',
  'detail.description': 'পণ্যের বিবরণ',
  'detail.technicalData': 'কারিগরি তথ্য',
  'detail.moreIn': '{category} বিভাগে আরও',
  'detail.reviews': '({n} টি রিভিউ)',

  'page.services.eyebrow': 'সেবা · বাংলাদেশ',
  'page.services.title': 'স্থানীয়ভাবে কারিগরি সহায়তা ও সরবরাহ',
  'page.industries.eyebrow': 'শিল্পখাত · বাংলাদেশ',
  'page.industries.title': 'বাংলাদেশ যে খাতগুলোর ওপর গড়ে উঠছে, তার উপকরণ',
  'page.knowledge.eyebrow': 'জ্ঞানকেন্দ্র',
  'page.knowledge.title': 'উন্নত ফর্মুলেশন সিদ্ধান্তে সহায়ক নির্দেশনা',
  'page.about.eyebrow': 'এইচএক্সএইচডি সম্পর্কে',
  'page.about.title': '২০০০ সাল থেকে পলিমার বিজ্ঞান ও উচ্চমানের ইমালশনে অগ্রগামী',
  'page.career.eyebrow': 'এইচএক্সএইচডি-তে ক্যারিয়ার',
  'page.career.title': 'উপকরণ বিজ্ঞান এবং বিশ্বব্যাপী উৎপাদনের ভবিষ্যৎ গড়ুন',
  'page.contact.eyebrow': 'যোগাযোগ করুন',
  'page.contact.title': 'যোগাযোগ',
};

export const DICTIONARIES: Record<Locale, Dict> = { en, zh, bn };
