import Product from '../models/product.model.js';

const getPaginatedProducts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const pageInt = parseInt(page);
  const limitInt = parseInt(limit);

  try {
    const products = await Product.find()
      .limit(limitInt)
      .skip((pageInt - 1) * limitInt);
    
    const totalProducts = await Product.countDocuments();

    return res.json({
      currentPage: pageInt,
      totalPages: Math.ceil(totalProducts / limitInt),
      totalProducts,
      limit: limitInt,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export default getPaginatedProducts;
