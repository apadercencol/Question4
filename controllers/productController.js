const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createProduct = async (req, res) => {
    const { name, description, price, quantity, category } = req.body;

    const newProduct = new Product({
        name,
        description,
        price,
        quantity,
        category
    });

    try {
        const product = await newProduct.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) throw Error('Product not found');
        res.json(product);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    const { name, description, price, quantity, category } = req.body;

    try {
        const product = await Product.findById(req.params.id);
        if (!product) throw Error('Product not found');

        product.name = name;
        product.description = description;
        product.price = price;
        product.quantity = quantity;
        product.category = category;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) throw Error('Product not found');

        await Product.deleteOne({ _id: req.params.id });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.deleteAllProducts = async (req, res) => {
    try {
        await Product.deleteMany();
        res.json({ message: 'All products deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.searchProductsByName = async (req, res) => {
    const { name } = req.query;
    try {
        const products = await Product.find({ name: { $regex: name, $options: 'i' } });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
