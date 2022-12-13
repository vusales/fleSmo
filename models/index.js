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
const { diskStorage } = require('multer');
require('dotenv').config();

const localProvider = {
    bucket: 'uploads'
};

const afterHookForUploadImageUrl =  async (request , response , ctx ) => {
    
    

    if(request.payload.image) {
        let result  =   {
            ...request.payload , 
            image: process.env.DEFAULT_URL + "/uploads/" + request.payload.image
        }
        return result ; 
    }
}


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
                    type: 'buffer',
                } ,
            } , 
            actions:{
                new : {
                    // before: async (request )=>{
                    //     console.log( "request" , request );
                    // },
                    before: async (request , response , ctx )=>{

                        afterHookForUploadImageUrl(request , response , ctx); 
                    }
                }
            }
        },
        features: [
            uploadFeature({
                provider: { local: localProvider },
                properties: {
                    key: "image" , // to this db field feature will safe S3 key,
                    file: "file" , 
                    mimeType: "mimeType", // this property is important because allows to have previews,
                },
                uploadPath: (record, filename) => ( `/${filename}`),
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




