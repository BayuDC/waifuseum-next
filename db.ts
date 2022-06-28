import mongoose from 'mongoose';

const mongouri = process.env.MONGO_URI;

mongoose
    .connect(mongouri as string)
    .then(() => {
        console.log('Connected to database');
    })
    .catch(err => {
        console.log(err);
    });
