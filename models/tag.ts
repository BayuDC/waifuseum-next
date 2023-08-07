import { prop, getModelForClass, Ref } from '@typegoose/typegoose';

import { User } from './user';

export class Tag {
    @prop()
    public name!: string;

    @prop()
    public alias?: string;

    @prop()
    public slug!: string;

    @prop({ ref: () => User })
    public createdBy!: Ref<User>;

    @prop()
    public createdAt!: Date;
    @prop()
    public updatedAt!: Date;
}

export default () => getModelForClass(Tag);
