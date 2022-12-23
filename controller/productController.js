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
const sanitizer = require('sanitizer');


const createSeed = async () => {
    const newProductFeature = new ProductFeature({
        icon: "someIcon" , 
        title: "someFeature FACEbOOK 3" , 
        description: "some description about Twitter Twitter" , 
    }); 
    const newProductOptions =  new ProductOptions({
        title: "OPop" ,
        price: 855 , 
        serviceName: "subscriptions" ,  
        serviceAmount: "8000" , 
        serviceIncreasementStep: "800" , 
        productDescription: "absjghduj hagvujhasb gyasdh uyghaisjuiy9q ouiit778 ter6q7wtf", 
        productFeatures : [] , 
    }); 
    
    const newProm =  new Promotion({
        promotion: "FACEbOOK string 3" , 
        color: "red" , 
    }); 

    const newCategory =  new Category({
        icon: "icon.png" , 
        categoryName: "FACEbOOK 3" , 
        link: "" ,
        subCategories : [] , 
    })

    const subCategories =  new SubCatgory({
        icon: "Sub_icon", 
        categoryName: "subCatalogName_3_FACEbOOK_3", 
        link: "subCat_someLink_3",
    }); 

    // product.categories key
    await subCategories.save(); 
    newCategory.subCategories.push(subCategories) ; 
    await newCategory.save();
    // product.options key
    await newProductFeature.save() ;
    await newProductOptions.productFeatures.push(newProductFeature);
    await newProductOptions.save();
    // product.promotion key
    await newProm.save(); 
    // base Product model key
    const newProduct = new Product({
        image:"Twitter IMG" , 
        title: "Twitter" , 
        price:90,
        description: "lorem lorem lorem lorem", 
        link: "",
        promotions: [], 
        options: newProductOptions?._id , 
        categories : [], 
        user_choice: false , 
        smm_for_business: false , 
        big_brands: true , 
    }); 
    await newProduct.promotions.push(newProm); 
    // await newProduct.options.push(newProductOptions); 
    await newProduct.save();

}

const seed = async (req , res) => {
    createSeed(); 
    res.send("ok"); 
}

const getProducts =  async (req ,res) => {
    try {
        const products = await Product.find({}).populate("options").exec(); 
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
            const result =  await Product.findById(productId).populate("options").exec(); 
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
        const {categoryId , subCategoryId } =  req.query ; 
        const products = await Product.find().populate("options") ; 
        // .populate({ 
        //     path: 'categories',
        //     populate: {
        //         path: 'subCategories',
        //         model: 'SubCategories'
        //     } 
        // });

        if(products.length) {
            let filteredProduct =  products.map(( product , index )=> {
                if(
                    categoryId 
                    && product?.category_id?.toString() === categoryId.trim() 
                ){ 
                    return product;   
                }else if(
                    subCategoryId 
                    && 
                    product?.subcategory_id?.toString() === subCategoryId.trim() 
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
    const cheapServicess =  await Product.find({}).populate(["options"]).sort([['price', 'asc']]).limit(50);
    const userChoice =  await Product.find({user_choice:true}).populate(["options"]).limit(50);
    const smmForBusiness =  await Product.find({smm_for_business:true}).populate(["options" ]).limit(50);
    const bigBrands =  await Product.find({big_brands:true}).populate(["options" ]).limit(50);

    res.send({
      specaialProducts : {
        cheapServicess : {
            products : cheapServicess , 
        },
        userChoice: {
            products : userChoice , 
        },
        smmForBusiness :{
            products : smmForBusiness , 
        } ,
        bigBrands : {
            products : bigBrands , 
        }
      }
    })
}

const search  =  async (req , res) => {
    try {
        let {title} = req.body ; 
        title = sanitizer.escape(title);
        if(!title) return res.status(400).send("İstifadəçi məlumatları düzgün deyil"); 
        const products = await Product.find({
            "title" : { 
            $regex: title , 
            $options: 'i' 
        }}).populate("options").exec();
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


