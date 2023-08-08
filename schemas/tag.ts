import { Type } from '@sinclair/typebox';

export const GetTagListSchema = {
    response: {
        '2xx': Type.Object({
            tags: Type.Array(Type.Any()),
        }),
    },
};
export const GetTagListSimpleSchema = {
    response: {
        '2xx': Type.Object({
            tags: Type.Array(Type.Any()),
        }),
    },
};
export const GetTagSchema = {
    response: {
        '2xx': Type.Object({
            tags: Type.Any(),
        }),
    },
};
