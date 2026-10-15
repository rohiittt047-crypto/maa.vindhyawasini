import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import Product from './models/Product.js';
import Order from './models/Order.js';
import DeliveryRule from './models/DeliveryRule.js';
import { verifyAdminToken } from './middleware/auth.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'mvt_super_secret_jwt_key_2026_siswan';
const ADMIN_USER = process.env.ADMIN_USERNAME || 'ajit_mvt';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'Siswan@2026';

app.use(cors());
app.use(express.json());

// Persistent Local File Fallback setup
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial Real Product Catalog
const DEFAULT_PRODUCTS = [
  {
    id: 'prod-balu',
    nameEn: 'Balu (Coarse River Sand)',
    nameHi: 'बालू (मोटी नदी की रेत)',
    category: 'sand',
    categoryEn: 'River Sand',
    categoryHi: 'नदी की बालू',
    descEn: 'Authentic coarse red/yellow river sand ideal for masonry, plastering, and RCC concrete casting. High bonding strength.',
    descHi: 'चिनाई, प्लास्टर एवं आरसीसी ढलाई के लिए सर्वोत्तम नदी की बालू। सीमेंट के साथ मजबूत पकड़।',
    price: 55, // INR per CFT
    unit: 'CFT (Cubic Feet)',
    unitHi: 'घन फीट (CFT)',
    availableUnits: ['CFT (Cubic Feet)', 'Tractor Trolley (~100 CFT)', 'Truck Load (~400 CFT)'],
    minOrderQty: 100,
    stockStatus: 'in_stock',
    image: 'C:/Users/rohii/.gemini/antigravity/brain/7d88a306-1e1a-46ab-8c91-b3225608ce18/sand_balu_1791632895181.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true
  },
  {
    id: 'prod-gitti',
    nameEn: 'Gitti (Stone Chips - 20mm/10mm)',
    nameHi: 'गिट्टी (स्टोन चिप्स - 20mm/10mm)',
    category: 'aggregates',
    categoryEn: 'Stone Aggregates',
    categoryHi: 'स्टोन एग्रीगेट्स',
    descEn: 'Clean, angular blue-grey crushed stone aggregates for durable foundation pillars, beams, and roof slabs.',
    descHi: 'फाउंडेशन, पिलर, बीम एवं छत ढलाई हेतु 10mm व 20mm मजबूत कोणीय ब्लू-ग्रे स्टोन चिप्स।',
    price: 68, // INR per CFT
    unit: 'CFT (Cubic Feet)',
    unitHi: 'घन फीट (CFT)',
    availableUnits: ['CFT (Cubic Feet)', 'Tractor Trolley (~100 CFT)', 'Truck Load (~400 CFT)'],
    minOrderQty: 100,
    stockStatus: 'in_stock',
    image: 'C:/Users/rohii/.gemini/antigravity/brain/7d88a306-1e1a-46ab-8c91-b3225608ce18/stone_chips_gitti_1791632969018.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true
  },
  {
    id: 'prod-rod-12mm',
    nameEn: 'Rod (TMT Steel Bars - 12mm / 10mm / 8mm)',
    nameHi: 'सरिया (TMT रीइन्फोर्समेंट बार - 12mm/10mm/8mm)',
    category: 'steel',
    categoryEn: 'TMT Reinforcement Steel',
    categoryHi: 'टीएमटी सरिया',
    descEn: 'High-strength thermo-mechanically treated reinforcement rebar with precision ribs for earthquake-resistant residential construction.',
    descHi: 'भूकंप-रोधी एवं उच्च तन्यता क्षमता युक्त थर्मो-मैकेनिकली ट्रीटेड टीएमटी सरिया।',
    price: 64, // INR per Kg
    unit: 'Kg (Kilogram)',
    unitHi: 'किलोग्राम (Kg)',
    availableUnits: ['Kg (Kilogram)', 'Quintal (100 Kg)', 'Tonne (1000 Kg)'],
    minOrderQty: 50,
    stockStatus: 'in_stock',
    image: 'C:/Users/rohii/.gemini/antigravity/brain/7d88a306-1e1a-46ab-8c91-b3225608ce18/tmt_steel_bars_1791632814743.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true
  },
  {
    id: 'prod-cement-ppc',
    nameEn: 'Cement (High Grade 50 Kg Bag)',
    nameHi: 'सीमेंट (उच्च ग्रेड 50 किलोग्राम बैग)',
    category: 'cement',
    categoryEn: 'Building Cement',
    categoryHi: 'निर्माण सीमेंट',
    descEn: 'Premium high-strength Portland cement for structural RCC foundations, plastering, and masonry work.',
    descHi: 'फाउंडेशन, पिलर, छत ढलाई और चिनाई के लिए टिकाऊ एवं मजबूत पकड़ वाला प्रीमियम सीमेंट बैग।',
    price: 385, // INR per Bag
    unit: 'Bag (50 Kg)',
    unitHi: 'बोरी (50 Kg बैग)',
    availableUnits: ['Bag (50 Kg)'],
    minOrderQty: 10,
    stockStatus: 'in_stock',
    image: 'C:/Users/rohii/.gemini/antigravity/brain/7d88a306-1e1a-46ab-8c91-b3225608ce18/cement_bags_1791633019922.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true
  },
  {
    id: 'prod-bricks-red',
    nameEn: 'Bricks (Kiln-Fired Red Clay)',
    nameHi: 'ईंटें (भट्ठा पकी लाल मिट्टी की ईंटें)',
    category: 'bricks',
    categoryEn: 'Masonry Bricks',
    categoryHi: 'चिनाई ईंटें',
    descEn: 'First-class solid kiln-fired red clay construction bricks with sharp edges and uniform density for load-bearing walls.',
    descHi: 'मजबूत दीवार निर्माण हेतु प्रथम श्रेणी की भट्ठा पकी ठोस लाल ईंटें। समान आकार व उच्च घनत्व।',
    price: 9.8, // INR per Piece (9800 per 1000)
    unit: 'Piece (नग)',
    unitHi: 'नग (Piece)',
    availableUnits: ['Piece (नग)', '1000 Bricks (हजार)'],
    minOrderQty: 500,
    stockStatus: 'in_stock',
    image: 'C:/Users/rohii/.gemini/antigravity/brain/7d88a306-1e1a-46ab-8c91-b3225608ce18/red_bricks_1791633103784.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1584463699039-4d6cbdb8f341?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true
  },
  {
    id: 'prod-binding-wire',
    nameEn: 'Binding Wire (सरिया बांधने का तार)',
    nameHi: 'बाइंडिंग वायर (सरिया बांधने का तार)',
    category: 'hardware',
    categoryEn: 'Construction Hardware',
    categoryHi: 'निर्माण हार्डवेयर',
    descEn: 'Flexible annealed mild steel binding wire for tying TMT reinforcement rebars securely at construction sites.',
    descHi: 'निर्माण स्थल पर टीएमटी सरिया को मजबूती से बांधने के लिए लचीला एवं टिकाऊ माइल्ड स्टील तार।',
    price: 85, // INR per Kg
    unit: 'Kg (Kilogram)',
    unitHi: 'किलोग्राम (Kg)',
    availableUnits: ['Kg (Kilogram)', 'Bundle (25 Kg)'],
    minOrderQty: 5,
    stockStatus: 'in_stock',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true
  }
];

