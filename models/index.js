const uploadFeature = require('@adminjs/upload');
const Banner = require("./Banner");

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
                    // filePath: `image.file`,
                    // size: 'uploadedFile.size',
                    // filename: 'image.banner',
                    // file: 'uploadFile',
                },
                uploadPath: (record, filename) => (
                    `localhost:3002/uploads/${record.id()}/${filename}`
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




