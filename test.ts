import fs from 'fs'
// import * as bunnyCdnStorage from 'bunnycdn-storage-api-node-sdk'
import BunnyCDNStorage from 'bunnycdn-storage'
import { config } from 'dotenv'
import axios from 'axios'
config()

// BunnyCDN Credentials
const bunny_storage_zone = process.env.BUNNY_STORAGE_ZONE || 'mixshewky-cdn'
const bunny_storage_key = process.env.BUNNY_STORAGE_KEY || ''

// const storage = bunnyCdnStorage(bunny_storage_key, bunny_storage_zone);
const storage = new BunnyCDNStorage(bunny_storage_key, bunny_storage_zone)

const after = async (response: any, request: any, context: any) => {
    const { record } = context

    const fileArray = request.files
    let filePathArray: string[] = []

    if (record.isValid() && fileArray.length) {
        const dataId = record.id().toString()
        let imageIxCounter = 0
        for (let file of fileArray) {

            const PATH = '/product-images/' + dataId + '/' // /product-images/abc/
            const FILE_NAME = 'image_' + imageIxCounter++ + '.' + file['type'].split('/')[1] // abc_0.png, abc_1.jpg, abc_2.jpeg
            const FILE_BUFFER = fs.readFileSync(file.path)

            const cdnResult = await storage.upload(FILE_BUFFER, PATH + FILE_NAME)
            if (cdnResult.status === 201) {
                console.log('Uploaded file to CDN Successfully')
                filePathArray.push(PATH + FILE_NAME)
            }
        }
        await record.update({ imageUrls: filePathArray })
        await axios({
            method: 'post',
            url: http://localhost:80/v1/product/generate/image_order,
            data: {
                productId: dataId
            }
        })

    }
    return response
}


const before = async (request: any, context: any) => {
    let reqFileKeys = Object.keys(request.files)
    let fileArray = []
    for (let key of reqFileKeys) {
        fileArray.push(request.files[key])
    }
    request.files = fileArray

    if (request.method === 'post') {
        const { uploadImage, ...otherParams } = request.payload

        // eslint-disable-next-line no-param-reassign
        context.uploadImage = uploadImage

        return {
            ...request,
            payload: otherParams,
        }
    }
    return request
}

export { after, before }