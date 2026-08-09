import type { Locale } from './config';

/**
 * Translated titles and summaries for the published articles, keyed by the
 * article's URL slug. The articles themselves are published in English on
 * hxhdchemical.com — these translations describe them so a reader can decide
 * whether to follow the link.
 */
export interface ArticleCopy { title: string; summary: string }

export const ARTICLE_COPY: Partial<Record<Locale, Record<string, ArticleCopy>>> = {
  zh: {
  "acrylic-emulsion-in-architectural-coatings": {
    "title": "建筑涂料中的丙烯酸乳液",
    "summary": "丙烯酸乳液作为建筑涂料体系基料的性能表现，及其对耐久性与饰面效果的影响。"
  },
  "what-are-the-differences-between-silicone-acrylic-pure-acrylic-and-styrene-acrylic-emulsions": {
    "title": "硅丙、纯丙与苯丙乳液有何区别？",
    "summary": "三大乳液体系的横向对比，以及各自最适用的选型场景。"
  },
  "what-is-the-difference-between-pure-acrylic-and-styrene-acrylic-emulsion": {
    "title": "纯丙与苯丙乳液的区别是什么？",
    "summary": "纯丙与苯丙体系在耐候性、成本与性能之间的权衡。"
  },
  "differences-between-water-based-acrylic-resin-and-water-based-acrylic-emulsion": {
    "title": "水性丙烯酸树脂与水性丙烯酸乳液的区别",
    "summary": "厘清两个常被混用、实则指代不同材料的术语。"
  },
  "how-is-acrylic-emulsion-produced": {
    "title": "丙烯酸乳液是如何生产的",
    "summary": "乳液聚合工艺路线——乳化、共聚、后处理与灌装。"
  },
  "introduction-of-rust-removal-converter": {
    "title": "除锈转化剂简介",
    "summary": "除锈转化剂如何将金属表面既有锈层转化为稳定的底漆层。"
  },
  "the-three-day-china-coating-show-2025-came-to-a-successful-conclusion": {
    "title": "为期三天的 2025 中国涂料展圆满落幕",
    "summary": "红星宏达在为期三天的展会上展示了乳液与防水产品体系。"
  },
  "hubei-hongxing-hongda-new-materials-co-ltd-production-line-with-annual-output-capacity-of-200-000-tons-of-water-based-emulsion-and-5-000-tons-of-vinylidene-chloride-copolymer": {
    "title": "湖北红星宏达生产线：年产 20 万吨水性乳液与 5000 吨偏氯乙烯共聚乳液",
    "summary": "16 条水性乳液自动化生产线与 4 条偏氯乙烯共聚生产线，配备 DCS 过程控制及污水与废气处理设施。"
  },
  "hongxing-hongda-cooperates-with-keshun-waterproof-technology-co-ltd-to-bring-a-new-future-of-the-industry": {
    "title": "红星宏达与科顺防水科技达成战略合作",
    "summary": "双方就防水涂料领域的深度合作签署战略合作协议。"
  },
  "hongxing-hongda-plans-to-invest-1-6-billion-yuan-to-build-a-new-emulsion-production-plant-with-output-capacity-510000-tons-year": {
    "title": "红星宏达拟投资 16 亿元新建乳液产能",
    "summary": "11 亿元用于年产 40 万吨水性乳液与 6 万吨丁苯乳液，另有 5 亿元用于年产 5 万吨偏氯乙烯共聚乳液。"
  },
  "hongxing-hongda-will-establish-a-new-plant-in-bangladesh": {
    "title": "红星宏达将在孟加拉国新建工厂",
    "summary": "与明达共同投资 7641 万美元，在孟加拉国吉大港米尔萨莱 BEPZA 经济区建厂，预计创造 500 个以上本地岗位。"
  }
},
  bn: {
  "acrylic-emulsion-in-architectural-coatings": {
    "title": "স্থাপত্য কোটিংয়ে অ্যাক্রিলিক ইমালশন",
    "summary": "স্থাপত্য পেইন্ট সিস্টেমে বাইন্ডার হিসেবে অ্যাক্রিলিক ইমালশনের আচরণ এবং স্থায়িত্ব ও ফিনিশে তার প্রভাব।"
  },
  "what-are-the-differences-between-silicone-acrylic-pure-acrylic-and-styrene-acrylic-emulsions": {
    "title": "সিলিকন-অ্যাক্রিলিক, পিওর অ্যাক্রিলিক ও স্টাইরিন-অ্যাক্রিলিক ইমালশনের পার্থক্য কী?",
    "summary": "তিনটি প্রধান ইমালশন রসায়নের পাশাপাশি তুলনা এবং কোনটি কোথায় সঠিক নির্বাচন।"
  },
  "what-is-the-difference-between-pure-acrylic-and-styrene-acrylic-emulsion": {
    "title": "পিওর অ্যাক্রিলিক ও স্টাইরিন অ্যাক্রিলিকের পার্থক্য কী?",
    "summary": "পিওর অ্যাক্রিলিক ও স্টাইরিন অ্যাক্রিলিক সিস্টেমে আবহাওয়া সহনশীলতা, খরচ ও পারফরম্যান্সের ভারসাম্য।"
  },
  "differences-between-water-based-acrylic-resin-and-water-based-acrylic-emulsion": {
    "title": "পানি-ভিত্তিক অ্যাক্রিলিক রেজিন ও অ্যাক্রিলিক ইমালশনের পার্থক্য",
    "summary": "প্রায়ই একই অর্থে ব্যবহৃত অথচ ভিন্ন উপাদান বোঝায় এমন দুটি শব্দের ব্যাখ্যা।"
  },
  "how-is-acrylic-emulsion-produced": {
    "title": "অ্যাক্রিলিক ইমালশন কীভাবে তৈরি হয়",
    "summary": "ইমালশন পলিমারাইজেশন প্রক্রিয়া — ইমালসিফিকেশন, কোপলিমারাইজেশন, পোস্ট-ট্রিটমেন্ট ও ফিলিং।"
  },
  "introduction-of-rust-removal-converter": {
    "title": "রাস্ট রিমুভাল কনভার্টার পরিচিতি",
    "summary": "রাস্ট কনভার্টার কীভাবে ধাতব পৃষ্ঠের বিদ্যমান মরিচাকে স্থিতিশীল প্রাইমার স্তরে রূপান্তরিত করে।"
  },
  "the-three-day-china-coating-show-2025-came-to-a-successful-conclusion": {
    "title": "তিন দিনব্যাপী চায়না কোটিং শো ২০২৫ সফলভাবে সম্পন্ন",
    "summary": "হংশিং হংদা তিন দিনের শোতে তার ইমালশন ও ওয়াটারপ্রুফিং পোর্টফোলিও প্রদর্শন করে।"
  },
  "hubei-hongxing-hongda-new-materials-co-ltd-production-line-with-annual-output-capacity-of-200-000-tons-of-water-based-emulsion-and-5-000-tons-of-vinylidene-chloride-copolymer": {
    "title": "হুবেই হংশিং হংদা উৎপাদন লাইন: বছরে ২,০০,০০০ টন পানি-ভিত্তিক ইমালশন ও ৫,০০০ টন VDC কোপলিমার",
    "summary": "১৬টি স্বয়ংক্রিয় পানি-ভিত্তিক ইমালশন লাইন ও ৪টি VDC কোপলিমার লাইন, DCS প্রক্রিয়া নিয়ন্ত্রণ এবং বর্জ্য পানি ও গ্যাস শোধন ব্যবস্থাসহ।"
  },
  "hongxing-hongda-cooperates-with-keshun-waterproof-technology-co-ltd-to-bring-a-new-future-of-the-industry": {
    "title": "হংশিং হংদা ও কেশুন ওয়াটারপ্রুফ টেকনোলজির কৌশলগত সহযোগিতা",
    "summary": "ওয়াটারপ্রুফ কোটিং ক্ষেত্রে গভীর সহযোগিতার জন্য কৌশলগত চুক্তি।"
  },
  "hongxing-hongda-plans-to-invest-1-6-billion-yuan-to-build-a-new-emulsion-production-plant-with-output-capacity-510000-tons-year": {
    "title": "হংশিং হংদা নতুন ইমালশন সক্ষমতায় ১.৬ বিলিয়ন ইউয়ান বিনিয়োগের পরিকল্পনা",
    "summary": "বছরে ৪,০০,০০০ টন পানি-ভিত্তিক ও ৬০,০০০ টন বিউটাডাইন ইমালশনের জন্য ১.১ বিলিয়ন ইউয়ান, সাথে ৫০,০০০ টন VDC কোপলিমারের জন্য ৫০০ মিলিয়ন ইউয়ান।"
  },
  "hongxing-hongda-will-establish-a-new-plant-in-bangladesh": {
    "title": "হংশিং হংদা বাংলাদেশে নতুন কারখানা স্থাপন করবে",
    "summary": "মিংদার সাথে ৭৬.৪১ মিলিয়ন ডলার বিনিয়োগে চট্টগ্রামের মিরসরাই BEPZA অর্থনৈতিক অঞ্চলে কারখানা, ৫০০+ স্থানীয় কর্মসংস্থান।"
  }
},
};

/** Pulls the slug out of a full article href. */
export function articleSlug(href: string): string {
  return href.replace(/\/$/, '').split('/').pop() ?? '';
}

export function localizedArticle(
  locale: Locale,
  href: string,
  fallback: ArticleCopy
): ArticleCopy {
  return ARTICLE_COPY[locale]?.[articleSlug(href)] ?? fallback;
}
