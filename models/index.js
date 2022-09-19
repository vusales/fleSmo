const uploadFeature = require('@adminjs/upload');
const Banner = require("./Banner");
const InfoCards = require("./InfoCards"); 
const Subscriptions = require("./Subscriptions"); 


const dBase = [
    {
        resource: Banner,
        features: [
            uploadFeature({
                options: {
                    // listProperties: ['id', 's3Key', 'bucket', 'path'],
                },
                provider: { 
                    local: { bucket: 'uploads'}
                },
                properties: {
                    key: "image", // to this db field feature will safe S3 key,
                    mimeType: "mimeType", // this property is important because allows to have previews,
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
        ]
    } , 

    {
        resource: InfoCards,
        features: [
            uploadFeature({
                options: {
                    // listProperties: ['id', 's3Key', 'bucket', 'path'],
                },
                provider: { 
                    local: { bucket: 'uploads'}
                },
                properties: {
                    key: "icon", // to this db field feature will safe S3 key,
                    mimeType: "mimeType", // this property is important because allows to have previews,
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
        ]
    } ,
    {
        resource: Subscriptions, 
        features: [
            uploadFeature({
                options: {
                    // listProperties: ['id', 's3Key', 'bucket', 'path'],
                },
                provider: { 
                    local: { bucket: 'uploads'}
                },
                properties: {
                    key: "icon", // to this db field feature will safe S3 key,
                    mimeType: "mimeType", // this property is important because allows to have previews

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
        ]
         

        
    } ,
]

module.exports =  dBase ;




