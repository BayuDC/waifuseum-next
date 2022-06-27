import mongoose, { Schema } from 'mongoose';

const schema: Schema = new mongoose.Schema({
    name: String,
    slug: String,
    private: Boolean,
    community: Boolean,
    createdAt: Date,
    updatedAt: Date,
});

export default mongoose.model('Album', schema);
