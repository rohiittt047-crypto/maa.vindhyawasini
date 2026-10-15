import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  nameEn: { type: String, required: true },
  nameHi: { type: String, required: true },
  unit: { type: String, required: true },
  quantity: { type: Number, required: true },
  pricePerUnit: { type: Number, required: true },
  totalPrice: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    village: { type: String, required: true },
    pin: { type: String, required: true },
    landmark: { type: String, default: '' },
    notes: { type: String, default: '' }
  },
  deliveryPreference: {
    type: String,
    enum: ['site_delivery', 'yard_pickup'],
    default: 'site_delivery'
  },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  deliveryFee: { type: Number, default: 0 },
  deliveryFeeNote: { type: String, default: 'Confirmed upon vehicle dispatch' },
  totalAmount: { type: Number, required: true },
  paymentMethod: {
    type: String,
    enum: ['cash_on_delivery', 'upi_on_delivery', 'yard_payment'],
    default: 'cash_on_delivery'
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'verified_paid'],
    default: 'unpaid'
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Processing', 'Dispatched', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  statusHistory: [
    {
      status: String,
      note: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
