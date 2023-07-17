require('dotenv').config();

const mongoose = require('mongoose')

export const dbConnect = () => {

    try{
        mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
        
        const database = mongoose.connection;
    
        database.on("error",(err: Error) =>{
            console.log(err);
        });
    
        database.on("open",()=>{
            console.log("Connected to Database");
        });

    }
    catch(e){
        console.log(e);
    }

}