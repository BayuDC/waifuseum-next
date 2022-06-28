import mongoose from 'mongoose';
import { UserDocument, UserModel } from './types/user';

const schema = new mongoose.Schema<UserDocument>({
    name: { type: String },
    email: { type: String },
});
schema.plugin(require('mongoose-lean-id'));

export default mongoose.model<UserDocument, UserModel>('User', schema);