const DEFAULT_DELIVERY_RULES = {
  supportedAreas: [
    { name: 'Gangpur Siswan', district: 'Siwan, Bihar', pin: '841210', baseDeliveryFee: 0, isSupported: true },
    { name: 'Siswan Block', district: 'Siwan, Bihar', pin: '841210', baseDeliveryFee: 150, isSupported: true },
    { name: 'Chainpur', district: 'Siwan, Bihar', pin: '841206', baseDeliveryFee: 300, isSupported: true },
    { name: 'Hasanpura', district: 'Siwan, Bihar', pin: '841236', baseDeliveryFee: 350, isSupported: true },
    { name: 'Raghunathpur', district: 'Siwan, Bihar', pin: '841504', baseDeliveryFee: 400, isSupported: true },
    { name: 'Siwan Town', district: 'Siwan, Bihar', pin: '841226', baseDeliveryFee: 500, isSupported: true }
  ],
  pricingPolicy: 'distance_and_vehicle_based',
  noteEn: 'Heavy materials delivery rates in Gangpur Siswan depend on trip volume (Tractor Trolley/Truck) and exact distance.',
  noteHi: 'गंगपुर सिसवन एवं नजदीकी क्षेत्रों में भारी सामग्री का ढुलाई शुल्क वाहन प्रकार (ट्रॉली/ट्रक) और दूरी के अनुसार तय होता है।'
};

