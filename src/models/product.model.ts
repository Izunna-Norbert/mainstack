import { Schema } from 'mongoose';
import { PRODUCT_CATEGORIES } from '../packages/constants/constants';
import { MProduct } from './interfaces/model.interface';

const ProductSchema = new Schema<MProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: false },
    category: { type: String, required: true, enum: PRODUCT_CATEGORIES },
    brand: { type: String, required: false },
  },
  { timestamps: true },
);

export default ProductSchema;
