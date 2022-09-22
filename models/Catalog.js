const mongoose = require("mongoose") ; 

const subCatalogs =  new mongoose.Schema({
    icon: {
        type: String , 
    }, 
    catalogName: {
        type: String , 
    }, 
    link: {
        type: String , 
    }, 
})

const CatalogSchema  =  new mongoose.Schema({
    icon: {
        type: String , 
    }, 
    catalogName: {
        type: String , 
    }, 
    link: {
        type: String , 
    }, 
    subCatalogs : [{type: mongoose.Schema.Types.ObjectId , ref: "SubCatalogs"  }] , 
}); 


let Catalog =  mongoose.model("Catalogs" , CatalogSchema ); 
let SubCat =  mongoose.model("SubCatalogs" , subCatalogs ); 

// let SubCatA =  new SubCat({
//     icon: "Sub_icon", 
//     catalogName: "subCatalogName", 
//     link: "subCat_someLink",
// }); 
// SubCatA.save() ; 


// let CatA = new Catalog({
//     icon: "icon", 
//     catalogName: "CatalogName", 
//     link: "someLink",
//     subCatalogs : [] , 
// }); 

// CatA.subCatalogs.push(SubCatA) ; 
// CatA.save();

module.exports = Catalog ; 
