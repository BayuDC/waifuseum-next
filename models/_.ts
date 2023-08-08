import { types } from '@typegoose/typegoose';

export function search<T extends types.AnyParamConstructor<any>, U>(
    this: types.QueryHelperThis<T, U>,
    keyword?: string
) {
    if (keyword) return this.where({ slug: { $regex: '.*' + keyword + '.*' } });
    return this;
}

export function paginate<T extends types.AnyParamConstructor<any>, U>(
    this: types.QueryHelperThis<T, U>,
    page: number,
    count: number
) {
    return this.skip(count * (page - 1)).limit(count);
}
