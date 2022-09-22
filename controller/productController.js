const {
    Card , 
    Promotion ,
}=  require("../models/Card"); 
const {
    ProductOptions , 
    ProductFeature ,
} = require("../models/ProductOPtions");

const createSeed = () => {
    const newProductFeature = new ProductFeature({
        icon: "" , 
        title: "someFeature" , 
        description: "some description about product" , 
    }); 
    const newProductOptions =  new ProductOptions({
        title: "OptionsTitle" ,
        price: 40 , 
        serviceName: "likes" ,  
        serviceAmount: "1000", 
        serviceIncreasementStep: "10" , 
        productDescription: "absjghduj hagvujhasb gyasdh uyghaisjuiy9q ouiit778 ter6q7wtf", 
        productFeatures : [] , 
    }); 
    newProductFeature.save() ;
    newProductOptions.productFeatures.push(newProductFeature);
    newProductOptions.save();

    const newCard = new Card({
        image:"iNSTAGRAM IMG" , 
        title: "instagram" , 
        price:70,
        description: "lorem lorem lorem lorem", 
        link: "",
        promotions: [] , 
        options:  []  , 
    }); 

    const newProm =  new Promotion({
        promotion: "string" , 
        color: "red" , 
    }); 

    newProm.save(); 
    newCard.promotions.push(newProm); 
    newCard.options.push(newProductOptions); 
    newCard.save();
}

const seed = async (req , res) => {
    createSeed(); 
    res.send("ok"); 
}

const getProducts =  async (req ,res) => {
    try {
        const products = await Card.find({}).populate("options").exec(); 
        res.send({
            data: products
        });
    }catch(err){
        console.log("getProducts error" ,  {err}); 
        res.send({data:[]}); 
    }
}

const getProductOptionsById = async (req, res) => {
    try{
        let productId =  req.params.id ; 
        console.log("n bkds" ,  productId );
        const result =  await ProductOptions.findById(productId).exec(); 
        res.send({
            data: result , 
        }); 

    }catch(err){
        console.log("getProductOptionsById error" ,  {err}); 
        res.send({data:[]}); 
    }
}

module.exports = {
    seed , 
    getProducts ,
    getProductOptionsById ,
}


