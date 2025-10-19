const mongoose=require('mongoose');

const mongo_uri=process.env.mongo_uri;

mongoose.connect(mongo_uri)  
.then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.error('Error connecting to MongoDB:', err);
});

module.exports=mongoose;