import type { Locale } from './config';

/**
 * Translated product card summaries, keyed by slug.
 *
 * The source summaries are marketing blurbs from hxhdchemical.com; these are
 * faithful renderings, not machine output. Product NAMES and grade codes stay
 * in English deliberately — they are manufacturer SKUs quoted that way in trade.
 *
 * Generated against the slugs in src/data/products.ts; a slug that no longer
 * exists simply falls through to the English summary.
 */
export const PRODUCT_SUMMARIES: Partial<Record<Locale, Record<string, string>>> = {
  zh: {
  "acrylic-and-styrene-architectural-emulsion-hx302-for-exterior-and-interior-wall-coating": "优质建筑乳液 HX-302，适用于各类涂装需求。耐久、环保、易于施工，助您获得专业级饰面效果。",
  "acrylic-and-styrene-architectural-emulsion-hx302-for-fast-drying-exterior-and-interior-wall-coating": "建筑乳液 HX-300，为您的项目提供高品质、耐久且持久的建筑表面涂装解决方案。",
  "architectural-emulsion-hx-300-product": "需要抗碱底漆？HX-K66 提供耐久持久的解决方案，适用于多种基面。",
  "architectural-emulsion-hx-302g-product": "高品质建筑乳液 HX-302G，遮盖力优异、耐久持久，满足各类涂装需求。",
  "architectural-emulsion-hx-303ha-product": "高品质建筑乳液 HX-303HA，成膜平滑、遮盖力出色，适用于各类涂装需求。",
  "architectural-emulsion-hx-305-product": "建筑乳液 HX-305，高品质涂料产品，为建筑表面带来耐久且美观的饰面效果。",
  "modified-acrylic-and-styrene-architectural-emulsion-hx303-for-middle-and-top-grade-exterior-and-interior-wall-coating": "优质建筑乳液 HX-303，成膜美观耐久，适用于内外墙涂装。",
  "ceramic-tile-adhesive-hx-3086-product": "高品质瓷砖背涂胶 HX-3086，粘结强度高、耐久性好，满足各类铺贴需求。",
  "strong-and-reliable-ceramic-tile-adhesive-hx3086": "高品质瓷砖背涂胶 HX-3086A，强度与耐久性优异，满足各类铺贴需求。",
  "environment-friendly-anti-mould-and-anti-bacteria-interior-wall-paint": "高品质内墙涂料，多种颜色与饰面可选，满足不同风格与预算需求。",
  "rg-waterproof-coating-hey-100-rg-product": "RG 防水涂料 HEY-100 RG，提供出色的防水保护，抵御水损侵蚀。",
  "anti-oxidation-rust-converting-agent-800ab-to-convert-rust-into-primer-for-metal-surface": "除锈转化剂 800AB，除锈处理高效，使用便捷，节省工时与成本。",
  "steel-iron-oxidation-resistant-and-rust-fixing-agent-900a-900b": "900A/900B 锈稳定剂，有效防止锈蚀，提供持久防护。",
  "anti-alkali-anti-cracking-and-anti-mould-waterproof-sand-fixing-agent-500a-500b": "固砂剂 500A/500B，效果稳定持久，适用于抗碱、抗裂与防霉需求。",
  "sbs-liquid-coil-polyurethane-waterproof-coating-product": "SBS 液体卷材聚氨酯防水涂料，耐久持久，为各类基面提供可靠防水保护。",
  "create-natural-stone-effects-with-our-innovative-paint-solution": "仿石漆，为住宅或商业空间营造自然质朴的石材质感墙面。",
  "pure-acrylic-textile-emulsion-hx929-for-high-grade-silk-cotton-and-dupont-cotton": "高品质纺织乳液 HX-929，适用于织物印花，品质与性能俱佳。",
  "transparent-waterproof-adhesive-hx-3088-product": "透明防水胶 HX-3088，粘结与密封性能出色，适用于多种施工场景。",
  "transparent-waterproof-adhesive-hx-3088a-product": "透明防水胶 HX-3088A，粘结牢固、性能可靠、使用持久。",
  "environment-friendly-cement-wall-interface-treating-agent-wall-curing-agent-adhesive": "环保型水泥墙面界面处理剂（墙固），性能优异，适用于多种基面处理。",
  "acrylic-and-styrene-waterproof-emulsion-hx408-for-thermal-insulation-mortar-and-cement-waterproof-coating": "防水乳液 HX-408，成膜耐久防水，为各类基面提供可靠保护。",
  "acrylic-and-styrene-waterproof-emulsion-hx416-for-thermal-insulation-mortar-and-two-component-cement-waterproof-coating": "高品质防水乳液 HX-406A，为各类基面提供出色的防水与防护性能。",
  "elastic-acrylic-and-styrene-waterproof-emulsion-hx418-for-single-and-two-component-cement-waterproof-coating": "防水乳液 HX-418，耐久持久、防护可靠，是优质的防水解决方案。",
  "low-temperature-elastic-acrylic-and-styrene-waterproof-emulsion-hx416-for-thermal-insulation-mortar-and-cement-waterproof-coating": "高品质防水乳液 HX-416，耐久可靠，适用于多种应用场景。",
  "toilet-and-roof-acrylic-and-styrene-waterproof-emulsion-hx400-for-thermal-insulation-mortar-and-two-component-cement-waterproof-coating": "防水乳液 HX-400，耐久持久、性能可靠，满足各类防水需求。",
  "waterproof-emulsion-hx-406-product": "高品质防水乳液 HX-406，耐久可靠的防水解决方案。",
  "waterproof-emulsion-hx-416-1-product": "防水乳液 HX-416，为各类基面提供耐久持久的防水保护。",
  "waterproof-emulsion-hx470-for-anionic-cationic-and-non-ionic-emulsified-bitumen": "防水乳液 HX-470，品质稳定、耐久可靠，提供持久的防水保护。"
},
  bn: {
  "acrylic-and-styrene-architectural-emulsion-hx302-for-exterior-and-interior-wall-coating": "উন্নত মানের স্থাপত্য ইমালশন HX-302 — টেকসই, পরিবেশবান্ধব ও সহজে ব্যবহারযোগ্য, পেশাদার ফিনিশের জন্য।",
  "acrylic-and-styrene-architectural-emulsion-hx302-for-fast-drying-exterior-and-interior-wall-coating": "স্থাপত্য ইমালশন HX-300 — স্থাপত্য পৃষ্ঠতলের জন্য উচ্চমানের, টেকসই ও দীর্ঘস্থায়ী রঙের সমাধান।",
  "architectural-emulsion-hx-300-product": "ক্ষার-প্রতিরোধী প্রাইমার খুঁজছেন? HX-K66 বিভিন্ন পৃষ্ঠতলের জন্য টেকসই ও দীর্ঘস্থায়ী সমাধান দেয়।",
  "architectural-emulsion-hx-302g-product": "উচ্চমানের স্থাপত্য ইমালশন HX-302G — উন্নত কভারেজ ও দীর্ঘস্থায়ী স্থায়িত্ব, সব ধরনের রং করার কাজে উপযুক্ত।",
  "architectural-emulsion-hx-303ha-product": "উচ্চমানের স্থাপত্য ইমালশন HX-303HA — মসৃণ ফিনিশ ও চমৎকার কভারেজ।",
  "architectural-emulsion-hx-305-product": "স্থাপত্য ইমালশন HX-305 — উচ্চমানের রং, টেকসই ও নান্দনিক ফিনিশ।",
  "modified-acrylic-and-styrene-architectural-emulsion-hx303-for-middle-and-top-grade-exterior-and-interior-wall-coating": "প্রিমিয়াম স্থাপত্য ইমালশন HX-303 — সুন্দর ও টেকসই ফিনিশ, অভ্যন্তরীণ ও বাহ্যিক ব্যবহারে উপযুক্ত।",
  "ceramic-tile-adhesive-hx-3086-product": "উচ্চমানের সিরামিক টাইল অ্যাডহেসিভ HX-3086 — শক্তিশালী ও টেকসই বন্ধন, টাইলিংয়ের সব প্রয়োজনে।",
  "strong-and-reliable-ceramic-tile-adhesive-hx3086": "উচ্চমানের সিরামিক টাইল অ্যাডহেসিভ HX-3086A — উন্নত শক্তি ও স্থায়িত্ব, সব টাইলিং কাজে।",
  "environment-friendly-anti-mould-and-anti-bacteria-interior-wall-paint": "উচ্চমানের অভ্যন্তরীণ দেয়াল পেইন্ট — নানা রং ও ফিনিশ, রুচি ও বাজেট অনুযায়ী।",
  "rg-waterproof-coating-hey-100-rg-product": "RG ওয়াটারপ্রুফ কোটিং HEY-100 RG — পানির ক্ষতি থেকে উন্নত সুরক্ষা।",
  "anti-oxidation-rust-converting-agent-800ab-to-convert-rust-into-primer-for-metal-surface": "রাস্ট কনভার্টার 800AB — কার্যকর মরিচা প্রতিরোধ, সময় ও খরচ সাশ্রয়ী ও সহজে ব্যবহারযোগ্য।",
  "steel-iron-oxidation-resistant-and-rust-fixing-agent-900a-900b": "900A/900B রাস্ট স্ট্যাবিলাইজার — কার্যকর মরিচা প্রতিরোধ ও দীর্ঘস্থায়ী সুরক্ষা।",
  "anti-alkali-anti-cracking-and-anti-mould-waterproof-sand-fixing-agent-500a-500b": "স্যান্ড ফিক্সিং এজেন্ট 500A/500B — ক্ষার, ফাটল ও ছত্রাক প্রতিরোধে কার্যকর ও দীর্ঘস্থায়ী ফল।",
  "sbs-liquid-coil-polyurethane-waterproof-coating-product": "SBS লিকুইড কয়েল পলিইউরিথেন ওয়াটারপ্রুফ কোটিং — টেকসই ও দীর্ঘস্থায়ী ওয়াটারপ্রুফিং সমাধান।",
  "create-natural-stone-effects-with-our-innovative-paint-solution": "স্টোন-লাইক পেইন্ট দিয়ে দেয়ালে প্রাকৃতিক পাথরের অনুভূতি — বাড়ি বা ব্যবসা প্রতিষ্ঠানের জন্য।",
  "pure-acrylic-textile-emulsion-hx929-for-high-grade-silk-cotton-and-dupont-cotton": "উচ্চমানের টেক্সটাইল ইমালশন HX-929 — টেক্সটাইল প্রিন্টিংয়ে উন্নত মান ও পারফরম্যান্স।",
  "transparent-waterproof-adhesive-hx-3088-product": "স্বচ্ছ ওয়াটারপ্রুফ আঠা HX-3088 — বন্ধন ও সিলিংয়ের সব প্রয়োজনে উপযুক্ত।",
  "transparent-waterproof-adhesive-hx-3088a-product": "স্বচ্ছ ওয়াটারপ্রুফ আঠা HX-3088A — শক্তিশালী, নির্ভরযোগ্য ও দীর্ঘস্থায়ী বন্ধন।",
  "environment-friendly-cement-wall-interface-treating-agent-wall-curing-agent-adhesive": "পরিবেশবান্ধব সিমেন্ট ওয়াল ইন্টারফেস ট্রিটিং এজেন্ট — বিভিন্ন পৃষ্ঠতল প্রস্তুতিতে কার্যকর।",
  "acrylic-and-styrene-waterproof-emulsion-hx408-for-thermal-insulation-mortar-and-cement-waterproof-coating": "ওয়াটারপ্রুফ ইমালশন HX-408 — টেকসই ও পানি-প্রতিরোধী কোটিং, পৃষ্ঠতল সুরক্ষায়।",
  "acrylic-and-styrene-waterproof-emulsion-hx416-for-thermal-insulation-mortar-and-two-component-cement-waterproof-coating": "উচ্চমানের ওয়াটারপ্রুফ ইমালশন HX-406A — পৃষ্ঠতলের জন্য উন্নত ওয়াটারপ্রুফিং ও সুরক্ষা।",
  "elastic-acrylic-and-styrene-waterproof-emulsion-hx418-for-single-and-two-component-cement-waterproof-coating": "ওয়াটারপ্রুফ ইমালশন HX-418 — টেকসই, দীর্ঘস্থায়ী ও নির্ভরযোগ্য সুরক্ষা।",
  "low-temperature-elastic-acrylic-and-styrene-waterproof-emulsion-hx416-for-thermal-insulation-mortar-and-cement-waterproof-coating": "উচ্চমানের ওয়াটারপ্রুফ ইমালশন HX-416 — টেকসই ও নির্ভরযোগ্য, বিভিন্ন প্রয়োগে উপযুক্ত।",
  "toilet-and-roof-acrylic-and-styrene-waterproof-emulsion-hx400-for-thermal-insulation-mortar-and-two-component-cement-waterproof-coating": "ওয়াটারপ্রুফ ইমালশন HX-400 — টেকসই, দীর্ঘস্থায়ী ও নির্ভরযোগ্য ওয়াটারপ্রুফিং।",
  "waterproof-emulsion-hx-406-product": "উচ্চমানের ওয়াটারপ্রুফ ইমালশন HX-406 — টেকসই ওয়াটারপ্রুফিং সমাধান।",
  "waterproof-emulsion-hx-416-1-product": "ওয়াটারপ্রুফ ইমালশন HX-416 — যেকোনো পৃষ্ঠতলে টেকসই ও দীর্ঘস্থায়ী সুরক্ষা।",
  "waterproof-emulsion-hx470-for-anionic-cationic-and-non-ionic-emulsified-bitumen": "ওয়াটারপ্রুফ ইমালশন HX-470 — মান ও স্থায়িত্বে নির্ভরযোগ্য, দীর্ঘস্থায়ী সুরক্ষা।"
},
};

export function localizedSummary(locale: Locale, slug: string, fallback: string): string {
  return PRODUCT_SUMMARIES[locale]?.[slug] ?? fallback;
}
