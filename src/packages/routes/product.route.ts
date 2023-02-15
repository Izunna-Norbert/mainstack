import express from 'express';
import handlers from '..';

const router = express.Router();

export function ProductRoutes() {
  const handler = handlers.ProductService;

  router.route('/').post(handler.createProduct).get(handler.getProducts);
  router.route('/:id').get(handler.getProductById).put(handler.updateProduct).delete(handler.deleteProduct);
  router.route('/category/:category').get(handler.getProductByCategory);
  router.route('/name/:name').get(handler.getProductByName);

  return router;
}
