var express = require('express');
var router = express.Router();
let productModel = require('../schemas/products')

/**
 * CREATE: Create a new product
 * POST /api/v1/products
 * Body: { title, slug, price, description, stock, images, category }
 */
router.post('/', async function(req, res, next) {
  try {
    const { title, slug, price, description, stock, images, category } = req.body;

    // Validate required fields
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Product title is required' });
    }
    if (!slug || !slug.trim()) {
      return res.status(400).json({ error: 'Product slug is required' });
    }
    if (!category) {
      return res.status(400).json({ error: 'Product category is required' });
    }

    // Create new product
    const newProduct = new productModel({
      title: title.trim(),
      slug: slug.trim(),
      price: price || 0,
      description: description || '',
      stock: stock || 0,
      images: images || [],
      category: category,
      isDeleted: false
    });

    // Save to database
    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: 'Product created successfully',
      data: savedProduct
    });
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Title or slug already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

/**
 * READ: Get product by ID
 * GET /api/v1/products/:id
 */
router.get('/:id', async function(req, res, next) {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!id) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    // Find product by ID
    const product = await productModel.findById(id).populate('category');

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product retrieved successfully',
      data: product
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * UPDATE: Update product by ID
 * PUT /api/v1/products/:id
 * Body: { title, slug, price, description, stock, images, category }
 */
router.put('/:id', async function(req, res, next) {
  try {
    const { id } = req.params;
    const { title, slug, price, description, stock, images, category } = req.body;

    // Validate ID format
    if (!id) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    // Check if product exists
    const existingProduct = await productModel.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update product fields (only provided fields)
    if (title !== undefined) existingProduct.title = title.trim();
    if (slug !== undefined) existingProduct.slug = slug.trim();
    if (price !== undefined) existingProduct.price = price;
    if (description !== undefined) existingProduct.description = description;
    if (stock !== undefined) existingProduct.stock = stock;
    if (images !== undefined) existingProduct.images = images;
    if (category !== undefined) existingProduct.category = category;

    // Save updated product
    const updatedProduct = await existingProduct.save();

    res.status(200).json({
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Title or slug already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE: Delete product by ID
 * DELETE /api/v1/products/:id
 */
router.delete('/:id', async function(req, res, next) {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!id) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    // Find and delete product
    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product deleted successfully',
      data: deletedProduct
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
