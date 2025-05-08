const mongoose = require('mongoose')

connectionString=process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log('mongodb connected succesfully');
}).catch((err)=>{
    console.log(`mongodb connection failed due to ${err}`);
    
})