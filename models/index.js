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

console.log("public join" ,  path.join(__dirname, 'public', 'images') );

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
                // image: {
                //     type: 'string',
                // } ,
                uploadedFile: {
                   isVisible: true ,
                }
            } , 
            // actions: {
            //     // edit : {
            //     //     before : async (request, context) => {
            //     //         const newRequest =  await beforeHook(request, context) ; 
            //     //         return newRequest ; 
            //     //     }, 
            //     //     after : async (originalResponse, request, context) => {
            //     //         const newResult =  afterHook(originalResponse, request, context); 
            //     //         return newResult; 
            //     //     },
            //     // },   
            //     // new : {
            //     //     before : async (request, context) => {
            //     //         const newRequest =  await beforeHook(request, context) ; 
            //     //         return newRequest ; 
            //     //     }, 
            //     //     after : async (originalResponse, request, context) => {
            //     //         const newResult =  afterHook(originalResponse, request, context); 
            //     //         return newResult; 
            //     //     },
            //     // } ,  
            //     // list : {
            //     //     before : async (request, context) => {
            //     //         const newRequest =  await beforeHook(request, context) ; 
            //     //         return newRequest ; 
            //     //     }, 
            //     //     after : async (originalResponse, request, context) => {
            //     //         const newResult =  afterHook(originalResponse, request, context); 
            //     //         return newResult; 
            //     //     },
            //     // } , 
            //     // show : {
            //     //     before : async (request, context) => {
            //     //         const newRequest =  await beforeHook(request, context) ; 
            //     //         return newRequest ; 
            //     //     }, 
            //     //     after : async (originalResponse, request, context) => {
            //     //         const newResult =  afterHook(originalResponse, request, context); 
            //     //         return newResult; 
            //     //     },
            //     // }, 
            // }
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
                // properties: { 
                //     file: 'image',
                //     key: 'imageName',
                //     // bucket: 'bucket', 
                //     // mimeType: 'mime' ,
                //     // filePath: 'image'
                // },
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
]

module.exports =  dBase ;




