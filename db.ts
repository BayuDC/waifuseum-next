import mongoose from 'mongoose';

const mongouri = process.env.MONGO_URI;

mongoose.connect(mongouri as string).catch(err => {
    console.log(err);
    process.exit(1);
});
