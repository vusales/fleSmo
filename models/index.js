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
                image: {
                    type: 'string',
                } ,
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
                // properties: {
                //     key: "image" , // to this db field feature will safe S3 key,
                //     // file: "file" , 
                //     mimeType: "mimeType", // this property is important because allows to have previews,
                //     // filePath: "image" ,
                // },
                properties: { 
                    file: 'file',
                    key: 'image',
                    bucket: 'bucket', 
                    mimeType: 'mime' ,
                    filePath:'filePath'
                },
                uploadPath: (record, filename) => {
                    console.error("ASDASDASDASDASDSADDSAD AASDASDD ASD AS DAS D");
                    console.error(record,filename);
                    let fname = `public/images/${record.params._id}/${filename}`; 
                    return ( `/${filename}`);
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




