const categoryModel = require("../models/categorymodel");

module.exports.createProduct = async(req,res)=>{
      try{
         const {name,brand,category,price,description,stock,warehouse,quantity} = req.body;
         if (!name) {
            return res.status(400).json({ error: 'Name is required' });
          }
          
          if (!brand) {
            return res.status(400).json({ error: 'Brand is required' });
          }
          
          if (!category) {
            return res.status(400).json({ error: 'Category is required' });
          }
          
          if (!price) {
            return res.status(400).json({ error: 'Price is required' });
          }
          
          if (!description) {
              return res.status(400).json({error: 'Description is required'});
          }
          // validating the category 
          const categoryExists = await categoryModel.findOne({
            category
          })
          if(!categoryExists){
             return res.status(400).json({
                 message:"Category Is Not Exists"
             })
          }
          // validating product exists 

          const productExists = await Product.fineOne({name})
           
          if(productExists){
            return res.status(400).json({
                message:"Product Is Exists"
            })
          }


          const productsCreate = await Product.crate({
                name,
                category,
                price,
                description,
                images
          })
         
          return res.status(200).json({
            data:productsCreate,
            message:"Product Is Created"
          })
          

      }  
      catch(error){
          return res.status(400).json({
            message:"Error While Creating Product"
          })
      }
}