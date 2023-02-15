import DbModels from '../../config/db.models.config';
import { MProduct } from '../../models/interfaces/model.interface';
import { IPagination, IProduct, RGetProducts } from '../interfaces/product.interface';

export default class ProductRepo {
  private readonly dbModels: typeof DbModels
  constructor(dbModels: typeof DbModels) {
    this.dbModels = dbModels;
  }

  async createProduct(data: IProduct): Promise<MProduct> {
    return await this.dbModels.Product.create(data);
  }

  async getProducts(pagination: IPagination): Promise<RGetProducts> {
    const { limit, page } = pagination;
    const products = await this.dbModels.Product.find({})
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await this.dbModels.Product.countDocuments();
    return { products, total };
  }

  async getProductById(id: string): Promise<MProduct | null> {
    return await this.dbModels.Product.findById(id);
  }

  async getProductByName(name: string): Promise<MProduct | null> {
    return await this.dbModels.Product.findOne({ name });
  }

  async getProductByCategory(category: string, pagination: IPagination): Promise<RGetProducts> {
    const { limit, page } = pagination;
    const products = await this.dbModels.Product.find({ category })
      .skip((page - 1) * limit)
      .limit(limit);
    
    const total = await this.dbModels.Product.countDocuments({ category });
    return { products, total };

  }

  async updateProductById(id: string, data: IProduct): Promise<MProduct | null> {
    return await this.dbModels.Product.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteProductById(id: string): Promise<MProduct | null> {
    return await this.dbModels.Product.findByIdAndDelete(id);
  }
}
