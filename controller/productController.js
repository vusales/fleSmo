const {
    Product , 
    Promotion ,
}=  require("../models/Products"); 
const {
    ProductOptions , 
    ProductFeature ,
} = require("../models/ProductOPtions");
const {
    Category , 
    SubCatgory , 
} = require("../models/Category"); 

const createSeed = () => {
    const newProductFeature = new ProductFeature({
        icon: "someIcon" , 
        title: "someFeature Twitter" , 
        description: "some description about Twitter Twitter" , 
    }); 
    const newProductOptions =  new ProductOptions({
        title: "OPop" ,
        price: 855 , 
        serviceName: "likes" ,  
        serviceAmount: "4000" , 
        serviceIncreasementStep: "600" , 
        productDescription: "absjghduj hagvujhasb gyasdh uyghaisjuiy9q ouiit778 ter6q7wtf", 
        productFeatures : [] , 
    }); 
    
    const newProduct = new Product({
        image:"Twitter IMG" , 
        title: "Twitter" , 
        price:90,
        description: "lorem lorem lorem lorem", 
        link: "",
        promotions: [], 
        options:  [], 
        categories : [], 
    }); 

    const newProm =  new Promotion({
        promotion: "Twitter string" , 
        color: "green" , 
    }); 

    const newCategory =  new Category({
        icon: "icon.png" , 
        categoryName: "Twitter" , 
        link: "" ,
        subCategories : [] , 
    })

    const subCategories =  new SubCatgory({
        icon: "Sub_icon", 
        categoryName: "subCatalogName_2_Twitter", 
        link: "subCat_someLink_3",
    }); 

    // product.categories key
    subCategories.save(); 
    newCategory.subCategories.push(subCategories) ; 
    newCategory.save();
    // product.options key
    newProductFeature.save() ;
    newProductOptions.productFeatures.push(newProductFeature);
    newProductOptions.save();
    // product.promotion key
    newProm.save(); 
    // base Product model key
    newProduct.promotions.push(newProm); 
    newProduct.options.push(newProductOptions); 
    newProduct.categories.push(newCategory); 
    newProduct.save();

}

const seed = async (req , res) => {
    createSeed(); 
    res.send("ok"); 
}

const getProducts =  async (req ,res) => {
    try {
        const products = await Product.find({}).populate("options").populate("categories").exec(); 
        res.send({
            products
        });
    }catch(err){
        console.log("getProducts error" ,  {err}); 
        res.send({products:[]}); 
    }
}

const getProductOptionsById = async (req, res) => {
    try{
        if(req.body.id){
            let productId = req.body.id ; 
            // const result =  await ProductOptions.findById(productId).exec(); 
            const result =  await Product.findById(productId).populate("options").populate("categories").exec(); 
            res.send({
                productById: result , 
            }); 
        }
    }catch(err){
        console.log("getProductOptionsById error" , {err}); 
        res.send({products: []}); 
    }
}

const filter = async (req , res) => {
    try {
        // filter works with category name  and subcategory id 
        const {category , subCategoryId } =  req.query ; 
        const products =  await Product.find().populate("options").populate({ 
            path: 'categories',
            populate: {
                path: 'subCategories',
                model: 'SubCategories'
            } 
        });

        if(products.length) {
            let filteredProduct =  products.map(( product , index )=> {
                if(
                    category 
                    && product.categories[0].categoryName?.toLowerCase().trim() === category.toLowerCase().trim() 
                ){ 
                    return product;   
                }else if(
                    subCategoryId 
                    && 
                    product.categories[0].subCategories?.filter((item) => item?._id.toString() === subCategoryId ).length
                ){
                    return product;   
                }
            }).filter((item) => item !== undefined );
            res.send({
                products: filteredProduct 
            }); 
        }
        
    }catch(err){
        console.log("filterByCategories err" ,  err ); 
        res.send({products:[]}); 
    }
}

const getSpecialProducts = async (req , res ) => {
    // show the cheapest 50 products 
    const cheapServicess =  await Product.find({}).populate(["options", "categories" ]).sort([['price', 'asc']]).limit(50); 

    res.send({
      specaialProducts : {
        cheapServicess : {
            products : cheapServicess , 
        }

      }
    })
}


const search  =  async (req , res) => {
    try {
        const {title} = req.body ; 
        if(!title) return res.status(400).send("İstifadəçi məlumatları düzgün deyil"); 
        const products = await Product.find({
            "title" : { 
            $regex: title , 
            $options: 'i' 
        }}).populate("options").populate("categories").exec();
        res.status(200).send({
            data: products , 
        })
    }catch(err) {
        if(err) return console.log("catch err" ,  err );
    }
}

module.exports = {
    seed , 
    getProducts ,
    getProductOptionsById ,
    filter , 
    getSpecialProducts , 
    search , 
}


