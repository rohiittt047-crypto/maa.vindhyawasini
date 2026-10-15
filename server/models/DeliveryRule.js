import mongoose from 'mongoose';

const deliveryRuleSchema = new mongoose.Schema({
  supportedAreas: [
    {
      name: { type: String, required: true }, // e.g. Gangpur Siswan, Siswan, Siwan, Hasanpura
      district: { type: String, default: 'Siwan, Bihar' },
      pin: { type: String },
      baseDeliveryFee: { type: Number, default: 0 },
      isSupported: { type: Boolean, default: true }
    }
  ],
  pricingPolicy: {
    type: String,
    default: 'distance_and_vehicle_based',
    enum: ['free_local', 'fixed_fee', 'distance_and_vehicle_based', 'confirm_by_call']
  },
  noteEn: { 
    type: String, 
    default: 'Heavy materials delivery rates in Gangpur Siswan depend on trip volume (Trolley/Truck) and exact distance.' 
  },
  noteHi: { 
    type: String, 
    default: 'गंगपुर सिसवन एवं नजदीकी क्षेत्रों में भारी सामग्री का ढुलाई शुल्क वाहन प्रकार (ट्रॉली/ट्रक) और दूरी के अनुसार तय होता है।' 
  },
  updatedAt: { type: Date, default: Date.now }
});

const DeliveryRule = mongoose.models.DeliveryRule || mongoose.model('DeliveryRule', deliveryRuleSchema);
export default DeliveryRule;
