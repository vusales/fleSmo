const {
    Category
} = require("../models/Category"); 


const getCategoryData =  async (req , res) => {
    const result = await Category.find().populate("subCategories"); 
    res.send({
        data : result 
    }); 
}

module.exports = {
    getCategoryData ,
}