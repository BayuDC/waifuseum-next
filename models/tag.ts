import { prop, getModelForClass, types, plugin } from '@typegoose/typegoose';

import { User } from './user';
import { Album } from './album';

@plugin(require('mongoose-lean-id'))
export class Tag {
    @prop()
    public name!: string;

    @prop()
    public alias?: string;

    @prop()
    public slug!: string;

    @prop({ ref: () => Album, select: false })
    public albums!: types.Ref<Album>[];

    @prop({ ref: () => User })
    public createdBy!: types.Ref<User>;

    @prop()
    public createdAt!: Date;
    @prop()
    public updatedAt!: Date;
}

export default () => getModelForClass(Tag);
