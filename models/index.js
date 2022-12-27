const uploadFeature = require('@adminjs/upload');
const AdminJS = require('adminjs');
const Banner = require("./Banner");
var path = require('path');
const InfoCards = require("./InfoCards"); 
const WhyChooseUs = require("./WhyChooseUs"); 
const SiteStatistic =  require("./SiteStatistic"); 
const {
    Category ,
    SubCatgory , 
} = require("./Category"); 
var path = require('path');
require('dotenv').config();
const {beforeHook , afterHook } = require("./adminHooks/index"); 

const {
    Order , 
    SelectedServicess , 
}= require("./Order"); 
const {
    PagesIntroModel , 
    CharacteristicCardsModel ,
} = require("./PagesIntro"); 
const  {
    ProductOptions, 
    ProductFeature ,
} = require("./ProductOPtions");
const {
    Product, 
    Promotion, 
} = require("./Products"); 

const {
    SubscriptionsMainSchemaModel , 
    SubscriptionTypesModel ,  
    SubscriptionServicessModel ,
    ServicessValuesModel ,
} =  require("./Subscriptions"); 

const {
    UserSchema , 
} =  require("./User") ; 


const localProvider = {
    bucket: 'public/images' , 
    opts: {
        baseUrl: "/images" , 
    }
};

