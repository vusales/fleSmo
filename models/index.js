const uploadFeature = require('@adminjs/upload');
const Banner = require("./Banner");
const InfoCards = require("./InfoCards"); 
const {Subscriptions , SubsModel } = require("./Subscriptions"); 
const WhyChooseUs = require("./WhyChooseUs"); 
const SiteStatistic =  require("./SiteStatistic"); 
const Category = require("./Category"); 


const dBase = [
    {
        resource: Banner,
        options: {
            listProperties: ['intro' , "title" , 'image' , "description" , "subTitle" , 'buttons'],
            filterProperties: ['intro' , "title" , 'image' , "description" , "subTitle" , 'buttons'],
            editProperties: ['intro' , "title" , 'image' , "description" , "subTitle" , 'buttons'],
            showProperties: ['intro' , "title" , 'image' , "description" , "subTitle" , 'buttons'],
        },
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
    // {
    //     resource: InfoCards,
    //     options: {
    //         listProperties: ['icon' , "title" , "description"],
    //         filterProperties: ['icon' , "title" , "description"],
    //         editProperties: ['icon' , "title" , "description"],
    //         showProperties: ['icon' , "title" , "description"],
    //     },
        // features: [
        //     uploadFeature({
        //         options: {
        //             // listProperties: ['id', 's3Key', 'bucket', 'path'],
        //         },
        //         provider: { 
        //             local: { bucket: 'uploads'}
        //         },
        //         properties: {
        //             key: "icon", // to this db field feature will safe S3 key,
        //             mimeType: "mimeType", // this property is important because allows to have previews,
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
        // ]
    // } ,
    // {
    //     resource: Subscriptions, 
    //     options: {
    //         listProperties: ['price' , "title" , "subTitle" ,  "subscriptions" , "description" ],
    //         filterProperties: ['price' , "title" , "subTitle" ,  "subscriptions" , "description" ],
    //         editProperties: ['price' , "title" , "subTitle" ,  "subscriptions" , "description" ],
    //         showProperties: ['price' , "title" , "subTitle" ,  "subscriptions" , "description" ],
    //     },
    // } ,

    // {
    //     resource: SubsModel , 
    //     options: {
    //         listProperties: ['icon' , "title" , "image" ,  "promotionMethod" , "subscriptionsSettings" , "forEachNewPost" , "perPeriodPerPage" ],
    //         filterProperties: ['icon' , "title" , "image" ,  "promotionMethod" , "subscriptionsSettings" , "forEachNewPost" , "perPeriodPerPage" ],
    //         editProperties: ['icon' , "title" , "image" ,  "promotionMethod" , "subscriptionsSettings" , "forEachNewPost" , "perPeriodPerPage" ],
    //         showProperties: ['icon' , "title" , "image" ,  "promotionMethod" , "subscriptionsSettings" , "forEachNewPost" , "perPeriodPerPage" ],
    //     },
        // features: [
        //     uploadFeature({
        //         options: {
        //             // listProperties: ['id', 's3Key', 'bucket', 'path'],
        //         },
        //         provider: { 
        //             local: { bucket: 'uploads'}
        //         },
        //         properties: {
        //             key: "icon", // to this db field feature will safe S3 key,
        //             mimeType: "mimeType", // this property is important because allows to have previews,
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
        // ]
    // } ,
    // {
    //     resource: WhyChooseUs , 
    //     options: {
    //         listProperties: ['icon' , "title" , "description" ],
    //         filterProperties: ['icon' , "title" , "description" ],
    //         editProperties: ['icon' , "title" , "description" ],
    //         showProperties: ['icon' , "title" , "description" ],
    //     },
        // features: [
        //     uploadFeature({
        //         options: {
        //             // listProperties: ['id', 's3Key', 'bucket', 'path'],
        //         },
        //         provider: { 
        //             local: { bucket: 'uploads'}
        //         },
        //         properties: {
        //             key: "icon", // to this db field feature will safe S3 key,
        //             mimeType: "mimeType", // this property is important because allows to have previews,
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
        // ]
    // } ,
    // {
    //     resource: SiteStatistic , 
    //     options: {
    //         listProperties: ['icon' , "title" , "description" ],
    //         filterProperties: ['icon' , "title" , "description" ],
    //         editProperties: ['icon' , "title" , "description" ],
    //         showProperties: ['icon' , "title" , "description" ],
    //     },
        // features: [
        //     uploadFeature({
        //         options: {
        //             // listProperties: ['id', 's3Key', 'bucket', 'path'],
        //         },
        //         provider: { 
        //             local: { bucket: 'uploads'}
        //         },
        //         properties: {
        //             key: "icon", // to this db field feature will safe S3 key,
        //             mimeType: "mimeType", // this property is important because allows to have previews,
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
        // ]
    // } , 
    // {
    //     resource: Category , 
    //     options: {
    //         listProperties: ['icon' , "title" , "description" ],
    //         filterProperties: ['icon' , "title" , "description" ],
    //         editProperties: ['icon' , "title" , "description" ],
    //         showProperties: ['icon' , "title" , "description" ],
    //     },
    //     // features: [
    //     //     uploadFeature({
    //     //         options: {
    //     //             // listProperties: ['id', 's3Key', 'bucket', 'path'],
    //     //         },
    //     //         provider: { 
    //     //             local: { bucket: 'uploads'}
    //     //         },
    //     //         properties: {
    //     //             key: "icon", // to this db field feature will safe S3 key,
    //     //             mimeType: "mimeType", // this property is important because allows to have previews,
    //     //         },
    //     //         uploadPath: (record, filename) => (
    //     //             `/${filename}`
    //     //         ),
    //     //         validation: {
    //     //             mimeTypes: [
    //     //                 "image/jpeg",
    //     //                 "image/png",
    //     //                 "image/webp", 
    //     //                 "image/svg",
    //     //             ]
    //     //         },
    //     //     }),
    //     // ]
    // } , 
]

module.exports =  dBase ;




