const Products = require("../models/product");
const { uploadMultipleImages, uploadSingleImage } = require("../services/cloudinary");


//--------------------------------------------->create Product function<-----------------------------------------------------------------------
exports.createProduct = async (req, res) => {
  const { name, original_price, sale_price,brief_description,shipping_charge,stock,description,features,average_rating,colors,sizes,category  } = req.body;
  const newProduct={ name, original_price, sale_price,brief_description,shipping_charge,stock,description,features,average_rating,colors,sizes,category };
  try {
    
    console.log(req.files);
    //check karenge ki req.file hai ki nhi
    if(req.files){
      
      if(req.files.cover_image){
        const path=req.files.cover_image[0].path;
        const uploadedImage=await uploadSingleImage(path);
        newProduct.cover_image=uploadedImage.secure_url
      }
      //check karenge ki req.file.images hai ki nhi
      if(req.files.images){
        const paths=[];
        //path lena hai
        req.files.images.forEach(image => {
          paths.push(image.path);
        });
        //path bhejna hai
        const uploadedImages=await uploadMultipleImages(paths);
        //images related information ko store karna hai
        newProduct.images=uploadedImages.map((image)=>{
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
//--------------------------------------------->get Products function<-----------------------------------------------------------------------
exports.get_products= async (req,res)=>{

try{
  const products =await Products.find().sort({createdAt:-1});
  return res.status(200).json({
    success:true,
    message:"Product Fetch successfully",
    data:products
  })

}
catch(Error){
  return res.status(500).json({
    success:false,
    message:Error.message
  })
}
};

//--------------------------------------------->get only one item---------------------------------------------------------------------------
exports.get_product= async (req,res)=>{
  try{
    const {product_id}=req.query
  const product=await Products.findById(product_id)
  return res.status(200).json({
    success:true,
    message:"product fetch Successfully",
    data:product
  })
  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:Error.message
    })
  }

}

//--------------------------------------------->Update Product function<-----------------------------------------------------------------------
exports.update_products= async (req,res)=>{
 
    //first d-structure kro fields ko from the frontend
    const {name, original_price, sale_price,brief_description,shipping_charge,stock,description,features,average_rating,colors,sizes,category,productId}=req.body;
    // also take a product_id
    const {product_id}=req.query
    if(!product_id){
      return res.status(500).json({
        success:false,
        message:"product_id not here",
      })
    }

    console.log("req.file hai ye",req.files);
    //we apply logic if updated field is available then update 
    // we take update object
    const  updateObject={};
    if(name){
      updateObject.name=name;
    }
    if(original_price){
      updateObject.original_price=original_price;
    }
    if(sale_price){
      updateObject.sale_price=sale_price;
    }
    if(brief_description){
      updateObject.brief_description=brief_description;
    }
    if(shipping_charge){
      updateObject.shipping_charge=shipping_charge;
    }
    if(stock,description){
      updateObject.stock,description=stock,description;
    }
    if(features){
      updateObject.features=features;
    }
    if(average_rating){
      updateObject.average_rating=average_rating;
    }
    if(colors){
      updateObject.colors=colors;
    }
    if(sizes){
      updateObject.sizes=sizes;
    }
    if(category){
      updateObject.category=category;
    }
    if(productId){
      updateObject.product_id=productId;
    }
   
     
    if(req.files){
      const paths=[];
      if(req.files.cover_image){
        paths.push(req.files.cover_image[0].path);
      }
      if(req.files.images){
        req.files.images.forEach(image => {
          paths.push(image.path);
        });
      }
      const uploadedImages=await uploadMultipleImages(paths);
      if(req.files.cover_image){
        updateObject.cover_image=uploadedImages[0].secure_url
      }
      updateObject.images=uploadedImages.map((image)=>image.secure_url);
    }
    



      try{ 
        const updated_product = await Products.findByIdAndUpdate(product_id, updateObject, { new: true, });
            return res.status(200).json({
              success: true,
              message: "product updated successfully",
              data: updated_product,
            });

      }

  catch(error){
   return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

//--------------------------------------------->Delete Product function<-----------------------------------------------------------------------
exports.delete_product= async (req,res) => {
  const {product_id}=req.query;
  if(!product_id){
    return res.status(500).json({
            success: false,
            message: "Product_id is required",
          }); 
  }
  try{
    const Product=Products.findByIdAndDelete(Product_id);
    if(!Product){
      return res.status(404).json({
                success: false,
                message: "Product not found",
              });
    }

    return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
          });
  }catch (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
}
