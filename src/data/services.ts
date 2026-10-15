import { ServiceItem, GalleryItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'srv-sand',
    titleEn: 'Sand & Aggregate Enquiries',
    titleHi: 'बालू और गिट्टी की जानकारी',
    descEn: 'Ask about coarse river sand (Balu) and stone aggregate chips (Gitti) in 10mm & 20mm specifications for your site needs.',
    descHi: 'मकान निर्माण हेतु उपयुक्त नदी की बालू एवं 10mm/20mm गिट्टी की उपलब्धता व दरों की पूछताछ।',
    iconName: 'Layers',
    accentColor: '#D5AA66',
    queryParam: 'Sand and Aggregates'
  },
  {
    id: 'srv-steel',
    titleEn: 'Cement & TMT Steel Enquiries',
    titleHi: 'सीमेंट और सरिया की जानकारी',
    descEn: 'Enquire about thermo-mechanically treated TMT rebar diameters and premium cement bags for foundation and roof casting.',
    descHi: 'छत व पिलर ढलाई के लिए मानक सरिया साइज और उच्च गुणवत्ता वाले सीमेंट बैग की जानकारी।',
    iconName: 'Shield',
    accentColor: '#FF7628',
    queryParam: 'Cement and TMT Steel'
  },
  {
    id: 'srv-hardware',
    titleEn: 'Hardware & Building Accessories',
    titleHi: 'हार्डवेयर और निर्माण सहायक सामग्री',
    descEn: 'Ask about binding wire, masonry trowels, fasteners, levels, and practical construction supplies.',
    descHi: 'सरिया बाइंडिंग तार, करणी, लेवल पाइप, कीलें व अन्य निर्माण उपकरणों की पूछताछ।',
    iconName: 'Wrench',
    accentColor: '#D5AA66',
    queryParam: 'Hardware Accessories'
  },
  {
    id: 'srv-bulk',
    titleEn: 'Bulk Quantity Enquiries',
    titleHi: 'थोक मात्रा संबंधी पूछताछ',
    descEn: 'Planning a full house foundation or multi-floor structure? Contact us with estimated volume requirements for coordinated supply.',
    descHi: 'बड़े प्रोजेक्ट या पूरे मकान के निर्माण हेतु आवश्यक बल्क सामग्री की समन्वित आपूर्ति।',
    iconName: 'Package',
    accentColor: '#F7F7F4',
    queryParam: 'Bulk Quantity Construction Materials'
  },
  {
    id: 'srv-delivery',
    titleEn: 'Delivery Enquiries (Subject to Confirmation)',
    titleHi: 'डिलीवरी संबंधी पूछताछ (पुष्टि के अधीन)',
    descEn: 'Ask about site delivery feasibility and transport arrangements in and around Gangpur Siswan, Bihar, subject to quantity and destination confirmation.',
    descHi: 'गंगपुर सिसवन और नजदीकी क्षेत्रों में साइट तक सामग्री पहुंचाने संबंधी नियमों व दरों की पूछताछ।',
    iconName: 'Truck',
    accentColor: '#FF7628',
    queryParam: 'Site Delivery in Gangpur Siswan'
  }
];

export const galleryData: GalleryItem[] = [
  {
    id: 0,
    titleEn: 'TMT Steel Reinforcement Rebar',
    titleHi: 'टीएमटी स्टील रीइन्फोर्समेंट सरिया',
    descEn: 'Bundled high-strength structural ribbed steel for RCC casting',
    descHi: 'आरसीसी ढलाई हेतु बंडल की गई उच्च शक्ति वाली टीएमटी सरिया',
    category: 'steel',
    image: 'C:/Users/rohii/.gemini/antigravity/brain/7d88a306-1e1a-46ab-8c91-b3225608ce18/tmt_steel_bars_1791632814743.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80',
    query: 'TMT Steel Bars'
  },
  {
    id: 1,
    titleEn: 'Crushed Stone Chips (Gitti)',
    titleHi: 'ब्लू-ग्रे स्टोन चिप्स (गिट्टी)',
    descEn: '10mm & 20mm blue-grey aggregates for high strength concrete',
    descHi: 'मजबूत कंक्रीट कार्य के लिए 10mm व 20mm स्टोन चिप्स',
    category: 'aggregates',
    image: 'C:/Users/rohii/.gemini/antigravity/brain/7d88a306-1e1a-46ab-8c91-b3225608ce18/stone_chips_gitti_1791632969018.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=1200&q=80',
    query: 'Gitti (Stone Chips)'
  },
  {
    id: 2,
    titleEn: 'River Sand (Balu)',
    titleHi: 'नदी की बालू (रेत)',
    descEn: 'Coarse masonry river sand for plaster and mortar bonding',
    descHi: 'प्लास्टर और चिनाई के लिए उपयुक्त दरदरी नदी की बालू',
    category: 'aggregates',
    image: 'C:/Users/rohii/.gemini/antigravity/brain/7d88a306-1e1a-46ab-8c91-b3225608ce18/sand_balu_1791632895181.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    query: 'Balu (River Sand)'
  },
  {
    id: 3,
    titleEn: 'Cement Storage Depot',
    titleHi: 'सीमेंट भंडारण डिपो',
    descEn: 'Palletized construction cement bags in industrial warehouse',
    descHi: 'वेयरहाउस में पैलेटाइज्ड निर्माण सीमेंट बैग्स',
    category: 'cement',
    image: 'C:/Users/rohii/.gemini/antigravity/brain/7d88a306-1e1a-46ab-8c91-b3225608ce18/cement_bags_1791633019922.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80',
    query: 'Cement'
  },
  {
    id: 4,
    titleEn: 'Solid Red Masonry Bricks',
    titleHi: 'भट्ठा पकी ठोस लाल ईंटें',
    descEn: 'Kiln-fired terracotta building bricks for wall masonry',
    descHi: 'मजबूत दीवार निर्माण हेतु उच्च घनत्व की लाल ईंटें',
    category: 'cement',
    image: 'C:/Users/rohii/.gemini/antigravity/brain/7d88a306-1e1a-46ab-8c91-b3225608ce18/red_bricks_1791633103784.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1584463699039-4d6cbdb8f341?auto=format&fit=crop&w=1200&q=80',
    query: 'Bricks'
  },
  {
    id: 5,
    titleEn: 'Modern Site Structural Execution',
    titleHi: 'आधुनिक निर्माण स्थल कार्य',
    descEn: 'Foundation columns and reinforced rebar cages at building site',
    descHi: 'निर्माण स्थल पर फाउंडेशन पिलर और सरिया ढलाई कार्य',
    category: 'steel',
    image: 'C:/Users/rohii/.gemini/antigravity/brain/7d88a306-1e1a-46ab-8c91-b3225608ce18/hero_construction_1791632768450.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80',
    query: 'Construction Materials'
  }
];
