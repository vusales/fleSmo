const CatalogSchema = require("../models/Catalog"); 


const getCatalogData =  async (req , res) => {
    const result = await CatalogSchema.find().populate("subCatalogs"); 
    res.send({
        data : result 
    }); 
}


module.exports = {
    getCatalogData ,
}