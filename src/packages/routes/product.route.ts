import express from 'express';
import handlers from '..';

const router = express.Router();

export function ProductRoutes() {
    const handler = handlers.ProductService;
    
    router.route('/')
        .post(handler.createProduct)
        .get(handler.getProducts);
    router.route('/:id')
        .get(handler.getProductById)
        .put(handler.updateProduct)
        .delete(handler.deleteProduct);
    router.get('/category/:category', handler.getProductByCategory);
    router.get('/name/:name', handler.getProductByName);

    return router;
}

