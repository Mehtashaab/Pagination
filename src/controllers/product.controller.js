const generateProducts = () => {
  let products = [];
  for (let i = 1; i <= 100000; i++) {
    products.push({
      id: i,
      name: `Product ${i}`,
      price: (Math.random() * 100).toFixed(2),
      description: `Description for Product ${i}`,
      imageUrl: `https://example.com/product${i}.jpg`,
    });
  }
  return products;
};

// Controller to handle paginated product requests
const getPaginatedProducts = (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const products = generateProducts();

  // Pagination logic
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedProducts = products.slice(startIndex, endIndex);

  // Send paginated data and metadata
  return res.json({
    currentPage: parseInt(page),
    totalPages: Math.ceil(products.length / limit),
    totalProducts: products.length,
    limit: parseInt(limit),
    products: paginatedProducts,
  });
};
export default getPaginatedProducts;
