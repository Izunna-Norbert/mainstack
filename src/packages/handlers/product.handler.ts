import { Request, Response } from 'express';
import Joi from 'joi';
import { validate } from '../../utils/validation.util';
import { PRODUCT_CATEGORIES } from '../constants/constants';
import ProductUsecase from '../usecases/product.usecase';

export default class ProductHandler {
  private productUsecase: ProductUsecase;
  constructor(
    productUsecase: ProductUsecase,
  ) {
    this.productUsecase = productUsecase;
  }
  createProduct = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        category: Joi.string().required().valid(...PRODUCT_CATEGORIES),
        image: Joi.string().optional(),
        brand: Joi.string().optional(),
      });
      validate(schema, data);
      const response = await this.productUsecase.createProduct(data);
      if (response.success) {
        return res.status(201).json({ message: response.message, data: response.data });
      }
      return res.status(400).json({ message: response.message, error: response.error });
    } catch (error: any) {
      console.error('error', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: error.message, error: error.name });
      }
      return res.status(500).json({ success: false, message: error.message, error: error.name });
    }
  }

  getProductById = async (req: Request, res: Response) => {
    try {
      const data = req.params;
      const schema = Joi.object({
        id: Joi.string().required(),
      });
      validate(schema, data);
      const { id } = data;
      const response = await this.productUsecase.getProductById({ id });
      if (response.success) {
        return res.status(200).json({ message: response.message, data: response.data });
      }
      return res.status(404).json({ message: response.message, error: response.error });
    } catch (error: any) {
      console.error('error', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: error.message, error: error.name });
      }
      return res.status(500).json({ success: false, message: error.message, error: error.name });
    }
  }

  getProductByName = async (req: Request, res: Response) => {
    try {
      const data = req.params;
      const schema = Joi.object({
        name: Joi.string().required(),
      });
      validate(schema, data);
      const { name } = data;
      const response = await this.productUsecase.getProductByName({ name });
      if (response.success) {
        return res.status(200).json({ message: response.message, data: response.data });
      }
      return res.status(404).json({ message: response.message, error: response.error });
    } catch (error: any) {
      console.error('error', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: error.message, error: error.name });
      }
      return res.status(500).json({ success: false, message: error.message, error: error.name });
    }
  }

  getProducts = async (req: Request, res: Response) =>{
    try {
      const data = req.query;
      const schema = Joi.object({
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
      });
      validate(schema, data);
      const page = parseInt(data.page as string) || 1;
      const limit = parseInt(data.limit as string) || 10;
      console.info('page', page);
      console.info('limit', limit);
      console.info('prrrrr', this.productUsecase);
      const response = await this.productUsecase.getProducts({ page, limit });
      if (response.success) {
        return res.status(200).json({ message: response.message, data: response.data, total: response.total });
      }
      return res.status(404).json({ message: response.message, error: response.error });
    } catch (error: any) {
      console.error('error', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: error.message, error: error.name });
      }
      return res.status(500).json({ success: false, message: error.message, error: error.name });
    }
  }

  getProductByCategory = async (req: Request, res: Response) => {
    try {
      const data = req.params;
      const schema = Joi.object({
        category: Joi.string().required().valid(...PRODUCT_CATEGORIES),
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
      });
      validate(schema, data);
      const { category } = data;
      const page = parseInt(data.page as string) || 1;
      const limit = parseInt(data.limit as string) || 10;
      const response = await this.productUsecase.getProductByCategory({ category, page, limit });
      if (response.success) {
        return res.status(200).json({ message: response.message, data: response.data });
      }
      return res.status(404).json({ message: response.message, error: response.error });
    } catch (error: any) {
      console.error('error', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: error.message, error: error.name });
      }
      return res.status(500).json({ success: false, message: error.message, error: error.name });
    }
  }

  updateProduct = async (req: Request, res: Response) => {
    try {
      const data = { ...req.body, ...req.params}
      const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().optional(),
        description: Joi.string().optional(),
        price: Joi.number().optional(),
        image: Joi.string().optional(),
        category: Joi.string().valid(...PRODUCT_CATEGORIES).optional(),
        brand: Joi.string().optional(),
      });
      validate(schema, data);
      const response = await this.productUsecase.updateProductById(data);
      if (response.success) {
        return res.status(200).json({ message: response.message, data: response.data });
      }
      return res.status(404).json({ message: response.message, error: response.error });
    } catch (error: any) {
      console.error('error', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: error.message, error: error.name });
      }
      return res.status(500).json({ success: false, message: error.message, error: error.name });
    }
  }

  deleteProduct = async (req: Request, res: Response) => {
    try {
      const data = req.params;
      const schema = Joi.object({
        id: Joi.string().required(),
      });
      validate(schema, data);
      const { id } = data;
      const response = await this.productUsecase.deleteProductById({ id });
      if (response.success) {
        return res.status(200).json({ message: response.message, data: response.data });
      }
      return res.status(404).json({ message: response.message, error: response.error });
    } catch (error: any) {
      console.error('error', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: error.message, error: error.name });
      }
      return res.status(500).json({ success: false, message: error.message, error: error.name });
    }
  }
}
