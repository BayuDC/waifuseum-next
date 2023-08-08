import { prop, getModelForClass, types, plugin, queryMethod } from '@typegoose/typegoose';
import { paginate, search } from './_';

import { User } from './user';
import { Album } from './album';

@plugin(require('mongoose-lean-id'))
@queryMethod(search)
@queryMethod(paginate)
export class Tag {
    @prop()
    public name!: string;

    @prop()
    public alias?: string;

    @prop()
    public slug!: string;

    @prop({ ref: () => Album })
    public albums!: types.Ref<Album>[];

    @prop({ ref: () => User, select: 0 })
    public createdBy!: types.Ref<User>;

    @prop()
    public createdAt!: Date;
    @prop()
    public updatedAt!: Date;
}

interface TagQuery {
    search: types.AsQueryMethod<typeof search<typeof Tag, TagQuery>>;
    paginate: types.AsQueryMethod<typeof paginate<typeof Tag, TagQuery>>;
}

export default () => getModelForClass<typeof Tag, TagQuery>(Tag);
