import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  nameEn: { type: String, required: true },
  nameHi: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['sand', 'aggregates', 'steel', 'cement', 'bricks', 'hardware', 'other'] 
  },
  categoryEn: { type: String, required: true },
  categoryHi: { type: String, required: true },
  descEn: { type: String, required: true },
  descHi: { type: String, required: true },
  price: { type: Number, required: true }, // Selling price per unit in INR
  unit: { type: String, required: true }, // e.g. CFT, Bag, Kg, Tonne, 1000 Bricks, Trolley
  unitHi: { type: String, required: true },
  availableUnits: [{ type: String }], // Optional alternative units
  minOrderQty: { type: Number, default: 1 },
  stockStatus: { 
    type: String, 
    default: 'in_stock',
    enum: ['in_stock', 'limited', 'call_for_rate', 'out_of_stock'] 
  },
  image: { type: String, required: true },
  fallbackImage: { type: String },
  isFeatured: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
