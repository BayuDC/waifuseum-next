import { prop, plugin, getModelForClass } from '@typegoose/typegoose';

@plugin(require('mongoose-lean-id'))
export class User {
    @prop()
    public name!: string;

    @prop()
    public email!: string;

    @prop()
    public createdAt!: Date;
    @prop()
    public updatedAt!: Date;
}

export default () => getModelForClass(User);
