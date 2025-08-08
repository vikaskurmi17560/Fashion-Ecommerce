const Products = require("../models/product");
const { uploadMultipleImages, uploadSingleImage } = require("../services/cloudinary");


exports.createProduct = async (req, res) => {
  const { name, original_price, sale_price, brief_description, shipping_charge, stock, description, features, average_rating, colors, sizes, category } = req.body;
  const newProduct = { name, original_price, sale_price, brief_description, shipping_charge, stock, description, features, average_rating, colors, sizes, category };
  try {

    if (req.files) {

      if (req.files.cover_image) {
        const path = req.files.cover_image[0].path;
        const uploadedImage = await uploadSingleImage(path);
        newProduct.cover_image = uploadedImage.secure_url
      }

      if (req.files.images) {
        const paths = [];

        req.files.images.forEach(image => {
          paths.push(image.path);
        });

        const uploadedImages = await uploadMultipleImages(paths);

        newProduct.images = uploadedImages.map((image) => {
          return image.secure_url
        })

      }
    }
    const NewProduct = await Products.create(newProduct);


    return res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: NewProduct,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


exports.get_product = async (req, res) => {
  try {
    const { product_id } = req.query
    const product = await Products.findById(product_id)
    return res.status(200).json({
      success: true,
      message: "product fetch Successfully",
      data: product
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: Error.message
    })
  }

}

exports.productPagination = async (req, res) => {
  try {
    let { page = 1, quantity = 10, category = "All", price, search } = req.query;

    page = parseInt(page);
    quantity = parseInt(quantity);
    price = price ? parseFloat(price) : undefined;

    const skipItems = (page - 1) * quantity;
    let filter = {};

    if (category !== "All") {
      filter.category = category;
    }

    if (!isNaN(price)) {
      filter.sale_price = { $lte: price };
    }

    if (search && search.trim() !== "") {
      filter.name = { $regex: search.trim(), $options: "i" }; 
    }

    const products = await Products.find(filter)
      .skip(skipItems)
      .limit(quantity);

    const totalItems = await Products.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / quantity);

    return res.status(200).json({
      success: true,
      data: products,
      page,
      quantity,
      totalItems,
      totalPages,
      message: products.length === 0 ? "No products found" : "Pagination successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Pagination error",
    });
  }
};