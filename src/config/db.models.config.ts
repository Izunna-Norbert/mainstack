import { MProduct } from '../models/interfaces/model.interface';
import ProductSchema from '../models/product.model';
import { db } from './db.config';

const DbModels = {
  Product: db.model<MProduct>('Product', ProductSchema),
};
export default DbModels;
