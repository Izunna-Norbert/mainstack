import { Document } from 'mongoose';

export interface MProduct extends Document {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  brand?: string;
  createdAt: Date;
  updatedAt: Date;
}
