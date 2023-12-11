
const Product = require('../models/productsModel');

module.exports.add_dummy_Products= async (req, res) => {
  try {
    const products = req.body.products;

    // Use Promise.all to parallelize the saving of products
    const productPromises = products.map((product) => {
      const newProduct = new Product({
        image: product.image,
        name: product.name,
        price: product.price,
      });
      return newProduct.save();
    });

    // Wait for all the promises to resolve before sending a response
    await Promise.all(productPromises);

    res.status(200).json({ message: 'Products added successfully' });
  } catch (error) {
    console.error('Error adding products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports.fetch_products=async(req,res)=>{
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}