// Local storage helper
function getLocalDB() {
  if (!fs.existsSync(DB_FILE)) {
    const initial = {
      products: DEFAULT_PRODUCTS,
      orders: [],
      deliveryRules: DEFAULT_DELIVERY_RULES
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2));
    return initial;
  }
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return { products: DEFAULT_PRODUCTS, orders: [], deliveryRules: DEFAULT_DELIVERY_RULES };
  }
}

function saveLocalDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Database Connection with graceful fallback
let isMongoConnected = false;

const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(async () => {
      isMongoConnected = true;
      console.log('✅ Connected to MongoDB successfully.');
      
      // Seed default products if collection is empty
      const count = await Product.countDocuments();
      if (count === 0) {
        await Product.insertMany(DEFAULT_PRODUCTS);
        console.log('📦 Seeded initial product inventory in MongoDB.');
      }
      
      const ruleCount = await DeliveryRule.countDocuments();
      if (ruleCount === 0) {
        await DeliveryRule.create(DEFAULT_DELIVERY_RULES);
        console.log('📍 Seeded default delivery rules in MongoDB.');
      }
    })
    .catch(err => {
      console.warn('⚠️ MongoDB connection failed. Running in resilient Local Persistent Store mode.', err.message);
      isMongoConnected = false;
    });
} else {
  console.log('ℹ️ No MONGODB_URI provided in environment. Running in Local Persistent Database mode.');
}

// Ensure default data exists in local store
getLocalDB();

// ----------------------------------------------------
// 1. PRODUCT CATALOG API
// ----------------------------------------------------

