const mongoose = require('mongoose');


mongoose.connect(
    'mongodb+srv://Admin:'
    + process.env.MONGO_ATLAS_PW +
    '@courses.g5qe6.mongodb.net/course?retryWrites=true&w=majority',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
         useFindAndModify: false 
    }
).then(()=>{console.log('Database Connected')})
.catch(err=>{console.log(err.message)});
