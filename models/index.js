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
    PageContentModel , 
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

const {
    usersNavigation , 
    staticInfoAboutPageNavigation , 
    categoryNavigation , 
    productNavigation , 
    subscriptionNavigation , 
  } =  require("./modelNavigations");


const localProvider = {
    bucket: 'public/images' , 
    opts: {
        baseUrl: "/images" , 
    }
};

const mimeTypess = [
    "image/jpeg",
    "image/png",
    "image/webp", 
    "image/svg",
]

const ChangeFieldName = (record, filename) => {
    return (`/${filename}`);
}

const dBase = [
    {
        resource: Banner,
        options: {
            navigation: staticInfoAboutPageNavigation ,
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
                    type: 'textarea',
                    props: {
                    rows: 10,
                    },
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
                uploadPath: (record, filename)=>ChangeFieldName(record, filename),
                validation: {
                    mimeTypes: mimeTypess , 
                },
            }),
        ] , 
    } ,  
    {
        resource: InfoCards,
        options: {
            navigation: staticInfoAboutPageNavigation ,
            properties: {
                icon:{
                    type: 'string',
                    description: "Use only material/ui icons name or keep empty",
                }, 
                title:{
                    type: 'string',
                }, 
                description:{
                    type: 'textarea',
                    props: {
                    rows: 10,
                    },
                }, 
            }
        },
        // features: [
        //     uploadFeature({
        //         provider: { local: localProvider },
        //         properties: {
        //             key: "icon" , // to this db field feature will safe S3 key,
        //             //mimeType: "mimeType", // this property is important because allows to have previews,
        //         },
        //         uploadPath: (record, filename) => (
        //             `/${filename}`
        //         ),
        //         validation: {
        //             mimeTypes: [
        //                 "image/jpeg",
        //                 "image/png",
        //                 "image/webp", 
        //                 "image/svg",
        //             ]
        //         },
        //     }),
        // ] , 
    } , 
    {
        resource: WhyChooseUs ,
        options: {
            navigation: staticInfoAboutPageNavigation ,
            properties: {
                icon: {
                    type: "string" , 
                    description: "Use only material/ui icons name or keep empty",
                } , 
                title: {
                    type: "string" , 
                } , 
                description: {
                    type: 'textarea',
                    props: {
                    rows: 10,
                    }, 
                } , 
            }
        },
    } , 
    {
        resource: SiteStatistic ,
        options: {
            navigation: staticInfoAboutPageNavigation ,
            properties: {
                icon: {
                    type: "string" , 
                    description: "Use only material/ui icons name or keep empty",
                } , 
                amount: {
                    type: "number" , 
                } , 
                description: {
                    type: 'textarea',
                    props: {
                    rows: 10,
                    }, 
                } ,  
            }
        },
    } , 
    {
        resource: Category ,
        options: {
            navigation: categoryNavigation ,
            properties: {
                image: {
                    type: "string" ,
                    isVisible: false ,  
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
                    key: "image" , // to this db field feature will safe S3 key,
                    //mimeType: "mimeType", // this property is important because allows to have previews,
                },
                uploadPath: (record, filename)=>ChangeFieldName(record, filename),
                validation: {
                    mimeTypes: mimeTypess , 
                },
            }),
        ],
    } ,
    {
        resource: SubCatgory ,
        options: {
            navigation: categoryNavigation ,
            properties: {
                image: {
                    type: "string" , 
                    isVisible: "false" , 
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
                    key: "image" , // to this db field feature will safe S3 key,
                    //mimeType: "mimeType", // this property is important because allows to have previews,
                },
                uploadPath: (record, filename)=>ChangeFieldName(record, filename),
                validation: {
                    mimeTypes: mimeTypess , 
                },
            }),
        ],
    } ,
    {
        resource: UserSchema ,
        options: {
            navigation: usersNavigation ,
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
            navigation: usersNavigation ,
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
            navigation: staticInfoAboutPageNavigation ,
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
            navigation: staticInfoAboutPageNavigation ,
            properties: { 
                icon: {
                    type: "string" ,  
                    description: "Use only material/ui icons name or keep empty",
                }, 
                description: {
                    type: "string" ,   
                },
            }
        },
    } , 
    {
        resource: PagesIntroModel ,
        options: {
            navigation: staticInfoAboutPageNavigation ,
            properties: {
                pageName: {
                    type: "string" ,   
                    availableValues: [
                        { value: '1', label: 'Cheap Services' },
                        { value: '2', label: 'User Choice' },
                        { value: '3', label: 'SMM for business' },
                        { value: '4', label: 'Big brands' },
                    ],
                    description: "Chose from available Values"
                } , 
                pageContent : {
                    type:"string" , 
                    populated: "PageContent"
                }
            }
        }, 
    } ,
    {
        resource: PageContentModel,
        options: {
            id:"PageContent" , 
            navigation: staticInfoAboutPageNavigation ,
            properties: {
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
                    isVisible: false ,   
                } , 
                characteristicCards :  {
                    type: "array" , 
                    populated: "CharacteristicCards" ,
                }
            } 
        } , 
        features: [
            uploadFeature({
                provider: { local: localProvider },
                properties: {
                    key: 'image',
                },
                uploadPath: (record, filename)=>ChangeFieldName(record, filename),
                validation: {
                    mimeTypes: mimeTypess , 
                },
            }),
        ] , 
    } , 
    {
        resource: ProductFeature ,
        options: {
            id: "ProductFeature" , 
            navigation: productNavigation ,
            properties: {
                icon : {
                    type: "string" ,  
                    description: "Use only material/ui icons name or keep empty",
                }, 
                title: {
                    type: "string" ,  
                }, 
                description : {
                    type: 'textarea',
                    props: {
                    rows: 10,
                    },
                }
            }
        }, 
        // features: [
        //     uploadFeature({
        //         provider: { local: localProvider },
        //         properties: {
        //             key: 'icon',
        //         },
        //         uploadPath: (record, filename)=>ChangeFieldName(record, filename),
        //         validation: {
        //             mimeTypes: mimeTypess , 
        //         },
        //     }),
        // ] , 
    } , 
    {
        resource: ProductOptions ,
        options: {
            id: "ProductOptions" , 
            navigation: productNavigation ,
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
    } , 
    {
        resource: Promotion ,
        options: {
            id: "Promotion" , 
            navigation: productNavigation ,
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
            navigation: productNavigation ,
            properties: {
                image: {
                    type: "string" ,
                    isVisible: false ,
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
                    type: 'textarea',
                    props: {
                      rows: 10,
                    },
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
                    key: 'image',
                },
                uploadPath: (record, filename)=> ChangeFieldName(record, filename),
                validation: {
                    mimeTypes: mimeTypess , 
                },
            }),
        ] , 
    } , 
    {
        resource: ServicessValuesModel ,
        options: {
            id: "ServicessValues" , 
            navigation: subscriptionNavigation ,
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
            navigation: subscriptionNavigation ,
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
            navigation: subscriptionNavigation ,
            properties: {
                icon: {
                    type:"string" ,
                    description: "Use only material/ui icons name or keep empty",

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
                    key: 'image',
                },
                uploadPath: (record, filename)=>ChangeFieldName(record, filename),
                validation: {
                    mimeTypes: mimeTypess , 
                },
            }),
        ] , 
    } , 
    {
        resource: SubscriptionsMainSchemaModel ,
        options: {
            id: "SubscriptionsMainSchemaModel" , 
            navigation: subscriptionNavigation ,
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
                    type: 'textarea',
                    props: {
                      rows: 10,
                    },
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




