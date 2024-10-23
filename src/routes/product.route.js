import express from 'express';
import  getPaginatedProducts  from '../controllers/product.controller.js'; 
const router = express.Router();


router.get('/products', getPaginatedProducts);

export default router; 
