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

export const GetTagListSchema = {
    response: {
        '2xx': Type.Object({
            tags: Type.Array(TagSchema),
        }),
    },
};
export const GetTagListSimpleSchema = {
    response: {
        '2xx': Type.Object({
            tags: Type.Array(TagSimpleSchema),
        }),
    },
};
export const GetTagSchema = {
    params: Type.Object({ slug: Type.String() }),
    response: {
        '2xx': Type.Object({
            tag: TagSchema,
        }),
    },
};
