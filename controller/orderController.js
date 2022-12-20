const {Order ,  SelectedServicess }  = require("../models/Order") ; 
const {UserSchema} = require("../models/User") ;


const order = async (req , res ) => {
    try{
        const {
            token , 
            url_link , 
            // service_id , 
            quantity , 
            price ,
            selected_services , 
            service_name , 
            email , 
            phone , 
            subscription_period 
        } = req.body ; 
    

        // selected_services only used in Subscription page , 
        // another parametrs used in Order page 
    
        if(!token || !url_link ) return res.status(400).send("User information is not correct!"); 
       
        if( !selected_services?.length 
        && (!quantity 
        || !price 
        || !email 
        || !phone 
        // || !subscription_period 
        )) return res.status(400).send("User information is not correct!");

        const order =  new Order({
            token: token , 
            url_link:  url_link , 
            quantity : quantity || "", 
            price : price || "", 
            selected_services: [], 
            service_name: service_name || "", 
            email: email || "", 
            phone:  phone || "", 
            subscription_period : subscription_period || "", 
        }); 

        selected_services?.forEach(element => {
            const selectedService =  new SelectedServicess({
                ...element , 
            }); 
            selectedService.save(); 
            order.selected_services.push(selectedService);
        });

        order.save() ; 

        const user =  await UserSchema.findOne({ authToken : token }).populate("orders"); 

        user.orders.push(order); 

        user.save(); 

        res.status(200).send({
            result: true 
        });

    }catch(err){
        console.log("ERROR"  , err );
        if(err) return res.status(400).send({err}) ; 
    }
}

module.exports = {
    order , 
}
 

