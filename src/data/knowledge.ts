/**
 * Real articles published by HXHD, taken from the company news archive
 * (news_sitemap.xml, verified 2026-08-09). Titles, dates and body copy are as
 * published; `source` credits the original. Nothing here is invented.
 *
 * The body is stored as tagged blocks rather than HTML so the same content can
 * be rendered with our own typography and translated block by block.
 */

export type ArticleKind = 'Technical' | 'Company';

/** A paragraph, sub-heading, list item or pull quote within an article body. */
export interface Block {
  tag: 'p' | 'h' | 'li' | 'quote';
  text: string;
}

export interface Article {
  /** URL segment under /knowledge. */
  slug: string;
  title: string;
  kind: ArticleKind;
  date: string;
  /** ISO date for <time> and sorting. */
  iso: string;
  /** The original article on the group site, kept for attribution. */
  source: string;
  summary: string;
  topics: string[];
  body: Block[];
}

const BASE = 'https://www.hxhdchemical.com/news';

export const ARTICLES: Article[] = [
  {
    slug: 'acrylic-emulsion-in-architectural-coatings',
    title: 'Acrylic Emulsion in Architectural Coatings',
    kind: 'Technical',
    date: '3 Dec 2025',
    iso: '2025-12-03',
    source: `${BASE}/acrylic-emulsion-in-architectural-coatings/`,
    summary: 'How acrylic emulsions behave as the binder in architectural paint systems, and what that means for durability and finish.',
    topics: ['Architectural', 'Binders'],
    body: [
      { tag: 'p', text: 'Acrylic emulsions are widely used in architectural coatings due to their superior weather resistance, flexibility, and color retention. In both interior and exterior paints, acrylic emulsions serve as the binder that holds pigment particles together and ensures they adhere to surfaces. The excellent UV resistance of acrylic polymers makes them ideal for protecting buildings from sunlight degradation, chalking, and color fading.' },
      { tag: 'p', text: 'In addition, these emulsions offer strong water resistance once cured, which helps in preventing moisture penetration into the walls. This reduces problems like mold growth and paint blistering. Acrylic-based coatings also maintain elasticity, accommodating minor movements in building substrates without cracking, which is crucial for long-lasting finishes.' },
      { tag: 'p', text: 'With the push toward greener construction, low-VOC and zero-VOC acrylic emulsions have gained attention. These eco-friendly formulations help reduce harmful emissions indoors, making them suitable for residential and commercial spaces. Furthermore, they are compatible with a wide range of additives and co-binders, allowing for customization to meet specific durability, gloss, and scrub-resistance requirements.' },
      { tag: 'p', text: 'Overall, acrylic emulsions are essential in modern architecture, combining aesthetics, durability, and sustainability in one formulation.' },
    ],
  },
  {
    slug: 'what-are-the-differences-between-silicone-acrylic-pure-acrylic-and-styrene-acrylic-emulsions',
    title: 'What are the Differences Between Silicone-acrylic, Pure Acrylic and Styrene-acrylic Emulsions?',
    kind: 'Technical',
    date: '3 Dec 2025',
    iso: '2025-12-03',
    source: `${BASE}/what-are-the-differences-between-silicone-acrylic-pure-acrylic-and-styrene-acrylic-emulsions/`,
    summary: 'A side-by-side comparison of the three main emulsion chemistries and where each is the right specification.',
    topics: ['Selection', 'Chemistry'],
    body: [
      { tag: 'p', text: 'Silicone-acrylic emulsion is formed by polymerizing organosilicon monomers containing unsaturated bonds with acrylic monomers. The aim is to combine the high-temperature resistance, weather resistance, chemical resistance, hydrophobicity, low surface energy and non-polluting properties of silicone with the high color retention, flexibility and adhesion of acrylic resins to prepare environmentally friendly emulsions and coatings for buildings that are highly weather-resistant, water-resistant and anti-polluting. Silicone-acrylic is generally used in high-end silicone-acrylic exterior Latex Paint and real stone paint due to its good weather resistance and stain resistance, but its relatively high price.' },
      { tag: 'h', text: 'Advantages of silicone-acrylic emulsion:' },
      { tag: 'li', text: 'Silicone-acrylic emulsion has good water resistance, acid resistance, weather resistance, alkali resistance and stain resistance.' },
      { tag: 'li', text: 'Silicone-acrylic emulsion is composed of pure acrylic and silicon. The coating film does not turn yellow, is resistant to ultraviolet rays and aging.' },
      { tag: 'li', text: 'The film of silicone-acrylic emulsion is dense, tough, has high hardness and excellent resistance to water whitening.' },
      { tag: 'li', text: 'Silicone-acrylic emulsion has high gloss and good color rendering of real stone paint.' },
      { tag: 'p', text: 'Pure acrylic emulsion is a resin that is completely polymerized from acrylic monomers. Pure acrylic is generally used more for exterior walls due to its good weather resistance and moderate price.' },
      { tag: 'h', text: 'Advantages of pure acrylic emulsion:' },
      { tag: 'li', text: 'Non-toxic, non-corrosive, non-flammable, it is a water-based substance and not a dangerous good.' },
      { tag: 'li', text: 'Fine particle size, high gloss, excellent weather resistance, excellent anti-sticking property, and wide applicability.' },
      { tag: 'p', text: 'Styrene-acrylic emulsion is formed by the polymerization of styrene-based monomers and acrylic-based monomers. Styrene-acrylic is more commonly used for interior walls due to its average weather resistance and low price.' },
      { tag: 'h', text: 'Advantages of styrene-acrylic emulsion:' },
      { tag: 'li', text: 'The polymerization rate is fast, and the molecular weight of the product is high. The polymerization can be carried out at a relatively low temperature.' },
      { tag: 'li', text: 'The viscosity of styrene-acrylic emulsion polymerization is low, which is conducive to stirring, heat transfer, transportation and continuous production. Water is used as the medium, which is inexpensive and safe.' },
      { tag: 'li', text: 'It is conducive to the direct application of styrene-acrylic emulsion polymerization and the production of environmentally friendly products, such as water-based paint, adhesives, paper, leather, fabric treatment agents, etc.' },
      { tag: 'p', text: 'The utilization rate of styrene-acrylic emulsion is more stable and effective than the other products.' },
    ],
  },
  {
    slug: 'what-is-the-difference-between-pure-acrylic-and-styrene-acrylic-emulsion',
    title: 'What Is The Difference Between Pure Acrylic And Styrene Acrylic (Emulsion)?',
    kind: 'Technical',
    date: '3 Dec 2025',
    iso: '2025-12-03',
    source: `${BASE}/what-is-the-difference-between-pure-acrylic-and-styrene-acrylic-emulsion/`,
    summary: 'Weathering, cost and performance trade-offs between pure acrylic and styrene acrylic systems.',
    topics: ['Selection', 'Chemistry'],
    body: [
      { tag: 'p', text: 'Pure acrylic and styrene acrylic are both paint formulations used in a wide range of applications, including paint and coatings, craft projects, and DIY home projects, like interior and Exterior Wall Painting projects.' },
      { tag: 'p', text: 'Although they are similar in some ways, these two paint formulations have distinct differences. The most significant difference between pure acrylic and styrene acrylic is the type of resin used in their formulation. They also differ in chemical content, cost, properties, and applications.' },
      { tag: 'p', text: 'Pure acrylic is a type of emulsion made with a high concentration of acrylic resin, usually more than 90%. This emulsion is known for its long-lasting performance, vibrant color pigments, durability, and resistance to fading over time.' },
      { tag: 'p', text: 'Pure Acrylic Paints dry to a firm, glossy finish and offer vibrant and long-lasting colors. They are incredibly versatile and can be dispersed with water for different effects or layered for texture. These paints can also be mixed with other mediums to form various techniques and finishes.' },
      { tag: 'p', text: 'Pure acrylic is typically used in professional arts, craft projects, automotive and architectural applications, and industrial applications. They can be used on various surfaces, including wall,plastic, wood, metal, and canvas. Pure acrylic paints are more expensive than styrene acrylic.' },
      { tag: 'p', text: 'Styrene acrylic, is a type of emulsion that combines acrylic resin with styrene. This means it features the properties of both styrene and acrylic resins. When styrene is added to acrylic resin, it can enhance the flow, flexibility, and adhesion of the paint. This makes it easier to apply and work with the paint. Despite that, they offer outstanding performance and are suitable for a wide range of applications.' },
      { tag: 'p', text: 'Styrene acrylics can be used in texture coatings, and home improvement projects. These paints offer good coverage, durability, flexibility, and color saturation. They are available in an array of colors and can be thinned with water for varying effects.' },
      { tag: 'p', text: 'Pure acrylic and styrene acrylic have similarities in terms of general usage and water-based formulation. However, they also have distinct differences when it comes to the level of quality, pricing, and durability. Either choice can be ideal depending on the specific requirements of the projects and the desired performance elements.' },
    ],
  },
  {
    slug: 'differences-between-water-based-acrylic-resin-and-water-based-acrylic-emulsion',
    title: 'Differences between water-based acrylic resin and water-based acrylic emulsion',
    kind: 'Technical',
    date: '3 Dec 2025',
    iso: '2025-12-03',
    source: `${BASE}/differences-between-water-based-acrylic-resin-and-water-based-acrylic-emulsion/`,
    summary: 'Clarifying two terms that are often used interchangeably but describe different materials.',
    topics: ['Fundamentals'],
    body: [
      { tag: 'p', text: 'Water-based acrylic resin:' },
      { tag: 'p', text: 'Performance characteristics:' },
      { tag: 'li', text: 'Extremely high transparency (especially solution type).' },
      { tag: 'li', text: 'Good pigment wettability.' },
      { tag: 'li', text: 'Water resistance may be slightly worse than emulsion (because it contains hydrophilic groups).' },
      { tag: 'li', text: 'Fast hardness development.' },
      { tag: 'li', text: 'Solid content is usually low (because the viscosity will be very high when the molecular weight is high).' },
      { tag: 'p', text: 'Commonly used in fields with high requirements for transparency, gloss and leveling, such as:' },
      { tag: 'li', text: 'Water-based metal baking paint (such as automobile and coil coatings).' },
      { tag: 'li', text: 'High-performance wood paint topcoat.' },
      { tag: 'li', text: 'Used as a crosslinker or modifier for emulsions.' },
      { tag: 'p', text: 'Water-based acrylic emulsions:' },
      { tag: 'li', text: 'Solid content can be made higher (40-70%).' },
      { tag: 'li', text: 'Viscosity is usually low (not much related to molecular weight, can be adjusted by thickener).' },
      { tag: 'li', text: 'Film forming temperature range (MFFT) is an important indicator, which can be adjusted by formula design or adding film-forming aids.' },
      { tag: 'li', text: 'Transparency is usually not as good as resin (because particles scatter light).' },
      { tag: 'li', text: 'Gloss range is wide (can be from matte to high gloss).' },
      { tag: 'li', text: 'Water resistance is usually good (better when emulsifier content is low).' },
      { tag: 'li', text: 'Freeze-thaw stability is an issue that needs attention (antifreeze needs to be added).' },
      { tag: 'p', text: 'It is widely used and is the main force of water-based coatings:' },
      { tag: 'li', text: 'Architectural coatings (interior Wall Latex Paint, exterior wall latex paint).' },
      { tag: 'li', text: 'Textile coatings, adhesives.' },
      { tag: 'li', text: 'Wood coatings (primers, matte topcoats).' },
      { tag: 'li', text: 'Leather finishing agents.' },
    ],
  },
  {
    slug: 'how-is-acrylic-emulsion-produced',
    title: 'How is Acrylic Emulsion Produced',
    kind: 'Technical',
    date: '3 Dec 2025',
    iso: '2025-12-03',
    source: `${BASE}/how-is-acrylic-emulsion-produced/`,
    summary: 'The emulsion polymerisation route — emulsification, copolymerisation, post-treatment and filling.',
    topics: ['Process', 'Manufacturing'],
    body: [
      { tag: 'p', text: 'The production process of acrylic emulsion mainly includes the following steps:' },
      { tag: 'p', text: 'The main raw materials for acrylic emulsion include acrylate monomers, emulsifiers, initiators and additives, etc. Acrylate monomers are the main components for preparing emulsions, and their types and proportions have a significant impact on the performance of emulsions. Emulsifiers are used to form stable emulsions of monomers in water. Commonly used types include anionic, nonionic and cationic. Initiators such as ammonium persulfate and hydrogen peroxide are used to initiate polymerization reactions. Additives include thickeners, leveling agents, defoamers, etc., which are used to adjust the viscosity, leveling property and eliminate foam of the coating' },
      { tag: 'p', text: 'Emulsification: Add acrylate monomers, emulsifiers and some water to the reaction vessel, and through high-speed stirring, form a stable emulsion of the monomers in the water. During the emulsification process, the stirring speed and temperature need to be controlled to prevent the emulsion from breaking or polymerizing' },
      { tag: 'p', text: 'Polymerization: Add an initiator to the emulsion and initiate the polymerization reaction of acrylate monomers by heating. During the polymerization process, temperature, pressure and reaction time need to be controlled to ensure the smooth progress of the polymerization reaction.' },
      { tag: 'p', text: 'Adjust pH value: After polymerization is completed, the pH value of the emulsion is adjusted by adding an acid-base regulator to meet the requirements of subsequent processing.' },
      { tag: 'p', text: 'Add additives: Add thickeners, leveling agents, defoamers and other additives to the emulsion, and stir to evenly disperse them.' },
      { tag: 'p', text: 'Viscosity adjustment: As needed, the viscosity of the coating can be adjusted by adding an appropriate amount of water or thickener.' },
      { tag: 'p', text: 'Filtration: the prepared coating is filtered to remove impurities and particles, ensuring the quality of the coating.' },
      { tag: 'p', text: 'During the production process, quality inspection of raw materials should be carried out to ensure that their quality meets the requirements. Meanwhile, performance tests should be conducted on the prepared emulsions and coatings, such as viscosity, stability, weather resistance, water resistance, etc., to ensure the quality and performance of the products.' },
      { tag: 'p', text: 'Fire prevention and explosion prevention should also be taken during the production. Contact with skin and eyes should be avoided. Waste should be properly disposed of to prevent environmental pollution ‌' },
    ],
  },
  {
    slug: 'introduction-of-rust-removal-converter',
    title: 'Introduction of Rust Removal Converter',
    kind: 'Technical',
    date: '3 Dec 2025',
    iso: '2025-12-03',
    source: `${BASE}/introduction-of-rust-removal-converter/`,
    summary: 'How rust converters turn existing corrosion into a stable primer layer on metal surfaces.',
    topics: ['Anti-corrosion', 'Metal'],
    body: [
      { tag: 'p', text: 'Rust removal converter is a chemical agent that can convert rust into stable and harmless substances. It is mainly used to deal with rust, oil stains and scale on the surface of steel. Its main ingredients include emulsions such as nanomaterials, organic acids, catalysts, rust inhibitors, corrosion inhibitors, activators and penetrants.' },
      { tag: 'p', text: 'It converts existing rust (iron oxide) into a stable, black, and protective layer, stopping further corrosion and creating a paintable surface. Unlike a rust remover, which removes rust, a converter chemically changes the rust into a new compound, such as iron tannate or ferric phosphate. This is useful when complete removal of rust is difficult or impractical, as it prepares the surface for priming and painting.' },
      { tag: 'p', text: 'Scope of application Rust removal converter is suitable for various metal products, such as color steel tiles, steel structures, steel plates, tanks, guardrails, bridges and buildings. It can not only convert the rust on the surface, but also penetrate into the rust, form chelates with the iron ions in the rust, accelerate the formation of rust conversion film, and have good rust prevention and corrosion inhibition effect.' },
      { tag: 'p', text: 'Working principle Rust removal converter uses electrochemical principles to convert rust on the surface of iron, steel and its alloys into paint film. Electrolytes are added to the solution to convert iron ions into iron oxide and form a thin film, which is the paint film. The role of the electrolyte is to form a thin film of iron oxide ions, which can resist corrosion, thereby achieving the purpose of protecting the metal surface.' },
      { tag: 'p', text: 'Surface treatment: The surface of the workpiece should be dry. If there is heavy oil, paint, dirt and dust, it should be cleaned in advance. Brushing: Use a paint brush or a long-fiber rag dipped in rust removal agent to brush the rust surface of the workpiece, so that the agent is in full contact with the surface of the workpiece, keep it for several minutes, and wipe the parts with severe rust several times.' },
      { tag: 'p', text: 'Drying: Keep the workpiece dry. When the surface is not sticky to the touch, the oil and rust on the surface of the workpiece are completely removed visually, and the surface color is a continuous and uniform blue or black film. Subsequent treatment: After drying, the coating should be applied quickly, and the drying time is 0.5-2 hours (can be shortened or extended according to the ambient temperature and humidity)' },
      { tag: 'p', text: '2. Advantages and disadvantages' },
      { tag: 'p', text: 'Advantages: It has strong rust removal and rust removal ability, and the conversion film formed is dense, tough, corrosion-resistant, anti-wear and anti-friction, and has strong anti-corrosion ability' },
      { tag: 'li', text: 'The process is simple, easy to use, non-toxic, does not contain banned chemicals and harmful substances, is not flammable or explosive, and does not need to be washed after the workpiece is processed. It is zero emission and zero pollution.' },
      { tag: 'li', text: 'It can replace anti-rust primer, save costs, improve work efficiency, and enhance the adhesion of the paint film.' },
      { tag: 'li', text: 'It is easy to construct and does not require special equipment. It can be wiped, brushed or sprayed.' },
      { tag: 'p', text: '‌Disadvantages‌: It has a dyeing effect on skin and clothing, so you need to pay attention to protection when using it.' },
    ],
  },
  {
    slug: 'the-three-day-china-coating-show-2025-came-to-a-successful-conclusion',
    title: 'The Three-day China Coating Show 2025 Came to a Successful Conclusion',
    kind: 'Company',
    date: '4 Dec 2025',
    iso: '2025-12-04',
    source: `${BASE}/the-three-day-china-coating-show-2025-came-to-a-successful-conclusion/`,
    summary: 'Hongxing Hongda exhibited its emulsion and waterproofing portfolio across the three-day show.',
    topics: ['Events'],
    body: [
      { tag: 'p', text: 'The three-day China Coating Show 2025 held in Shanghai International Expo Center came to a successful conclusion on November 27th. The innovative achievements of Hongxing Hongda in multiple business fields shone brightly, and its comprehensive business layout and leading technological strength won wide acclaim from audiences at home and abroad.' },
      { tag: 'p', text: 'During the exhibition, the booth of Hongxing Hongda was always bustling with visitors. The booth attracted partners and potential customers from all over the world to visit and communicate, demonstrating strong industry appeal and brand influence.' },
      { tag: 'p', text: 'Facing multiple challenges such as the shrinking demand in the current coating industry, intensified domestic competition, and the upgrading of industrial structure, Hongxing Hongda is focusing on the development strategy of going global, continuously concentrating on the research and development of environmentally friendly and functional emulsion products, and is committed to achieving "good coatings" with "good raw materials". It is working hand in hand with global partners to explore unlimited possibilities and jointly embrace a bright future.' },
      { tag: 'p', text: 'As a famous brand name of various emulsion, Hongxing Hongda has three factories in China to produce acrylic emulsion,styrene acrylic emulsion,pure acrylic emulsion, silicone acrylic emulsion and VAE emulsion as the raw material of interior and exterior wall coating, Waterproof Coating, fireproof coating ,steel structure paint and polyester wadding and padding.' },
      { tag: 'p', text: 'Up to now, Hongxing Hongda\'s emulsions have been exported to over 20 countries and regions in Asia and Africa, including Vietnam, Myanmar, Bangladesh, Cambodia, Thailand, the Philippines, Indonesia, India, Kazakhstan, Iraq, Mauritius, Kenya, Uganda, Tanzania, Zambia, Ethiopia, Congo, Nigeria, Ghana, Botswana, etc.' },
    ],
  },
  {
    slug: 'hubei-hongxing-hongda-new-materials-co-ltd-production-line-with-annual-output-capacity-of-200-000-tons-of-water-based-emulsion-and-5-000-tons-of-vinylidene-chloride-copolymer',
    title: 'Hubei Hongxing Hongda production line: 200,000 t/yr water-based emulsion and 5,000 t/yr vinylidene chloride copolymer',
    kind: 'Company',
    date: '3 Dec 2025',
    iso: '2025-12-03',
    source: `${BASE}/hubei-hongxing-hongda-new-materials-co-ltd-production-line-with-annual-output-capacity-of-200-000-tons-of-water-based-emulsion-and-5-000-tons-of-vinylidene-chloride-copolymer/`,
    summary: '16 automatic water-based emulsion lines and 4 VDC copolymer lines, with DCS process control and on-site effluent and waste-gas treatment.',
    topics: ['Manufacturing', 'Capacity'],
    body: [
      { tag: 'p', text: 'Hubei Hongxing Hongda New Materials Co., Ltd. owns 16 water-based emulsion automatic production lines and 4 vinylidene chloride copolymer emulsion production lines.' },
      { tag: 'p', text: 'Its storage and transportation projects mainly include: Storage tank area (2965.6㎡) construction of 1 butyl acrylate tank (1000m3), 1 vinyl acetate tank (1000m3), 1 styrene tank (500m3), 1 ethyl acrylate tank (300m3), 1 isooctyl acrylate tank (100m3), 1 methyl methacrylate tank (100m3), 1 Acrylonitrile tanks (100m3) and methyl acrylate tanks (100m3), 2 vinylidene chloride tanks (100m3), and 4 reserved tanks (butadiene tanks, 100m3). It has one hazardous chemical warehouse (759.59㎡), one finished product warehouse (including two parts) (6123.11㎡), one Class C warehouse (565.74㎡), and one Class D warehouse (1328.87㎡).' },
      { tag: 'p', text: 'Its public auxiliary projects mainly include: power supply and distribution system, water supply system, drainage system, steam condensate recovery system, air pressure system, finished product testing system, steam system, fire pool (2400m3).' },
      { tag: 'p', text: 'Its environmental protection projects mainly include: construction of a sewage treatment station (treatment scale of 50 cubic meters/day), a set of waste gas treatment system, a dangerous waste temporary storage room (construction area of 155㎡),and emergency pool (2400m3), etc. The total investment of the project is CNY300,000,000.' },
      { tag: 'p', text: 'The main production process of water-based emulsion is as follows:' },
      { tag: 'p', text: 'Using styrene, acrylic acid, methyl acrylate, ethyl acrylate, butyl acrylate and other raw materials through emulsification, copolymerization, post-treatment, filling process to obtain water-based emulsion products.' },
      { tag: 'p', text: 'The main production process of vinylidene chloride copolymer emulsion is as follows:' },
      { tag: 'p', text: 'Using vinylidene chloride, methyl methacrylate, acrylic acid, acrylonitrile and small materials as raw materials for polymerization reaction project to build an annual output of 200,000 tons of water-based emulsion and 5,000 tons of vinylidene chloride copolymer emulsion.' },
    ],
  },
  {
    slug: 'hongxing-hongda-cooperates-with-keshun-waterproof-technology-co-ltd-to-bring-a-new-future-of-the-industry',
    title: 'Hongxing Hongda Cooperates with Keshun Waterproof Technology Co., Ltd',
    kind: 'Company',
    date: '12 Dec 2023',
    iso: '2023-12-12',
    source: `${BASE}/hongxing-hongda-cooperates-with-keshun-waterproof-technology-co-ltd-to-bring-a-new-future-of-the-industry/`,
    summary: 'Strategic cooperation agreement for in-depth collaboration in the field of waterproof coatings.',
    topics: ['Partnership', 'Waterproofing'],
    body: [
      { tag: 'p', text: 'Since signing the strategic cooperation agreement with Keshun Waterproof Technology Co. , Ltd (hereinafter referred to as "Keshun Company"), they have been looking forward to visit to our factory.' },
      { tag: 'p', text: 'Recently, Keshun company visited our factory again, aims to further know our products, production processes and technical strength, and provide more support for the in-depth cooperation between the two parties in the field of Waterproof Coatings.' },
      { tag: 'p', text: 'From state-of-the-art production equipment to rigorous quality inspection, from efficient assembly line operation to professional technical team, the representatives of Keshun company pay great attention to every detail.' },
      { tag: 'p', text: 'During the field visit, the Keshun representatives got to know in depth our paint production workshop, R&D laboratory and quality control department .' },
      { tag: 'p', text: 'They saw the real situation of our coating products from raw material procurement to production, research and development, quality inspection and delivery status etc.' },
      { tag: 'p', text: 'The two sides had an in-depth exchange of know-how in the field of coatings. We presented our R&D achievements, technical advantages and market applications to the representatives of Keshun company.' },
      { tag: 'p', text: 'The representatives of Keshun company spoke highly of our technical strength, and said that through the joint efforts and cooperation of both sides, we will be able to create more high-quality waterproof products and promote the development of the industry.' },
      { tag: 'p', text: 'This factory visit not only enhanced the mutual understanding and trust between the two sides, but also laid a solid foundation for future cooperation.' },
      { tag: 'p', text: 'We believe that with the joint efforts of both sides, future cooperation will obtain more fruitful achievements. We look forward to growing together with Keshun in the field of waterproof coatings and creating a bright future together.' },
      { tag: 'p', text: 'Finally, we would like to thank once again the delegation from Keshun for their visit and inspection. Let us work together to create a better future!' },
      { tag: 'p', text: 'In the future, Hongxing Hongda - Weixian Shuangying Chemical Co., Ltd. will be committed to developing more environmentally friendly and stable waterproof products, and make unremitting efforts to practice the "green waterproof revolution".' },
    ],
  },
  {
    slug: 'hongxing-hongda-plans-to-invest-1-6-billion-yuan-to-build-a-new-emulsion-production-plant-with-output-capacity-510000-tons-year',
    title: 'Hongxing Hongda plans to invest 1.6 billion yuan in new emulsion capacity',
    kind: 'Company',
    date: '15 Jul 2021',
    iso: '2021-07-15',
    source: `${BASE}/hongxing-hongda-plans-to-invest-1-6-billion-yuan-to-build-a-new-emulsion-production-plant-with-output-capacity-510000-tons-year/`,
    summary: 'CNY 1.1 bn for 400,000 t/yr water-based and 60,000 t/yr butadiene emulsion, plus CNY 500 m for 50,000 t/yr VDC copolymer emulsion.',
    topics: ['Investment', 'Capacity'],
    body: [
      { tag: 'p', text: 'Hubei Hongxing Hongda New Materials Co., Ltd. plans to invest a total of 1.1 billion yuan to build a new plant with annual output of 400,000 tons of water-based emulsion and 60,000 tons of butadiene emulsion, the project covers an area of 350 mu with new production workshop, paint workshop, barrel washing workshop, raw material warehouse and other production rooms, comprehensive building, power distribution room and other supporting rooms, totally 31 sets of equipment for the production line.The project is scheduled to start in June 2023.' },
      { tag: 'p', text: 'In addition, Hongxing Hongda also plans to invest a total of 500 million yuan to build a new plant with annual output of 50,000 tons of vinylidene chloride copolymer emulsion, the project covers an area of 303 acres, the new production workshop, raw material warehouse and other production rooms, comprehensive buildings, power distribution rooms and other supporting rooms, the new purchase of production line equipment, to achieve an annual output of 50,000 tons of vinylidene chloride copolymer emulsion capacity. Construction is scheduled to begin in July 2023.' },
      { tag: 'p', text: 'Hubei Hongxing Hongda New Materials Co., Ltd. was established on December 3, 2020, with a registered capital of 60 million yuan.' },
      { tag: 'p', text: 'Water-based emulsion is widely used in various fields of the national economy and has become an indispensable chemical product for the development of the national economy. According to the statistics of the China Water-based emulsion Industry Association, the average annual growth rate of China\'s water-based emulsion production and sales is forecast to maintain a high growth rate during the "Fourteenth Five-Year Plan" period,the demand for all kinds of water-based emulsions in China at a rate of more than 10% per year.' },
      { tag: 'p', text: 'In the future, the global synthetic water-based emulsion market will become a hot commodity because of its low pollution and environmental protection.' },
      { tag: 'p', text: 'High-performance synthetic water-based emulsions include epoxy adhesive, organic silicone, polyurethane adhesive, modified acrylic adhesive, anaerobic adhesive and radiation curable water-based emulsion etc. In order to improve product quality, simplify operation process and improve construction efficiency, the developed countries have developed a series of special equipment, which not only provides better construction means for synthetic water-based emulsion users, but also creates important conditions for the sustainable development of water-based emulsion industry.' },
      { tag: 'p', text: 'From the enterprise\'s own development and market demand, Hubei Hongxing Hongda New Materials Co., Ltd adheres to the scientific concept of development,adopting advanced and applicable production technology and equipment at home and abroad, the production of high performance and high value-added modified acrylic products helps to expand the company\'s output and brings down the production cost to meet the domestic and foreign market demand.' },
    ],
  },
  {
    slug: 'hongxing-hongda-will-establish-a-new-plant-in-bangladesh',
    title: 'Hongxing Hongda Will Establish a New Plant in Bangladesh',
    kind: 'Company',
    date: '8 Jan 2024',
    iso: '2024-01-08',
    source: `${BASE}/hongxing-hongda-will-establish-a-new-plant-in-bangladesh/`,
    summary: 'USD 76.41 million committed with Mingda for a plant in the BEPZA Economic Zone, Mirsharai, Chattogram, creating 500+ local positions.',
    topics: ['Bangladesh', 'Investment'],
    body: [
      { tag: 'p', text: 'Hongxing Hongda works together with Mingda to invest USD76,410,000 and build a new plant in BEPZA Economic Zone,Mirsharai Chittagong,Bangladesh.Establishing plant in this area will will create more than 500 employment positions for local citizens.' },
      { tag: 'p', text: 'The Executive Chairman, Major General Mr Abul Kalam Mohammad Ziaur Rahman,BSP,NDC,PSC,witnessed the signing ceremony.He congratulated Mr Huang Shangwen on choosing BEPZA as the destination for foreign direct investment.He promised that they will provide various service support for the plant establishment and safe operation.' },
      { tag: 'p', text: 'BEPZA Member (Engineering) Mohammad Faruque Alam, Member (Finance) Nafisa Banu, Executive Director (Public Relations) Nazma Binte Alamgir, Executive Director (Investment Development) Md. Tanvir Hossain and Executive Director (Enterprise Services) Khorshid Alam were present during the signing ceremony.' },
      { tag: 'p', text: 'The BEPZA is the official organ of the Bangladesh government to promote, attract and facilitate foreign investment in the EPZs. Besides, BEPZA as the competent Authority performs inspection & supervision of the compliance of the enterprises related to social & environmental issues, safety & security at work place in order to maintain harmonious labour-management & industrial relations in EPZs. The primary objective of an EPZ is to provide special areas where potential investors would find a congenial investment climate free from cumbersome procedures.' },
      { tag: 'p', text: 'With the change of international trade situation and the strong desire of the Chinese government to achieve eco-friendly development,many enterprises are also facing important challenges of transformation, upgrading and industrial transfer.Many textile enterprises have invested and set up factories in Southeast Asia in order to survive. They transfer some industries and equipment to Southeast Asia, including to Bangladesh, to bring down the production cost and labor cost and enjoy preferential tax treatment for foreign investment locally.' },
      { tag: 'p', text: 'We all know that Bangladesh is one of the most dynamic countries in South Asia and even the world. In recent years, it has enjoyed rapid economic growth, stable social order, remarkable demographic dividend and an improving investment environment year by year.' },
    ],
  },
];

export const TECHNICAL_ARTICLES = ARTICLES.filter((a) => a.kind === 'Technical');
export const COMPANY_ARTICLES = ARTICLES.filter((a) => a.kind === 'Company');

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Newest first, for listings. */
export const ARTICLES_BY_DATE: Article[] = [...ARTICLES].sort((a, b) =>
  b.iso.localeCompare(a.iso),
);
