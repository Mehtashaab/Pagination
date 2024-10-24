import mongoose from 'mongoose';
import Chance from 'chance';
import Product from '../models/product.model.js';
import connectDB from '../db/index.js';

const chance = new Chance();

const saveProductsToDB = async (numProducts) => {
  try {
    await connectDB();
    const products = generateFakeProducts(numProducts);
    await Product.insertMany(products);
    console.log(`${numProducts} fake products added to the database.`);
    
    const productCount = await Product.countDocuments();
    console.log(`Total products in database: ${productCount}`);
  } catch (error) {
    console.error('Error saving products to the database:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

const generateFakeProducts = (numProducts) => {
  const products = [];
  for (let i = 0; i < numProducts; i++) {
    products.push({
      name: chance.word({ syllables: 3 }),
      price: chance.floating({ min: 10, max: 100, fixed: 2 }),
      description: chance.sentence({ words: 5 }),
      imageUrl: chance.url(),
    });
  }
  return products;
};

const numProducts = 1000;
saveProductsToDB(numProducts);
