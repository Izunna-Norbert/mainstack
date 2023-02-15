import {
  IGetProductByCategory,
  IGetProductById,
  IGetProductByName,
  IGetProducts,
  IProduct,
  IUpdateProductById,
  RProductResponse,
} from '../interfaces/product.interface';
import ProductRepo from '../repos/product.repo';

export default class ProductUsecase {
  private productRepo: ProductRepo;
  constructor(productRepo: ProductRepo) {
    this.productRepo = productRepo;
  }

  async createProduct(data: IProduct): Promise<RProductResponse> {
    try {
      const response = await this.productRepo.createProduct(data);
      return {
        success: true,
        message: 'Product created successfully',
        data: response,
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Error creating product',
        data: null,
        error: error.message,
      };
    }
  }

  async getProductById(data: IGetProductById): Promise<RProductResponse> {
    try {
      const response = await this.productRepo.getProductById(data.id);
      return {
        success: response ? true : false,
        message: response ? 'Product found' : 'Product not found',
        data: response,
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Product not found',
        data: null,
        error: error.message,
      };
    }
  }

  async getProductByName(data: IGetProductByName): Promise<RProductResponse> {
    try {
      const response = await this.productRepo.getProductByName(data.name);
      return {
        success: response ? true : false,
        message: response ? 'Product found' : 'Product not found',
        data: response,
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Product not found',
        data: null,
        error: error.message,
      };
    }
  }

  async getProducts(data: IGetProducts): Promise<RProductResponse> {
    try {
      console.log('data', data);
      const { page = 1, limit = 10 } = data;
      const response = await this.productRepo.getProducts({ page, limit });
      return {
        success: true,
        message: 'Products found',
        data: response.products,
        total: response.total,
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Products not found',
        data: null,
        error: error.message,
      };
    }
  }

  async getProductByCategory(data: IGetProductByCategory): Promise<RProductResponse> {
    try {
      const { page = 1, limit = 10 } = data;
      const response = await this.productRepo.getProductByCategory(data.category, { page, limit });
      return {
        success: true,
        message: 'Products found',
        data: response.products,
        total: response.total,
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Products not found',
        data: null,
        error: error.message,
      };
    }
  }

  async updateProductById(data: IUpdateProductById): Promise<RProductResponse> {
    try {
      const response = await this.productRepo.updateProductById(data.id, data);
      return {
        success: true,
        message: 'Product updated successfully',
        data: response,
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Error updating product',
        data: null,
        error: error.message,
      };
    }
  }

  async deleteProductById(data: IGetProductById): Promise<RProductResponse> {
    try {
      const response = await this.productRepo.deleteProductById(data.id);
      return {
        success: response ? true : false,
        message: response ? 'Product deleted successfully' : 'Product not found',
        data: response,
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Error deleting product',
        data: null,
        error: error.message,
      };
    }
  }
}
