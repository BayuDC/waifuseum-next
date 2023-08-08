import { Type } from '@sinclair/typebox';

export const TagSimpleSchema = Type.Object({
    id: Type.String(),
    name: Type.String(),
    alias: Type.String(),
    slug: Type.String(),
});

export const TagSchema = Type.Object({
    id: Type.String(),
    name: Type.String(),
    alias: Type.String(),
    slug: Type.String(),
    createdAt: Type.String(),
    updatedAt: Type.String(),
});

const querystring = Type.Object({
    page: Type.Number({ default: 1 }),
    count: Type.Number({ default: 10 }),
    search: Type.Optional(Type.String()),
});
const params = Type.Object({
    slug: Type.String(),
});

export const GetTagListSchema = {
    querystring,
    response: {
        '2xx': Type.Object({
            tags: Type.Array(TagSchema),
        }),
    },
};
export const GetTagListSimpleSchema = {
    querystring,
    response: {
        '2xx': Type.Object({
            tags: Type.Array(TagSimpleSchema),
        }),
    },
};
export const GetTagSchema = {
    params,
    response: {
        '2xx': Type.Object({
            tag: TagSchema,
        }),
    },
};
export const CheckTagExistsSchema = {
    params,
    response: {
        default: Type.Boolean(),
    },
};