// GET /api/products - Get all products with optional filtering
app.get('/api/products', async (req, res) => {
  try {
    const { category, search } = req.query;
    
    if (isMongoConnected) {
      let query = {};
      if (category && category !== 'all') {
        query.category = category;
      }
      if (search) {
        query.$or = [
          { nameEn: { $regex: search, $options: 'i' } },
          { nameHi: { $regex: search, $options: 'i' } },
          { descEn: { $regex: search, $options: 'i' } }
        ];
      }
      const products = await Product.find(query).sort({ isFeatured: -1, _id: 1 });
      return res.json({ success: true, count: products.length, products });
    } else {
      const db = getLocalDB();
      let products = db.products || [];
      if (category && category !== 'all') {
        products = products.filter(p => p.category === category);
      }
      if (search) {
        const s = search.toLowerCase();
        products = products.filter(p => 
          p.nameEn.toLowerCase().includes(s) || 
          p.nameHi.toLowerCase().includes(s) ||
          p.descEn.toLowerCase().includes(s)
        );
      }
      return res.json({ success: true, count: products.length, products });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/products/:id - Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    if (isMongoConnected) {
      const product = await Product.findOne({ id: req.params.id });
      if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
      return res.json({ success: true, product });
    } else {
      const db = getLocalDB();
      const product = db.products.find(p => p.id === req.params.id);
      if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
      return res.json({ success: true, product });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/products - Admin add new product
app.post('/api/products', verifyAdminToken, async (req, res) => {
  try {
    const { nameEn, nameHi, category, price, unit, unitHi, descEn, descHi, image, minOrderQty } = req.body;
    
    if (!nameEn || !price || !unit) {
      return res.status(400).json({ success: false, message: 'Name, price, and unit are required.' });
    }

    const newProduct = {
      id: `prod-${Date.now()}`,
      nameEn,
      nameHi: nameHi || nameEn,
      category: category || 'other',
      categoryEn: category ? category.toUpperCase() : 'General',
      categoryHi: category ? category.toUpperCase() : 'सामान्य',
      descEn: descEn || '',
      descHi: descHi || '',
      price: Number(price),
      unit,
      unitHi: unitHi || unit,
      availableUnits: [unit],
      minOrderQty: Number(minOrderQty) || 1,
      stockStatus: req.body.stockStatus || 'in_stock',
      image: image || 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80',
      isFeatured: false,
      updatedAt: new Date()
    };

    if (isMongoConnected) {
      const saved = await Product.create(newProduct);
      return res.status(201).json({ success: true, product: saved });
    } else {
      const db = getLocalDB();
      db.products.push(newProduct);
      saveLocalDB(db);
      return res.status(201).json({ success: true, product: newProduct });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/products/:id - Admin update product price / stock / details
app.put('/api/products/:id', verifyAdminToken, async (req, res) => {
  try {
    const updateData = { ...req.body, updatedAt: new Date() };

    if (isMongoConnected) {
      const updated = await Product.findOneAndUpdate({ id: req.params.id }, updateData, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Product not found.' });
      return res.json({ success: true, product: updated });
    } else {
      const db = getLocalDB();
      const idx = db.products.findIndex(p => p.id === req.params.id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Product not found.' });
      db.products[idx] = { ...db.products[idx], ...updateData };
      saveLocalDB(db);
      return res.json({ success: true, product: db.products[idx] });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/products/:id - Admin delete product
app.delete('/api/products/:id', verifyAdminToken, async (req, res) => {
  try {
    if (isMongoConnected) {
      const deleted = await Product.findOneAndDelete({ id: req.params.id });
      if (!deleted) return res.status(404).json({ success: false, message: 'Product not found.' });
      return res.json({ success: true, message: 'Product deleted.' });
    } else {
      const db = getLocalDB();
      db.products = db.products.filter(p => p.id !== req.params.id);
      saveLocalDB(db);
      return res.json({ success: true, message: 'Product deleted.' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ----------------------------------------------------
// 2. REAL ORDER CHECKOUT & PLACEMENT API
// ----------------------------------------------------

// POST /api/orders - Place a real customer order
app.post('/api/orders', async (req, res) => {
  try {
    const { customer, items, deliveryPreference, paymentMethod } = req.body;

    // Validate customer fields
    if (!customer || !customer.name || !customer.phone) {
      return res.status(400).json({ success: false, message: 'Customer name and phone number are required.' });
    }

    const cleanPhone = customer.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return res.status(400).json({ success: false, message: 'Please provide a valid 10-digit mobile number.' });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Your shopping cart is empty.' });
    }

    // Calculate subtotal from validated item entries
    let subtotal = 0;
    const validatedItems = items.map(item => {
      const qty = Math.max(1, Number(item.quantity) || 1);
      const price = Number(item.pricePerUnit) || 0;
      const total = qty * price;
      subtotal += total;
      return {
        productId: item.productId,
        nameEn: item.nameEn,
        nameHi: item.nameHi || item.nameEn,
        unit: item.unit,
        quantity: qty,
        pricePerUnit: price,
        totalPrice: total
      };
    });

    // Check delivery area coverage if delivery is selected
    let deliveryFee = 0;
    let deliveryFeeNote = 'Confirmed upon vehicle dispatch';

    if (deliveryPreference === 'yard_pickup') {
      deliveryFee = 0;
      deliveryFeeNote = 'Self Yard Pickup (No Delivery Charges)';
    } else {
      // Check village/PIN coverage
      const db = getLocalDB();
      const rules = db.deliveryRules || DEFAULT_DELIVERY_RULES;
      const matchedArea = rules.supportedAreas.find(a => 
        (customer.village && customer.village.toLowerCase().includes(a.name.toLowerCase())) ||
        (customer.pin && a.pin && customer.pin.trim() === a.pin.trim())
      );

      if (matchedArea) {
        deliveryFee = matchedArea.baseDeliveryFee;
        deliveryFeeNote = deliveryFee === 0 
          ? 'Local Free Delivery Zone' 
          : `Standard Area Fee (₹${deliveryFee})`;
      } else {
        deliveryFeeNote = 'Rate confirmed on dispatch call based on distance';
      }
    }

    const totalAmount = subtotal + deliveryFee;

    // Generate unique human-readable Order Reference ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `MVT-${new Date().getFullYear()}-${randomSuffix}`;

    const orderDoc = {
      orderId,
      customer: {
        name: customer.name.trim(),
        phone: cleanPhone,
        address: customer.address ? customer.address.trim() : 'Gangpur Siswan Area',
        village: customer.village ? customer.village.trim() : 'Gangpur Siswan',
        pin: customer.pin ? customer.pin.trim() : '841210',
        landmark: customer.landmark ? customer.landmark.trim() : '',
        notes: customer.notes ? customer.notes.trim() : ''
      },
      deliveryPreference: deliveryPreference || 'site_delivery',
      items: validatedItems,
      subtotal,
      deliveryFee,
      deliveryFeeNote,
      totalAmount,
      paymentMethod: paymentMethod || 'cash_on_delivery',
      paymentStatus: 'unpaid', // Real-world: Never marked paid until verified
      orderStatus: 'Pending',
      statusHistory: [
        {
          status: 'Pending',
          note: 'Order submitted online by customer',
          timestamp: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (isMongoConnected) {
      const savedOrder = await Order.create(orderDoc);
      return res.status(201).json({
        success: true,
        message: 'Order placed successfully.',
        order: savedOrder
      });
    } else {
      const db = getLocalDB();
      db.orders.unshift(orderDoc);
      saveLocalDB(db);
      return res.status(201).json({
        success: true,
        message: 'Order placed successfully.',
        order: orderDoc
      });
    }
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/orders/:orderId - Customer track order status
app.get('/api/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    if (isMongoConnected) {
      const order = await Order.findOne({ orderId });
      if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
      return res.json({ success: true, order });
    } else {
      const db = getLocalDB();
      const order = db.orders.find(o => o.orderId === orderId);
      if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
      return res.json({ success: true, order });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ----------------------------------------------------
// 3. ADMIN ORDER MANAGEMENT & ANALYTICS API
// ----------------------------------------------------

// POST /api/admin/login - Authenticate Administrator
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  // Validate credentials
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign(
      { username: ADMIN_USER, role: 'admin', store: 'Maa Vindhyavasini Traders' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    return res.json({
      success: true,
      message: 'Admin authentication successful.',
      token,
      admin: { username: ADMIN_USER, name: 'Ajit Kumar Singh', role: 'Proprietor' }
    });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid admin username or password.' });
  }
});

// GET /api/admin/verify - Verify active token
app.get('/api/admin/verify', verifyAdminToken, (req, res) => {
  res.json({ success: true, admin: req.admin });
});

// GET /api/admin/orders - Get all customer orders with filters
app.get('/api/admin/orders', verifyAdminToken, async (req, res) => {
  try {
    const { status, search } = req.query;

    if (isMongoConnected) {
      let query = {};
      if (status && status !== 'all') {
        query.orderStatus = status;
      }
      if (search) {
        query.$or = [
          { orderId: { $regex: search, $options: 'i' } },
          { 'customer.name': { $regex: search, $options: 'i' } },
          { 'customer.phone': { $regex: search, $options: 'i' } }
        ];
      }
      const orders = await Order.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: orders.length, orders });
    } else {
      const db = getLocalDB();
      let orders = db.orders || [];
      if (status && status !== 'all') {
        orders = orders.filter(o => o.orderStatus === status);
      }
      if (search) {
        const s = search.toLowerCase();
        orders = orders.filter(o => 
          o.orderId.toLowerCase().includes(s) ||
          o.customer.name.toLowerCase().includes(s) ||
          o.customer.phone.includes(s)
        );
      }
      return res.json({ success: true, count: orders.length, orders });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/admin/orders/:orderId/status - Update order lifecycle status
app.patch('/api/admin/orders/:orderId/status', verifyAdminToken, async (req, res) => {
  try {
    const { status, note } = req.body;
    const validStatuses = ['Pending', 'Confirmed', 'Processing', 'Dispatched', 'Delivered', 'Cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid order status value.' });
    }

    if (isMongoConnected) {
      const order = await Order.findOne({ orderId: req.params.orderId });
      if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });

      order.orderStatus = status;
      order.updatedAt = new Date();
      order.statusHistory.push({
        status,
        note: note || `Status updated to ${status} by proprietor`,
        timestamp: new Date()
      });
      await order.save();
      return res.json({ success: true, order });
    } else {
      const db = getLocalDB();
      const idx = db.orders.findIndex(o => o.orderId === req.params.orderId);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Order not found.' });

      db.orders[idx].orderStatus = status;
      db.orders[idx].updatedAt = new Date();
      db.orders[idx].statusHistory.push({
        status,
        note: note || `Status updated to ${status} by proprietor`,
        timestamp: new Date()
      });
      saveLocalDB(db);
      return res.json({ success: true, order: db.orders[idx] });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/admin/orders/:orderId/payment - Verify payment status
app.patch('/api/admin/orders/:orderId/payment', verifyAdminToken, async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    if (!['unpaid', 'verified_paid'].includes(paymentStatus)) {
      return res.status(400).json({ success: false, message: 'Invalid payment status value.' });
    }

    if (isMongoConnected) {
      const order = await Order.findOneAndUpdate(
        { orderId: req.params.orderId },
        { paymentStatus, updatedAt: new Date() },
        { new: true }
      );
      if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });
      return res.json({ success: true, order });
    } else {
      const db = getLocalDB();
      const idx = db.orders.findIndex(o => o.orderId === req.params.orderId);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Order not found.' });
      db.orders[idx].paymentStatus = paymentStatus;
      db.orders[idx].updatedAt = new Date();
      saveLocalDB(db);
      return res.json({ success: true, order: db.orders[idx] });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/admin/stats - Overview analytics
app.get('/api/admin/stats', verifyAdminToken, async (req, res) => {
  try {
    let orders = [];
    let productsCount = 0;

    if (isMongoConnected) {
      orders = await Order.find({});
      productsCount = await Product.countDocuments();
    } else {
      const db = getLocalDB();
      orders = db.orders || [];
      productsCount = db.products.length;
    }

    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.orderStatus === 'Pending').length;
    const confirmedOrders = orders.filter(o => o.orderStatus === 'Confirmed' || o.orderStatus === 'Processing').length;
    const dispatchedOrders = orders.filter(o => o.orderStatus === 'Dispatched').length;
    const deliveredOrders = orders.filter(o => o.orderStatus === 'Delivered').length;
    const totalRevenue = orders
      .filter(o => o.orderStatus !== 'Cancelled')
      .reduce((acc, o) => acc + (o.totalAmount || 0), 0);

    return res.json({
      success: true,
      stats: {
        totalOrders,
        pendingOrders,
        confirmedOrders,
        dispatchedOrders,
        deliveredOrders,
        totalRevenue,
        productsCount
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ----------------------------------------------------
// 4. DELIVERY RULES API
// ----------------------------------------------------

// GET /api/delivery-rules
app.get('/api/delivery-rules', async (req, res) => {
  try {
    if (isMongoConnected) {
      const rules = await DeliveryRule.findOne({});
      return res.json({ success: true, rules: rules || DEFAULT_DELIVERY_RULES });
    } else {
      const db = getLocalDB();
      return res.json({ success: true, rules: db.deliveryRules || DEFAULT_DELIVERY_RULES });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/admin/delivery-rules
app.put('/api/admin/delivery-rules', verifyAdminToken, async (req, res) => {
  try {
    const updatedRules = { ...req.body, updatedAt: new Date() };
    if (isMongoConnected) {
      const rules = await DeliveryRule.findOneAndUpdate({}, updatedRules, { upsert: true, new: true });
      return res.json({ success: true, rules });
    } else {
      const db = getLocalDB();
      db.deliveryRules = updatedRules;
      saveLocalDB(db);
      return res.json({ success: true, rules: db.deliveryRules });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    store: 'Maa Vindhyavasini Traders',
    owner: 'Ajit Kumar Singh',
    location: 'Gangpur Siswan, Bihar',
    database: isMongoConnected ? 'MongoDB (Connected)' : 'Local Persistent Store (Active)',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Maa Vindhyavasini Traders E-Commerce Server running on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Admin Login: username: "${ADMIN_USER}"`);
});