const dBase = [
    {
        resource: Banner,
        options: {
            properties: {
                intro:{
                    type: 'string',
                }, 
                title:{
                    type: 'string',
                }, 
                subTitle:{
                    type: 'string',
                }, 
                description: {
                    type: 'string',
                } , 
                buttons:{
                    type: 'array',
                } , 
                uploadedFile: {
                   isVisible: false ,
                }
            } , 
        },
        features: [
            uploadFeature({
                provider: { local: localProvider },
                properties: {
                    key: 'uploadedFile.path',
                    bucket: 'uploadedFile.folder',
                    mimeType: 'uploadedFile.type',
                    size: 'uploadedFile.size',
                    filename: 'uploadedFile.filename',
                    file: 'uploadFile',
                },
                uploadPath: (record, filename) => {
                    return (`/${filename}`);
                },
                validation: {
                    mimeTypes: [
                        "image/jpeg",
                        "image/png",
                        "image/webp", 
                        "image/svg",
                    ]
                },
            }),
        ] , 
    } ,  
    {
        resource: InfoCards,
        options: {
            properties: {
                icon:{
                    type: 'string',
                }, 
                title:{
                    type: 'string',
                }, 
                description:{
                    type: 'string',
                }, 
            }
        },
        features: [
            uploadFeature({
                provider: { local: localProvider },
                properties: {
                    key: "icon" , // to this db field feature will safe S3 key,
                    //mimeType: "mimeType", // this property is important because allows to have previews,
                },
                uploadPath: (record, filename) => (
                    `/${filename}`
                ),
                validation: {
                    mimeTypes: [
                        "image/jpeg",
                        "image/png",
                        "image/webp", 
                        "image/svg",
                    ]
                },
            }),
        ] , 
    } , 
    {
        resource: WhyChooseUs ,
        options: {
            properties: {
                icon: {
                    type: "string" , 
                } , 
                title: {
                    type: "string" , 
                } , 
                description: {
                    type: "string" , 
                } , 
            }
        },
    } , 
    {
        resource: SiteStatistic ,
        options: {
            properties: {
                icon: {
                    type: "string" , 
                } , 
                amount: {
                    type: "number" , 
                } , 
                description: {
                    type: "string" , 
                } ,  
            }
        },
    } , 
    {
        resource: Category ,
        options: {
            properties: {
                icon: {
                    type: "string" , 
                }, 
                categoryName: {
                    type: "string" , 
                }, 
                link: {
                    type: "string" , 
                }, 
                subCategories : {
                    type: "array" , 
                },  
            }
        },
        features: [
            uploadFeature({
                provider: { local: localProvider },
                properties: {
                    key: "icon" , // to this db field feature will safe S3 key,
                    //mimeType: "mimeType", // this property is important because allows to have previews,
                },
                uploadPath: (record, filename) => (
                    `/${filename}`
                ),
                validation: {
                    mimeTypes: [
                        "image/jpeg",
                        "image/png",
                        "image/webp", 
                        "image/svg",
                    ]
                },
            }),
        ],
    } ,
    {
        resource: SubCatgory ,
        options: {
            properties: {
                icon: {
                    type: "string" , 
                }, 
                categoryName: {
                    type: "string" , 
                }, 
                link: {
                    type: "string" , 
                },   
            }
        },
        features: [
            uploadFeature({
                provider: { local: localProvider },
                properties: {
                    key: "icon" , // to this db field feature will safe S3 key,
                    //mimeType: "mimeType", // this property is important because allows to have previews,
                },
                uploadPath: (record, filename) => (
                    `/${filename}`
                ),
                validation: {
                    mimeTypes: [
                        "image/jpeg",
                        "image/png",
                        "image/webp", 
                        "image/svg",
                    ]
                },
            }),
        ],
    } ,
    {
        resource: UserSchema ,
        options: {
            properties: {
                name: {
                    type: "string" , 
                }, 
                email: {
                    type: "string" , 
                }, 
                password: {
                    type: "string" , 
                },   
                phone: {
                    type: "string" , 
                },   
                date: {
                    type: "string" , 
                }, 
                authToken: {
                    type: "string" , 
                },   
                hashedOtp: {
                    type: "string" , 
                },  
                hashedOtp: {
                    type: "string" , 
                }, 
                orders : {
                    populated : Order ,
                } ,
            }
        }
    } , 
    {
        resource: Order ,
        options: {
            id: "Order" ,
            properties: {
                token: {
                    type: "string" , 
                    required: true , 
                }, 
                url_link: {
                    type: "string" , 
                    required: true , 
                } , 
                quantity : {
                    type: String , 
                }, 
                price : {
                    type: Number , 
                }, 
                selected_services: [ { 
                   populated: "SelectedServicess" ,
                }], 
                service_name: {
                    type: "string" , 
                }, 
                email: {
                    type: "string" ,  
                } , 
                phone: {
                    type: "string" ,  
                } , 
                subscription_period : {
                    type: "string" ,  
                }, 
                date: {
                    type: "date" , 
                    default: Date.now
                },
            }
        }
    } , 
    {
        resource: SelectedServicess ,
        options: {
            id: "SelectedServicess" ,
            properties: {
                service_id: {
                    type: "string" ,  
                }, 
                currency: {
                    type: "string" ,   
                },
                price: {
                    type: "number" , 
                },
                quantity: {
                    type: "number" , 
                },
            }
        }
    } , 
    {
        resource: CharacteristicCardsModel ,
        options: {
            id: "CharacteristicCards" ,
            properties: { 
                icon: {
                    type: "string" ,  
                }, 
                title: {
                    type: "string" ,   
                },
            }
        } ,
        features: [
            uploadFeature({
                provider: { local: localProvider },
                properties: {
                    key: 'icon',
                },
                uploadPath: (record, filename) => {
                    return (`/${filename}`);
                },
                validation: {
                    mimeTypes: [
                        "image/jpeg",
                        "image/png",
                        "image/webp", 
                        "image/svg",
                    ]
                },
            }),
        ] , 
    } , 
    {
        resource: PagesIntroModel ,
        options: {
            properties: {
                pageName: String , 
                pageContent : {
                    intro: {
                      type: "string" ,   
                    } , 
                    title: {
                      type: "string" ,   
                    } , 
                    bannerDescription : {
                      type: "string" ,   
                    } , 
                    image: {
                      type: "string" ,   
                    } , 
                    characteristicCards :  {
                        type: "array" , 
                        populated: "CharacteristicCards" ,
                    }
                } 
            }
        }
    } , 
    {
        resource: ProductFeature ,
        options: {
            id: "ProductFeature" , 
            properties: {
                icon : {
                    type: "string" ,  
                }, 
                title: {
                    type: "string" ,  
                }, 
                description : {
                    type: "string" ,  
                }
            }
        }, 
        features: [
            uploadFeature({
                provider: { local: localProvider },
                properties: {
                    key: 'icon',
                },
                uploadPath: (record, filename) => {
                    return (`/${filename}`);
                },
                validation: {
                    mimeTypes: [
                        "image/jpeg",
                        "image/png",
                        "image/webp", 
                        "image/svg",
                    ]
                },
            }),
        ] , 
    } , 
    {
        resource: ProductOptions ,
        options: {
            id: "ProductOptions" , 
            properties: {
                title: {
                    type: "string" , 
                },
                price: {
                    type: "string" , 
                }, 
                serviceName: {
                    type: "string" , 
                },  
                serviceAmount: {
                    type: "number" , 
                }, 
                serviceIncreasementStep: {
                    type: "number" , 
                }, 
                productDescription: {
                    type: "string" , 
                }, 
                productDescription: {
                    type: "string" , 
                },
                anouncementText:{
                    type: "string" , 
                }, 
                introDescription:{
                    type: "string" , 
                },
                productFeatures : {
                    type: "array" ,
                    populated: "ProductFeature"  ,  
                },
            }
        }, 
        features: [
            uploadFeature({
                provider: { local: localProvider },
                properties: {
                    key: 'icon',
                },
                uploadPath: (record, filename) => {
                    return (`/${filename}`);
                },
                validation: {
                    mimeTypes: [
                        "image/jpeg",
                        "image/png",
                        "image/webp", 
                        "image/svg",
                    ]
                },
            }),
        ] , 
    } , 
    {
        resource: Promotion ,
        options: {
            id: "Promotion" , 
            properties: {
                pageName: {
                    type: "string" ,
                } , 
                pageContent : {
                    promotion: {
                        type: "string" , 
                    }, 
                    color: {
                        type: "string" , 
                    }
                } 
            }
        }
    } , 
    {
        resource: Product ,
        options: {
            id: "Product" , 
            properties: {
                image: {
                    type: "string" ,
                }, 
                title:  {
                    type: "string" ,
                }, 
                price:{ 
                    type : "number" ,
                },
                discountPrice:{ 
                    type : "number" ,
                },
                description:{
                    type: "string" ,
                }, 
                link:{
                    type: "string" ,
                },
                excerpt:{
                    type: "string"  , 
                }, 
                user_choice: {
                    type: "boolean" , 
                    require: true , 
                },
                smm_for_business: {
                    type: "boolean" , 
                    require: true , 
                },
                big_brands: {
                    type: "boolean" , 
                    require: true , 
                },
                options: {
                    populated: "ProductOptions" , 
                }, 
                promotions: {
                    type: "array" , 
                    populated: "Promotion" , 
                }, 
                category_id: {
                    type: "string"  , 
                }, 
                subcategory_id: {
                    type: "string"  , 
                }, 
            }
        }, 
        features: [
            uploadFeature({
                provider: { local: localProvider },
                properties: {
                    key: 'icon',
                },
                uploadPath: (record, filename) => {
                    return (`/${filename}`);
                },
                validation: {
                    mimeTypes: [
                        "image/jpeg",
                        "image/png",
                        "image/webp", 
                        "image/svg",
                    ]
                },
            }),
        ] , 
    } , 

    {
        resource: ServicessValuesModel ,
        options: {
            id: "ServicessValues" , 
            properties: {
                title: {
                    type: "string" ,
                } ,  
                itemPrice:{
                    type: "number" ,
                } ,  
                currency: {
                    type: "string" ,
                } ,
                incrementValues: {
                    type: "array" ,
                } , 
                amount: {
                    type: "number" ,
                } ,   
            }
        }
    } , 
    {
        resource: SubscriptionServicessModel ,
        options: {
            id: "SubscriptionServicess" , 
            properties: {
                service_title:{
                    type: "string" ,
                } ,  
                service_values : {
                    type:"array" , 
                    populated: "ServicessValues" 
                }
            }
        }
    } , 
    {
        resource: SubscriptionTypesModel ,
        options: {
            id: "SubscriptionTypes" , 
            properties: {
                icon: {
                    type:"string" , 
                } , 
                title: {
                    type:"string" , 
                } ,  
                image: {
                    isVisible: false ,
                    type:"string" , 
                } ,  
                promotionMethod: {
                    type:"string" , 
                } , 
                servicess:{
                    type: "array" , 
                    populated: "SubscriptionServicess"
                }
            }
        }, 
        features: [
            uploadFeature({
                provider: { local: localProvider },
                properties: {
                    key: 'icon',
                },
                uploadPath: (record, filename) => {
                    return (`/${filename}`);
                },
                validation: {
                    mimeTypes: [
                        "image/jpeg",
                        "image/png",
                        "image/webp", 
                        "image/svg",
                    ]
                },
            }),
        ] , 
    } , 
    {
        resource: SubscriptionsMainSchemaModel ,
        options: {
            id: "SubscriptionsMainSchemaModel" , 
            properties: {
                price : {
                    type: "number"
                } , 
                title:{
                    type: "string"
                } , 
                subTitle: {
                    type: "string"
                } ,  
                description: {
                    type: "string"
                } , 
                subscriptions : {
                    type:"array" ,  
                    populated:  "SubscriptionTypes"
                } ,
            }
        }, 
    } , 
    

]

module.exports =  dBase ;




