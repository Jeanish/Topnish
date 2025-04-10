import mongoose from "mongoose";

const ConnectDB = async() => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
    
        console.log(`\n MongoDb is connnected !! DB HOST: ${connectionInstance.connection.host}`);

    }catch(error){
        console.log("Mongodb connected error", error);
        process.exit(1);
    }
}

export default ConnectDB;