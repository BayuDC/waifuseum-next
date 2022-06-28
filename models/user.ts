import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
});
schema.plugin(require('mongoose-lean-id'));

export default mongoose.model('User', schema);
