import { Router } from 'express';
import * as mainController from '../controllers/main';
import * as productsController from '../controllers/products';

const router = Router();

router.get('/', mainController.index);
router.get('/lorem/:paragraphs', mainController.loremIpsum);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);

router.get('/products', productsController.index);
router.get('/products/create', productsController.create);
router.post('/products', productsController.store);
router.get('/products/:id/edit', productsController.edit);
router.post('/products/:id/update', productsController.update);
router.post('/products/:id/delete', productsController.destroy);

export default router;
