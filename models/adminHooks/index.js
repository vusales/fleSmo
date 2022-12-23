
require('dotenv').config();

const BASE_URL = process.env.DEFAULT_URL; 

const beforeHook = async (request, context) => {
    if(request.method === "post") {
        // console.log("PAYLOAD"  , request.payload ); 
        const {image  , ...otherParams } =  request.payload ; 
        if(image){
            // let fileName =  image ;
            // let url =  BASE_URL + "/uploads" + fileName ; 
            // console.log("url" ,  url );
            context.image = image; 
            return {
                ...request , 
                payload : {
                    ...otherParams , 
                }
            }
        }
    }
    return request ;
}

const afterHook =  async (originalResponse, request, context) => {
    // console.log("CONTEXT" , context ); 
    // console.log("REQUEST" , request ); 
    // console.log("ORIGINAL RESPONSE" , originalResponse ); 
    const {record} =  originalResponse;

    if(record?.params){
        let url  = BASE_URL + "/public/images" + record?.params?.image ; 
        // await record.update({
        //     ...record , 
        //     params: {
        //         ...record.params , 
        //         image : url , 
        //     }
        // });
        // return originalResponse ; 
        return {
            ...originalResponse , 
            record: {
                ...record , 
                params: {
                    ...record.params , 
                    image : url , 
                }
            }
        }
    }
    return  originalResponse ;
}

module.exports = {
    beforeHook , 
    afterHook , 

}