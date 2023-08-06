import { Type } from '@sinclair/typebox';

const PictureSchema = Type.Object({
    id: Type.String(),
    url: Type.String(),
    urls: Type.Object({
        thumbnail: Type.String(),
        minimal: Type.Optional(Type.String()),
        standard: Type.Optional(Type.String()),
        original: Type.String(),
    }),
    album: Type.Optional(
        Type.Object({
            id: Type.String(),
            name: Type.String(),
            alias: Type.String(),
            slug: Type.String(),
        })
    ),
    source: Type.Optional(Type.String()),
    createdAt: Type.String(),
    updatedAt: Type.String(),
});

const querystring = Type.Object({
    page: Type.Number({ default: 1 }),
    count: Type.Number({ default: 10, maximum: 500 }),
    album: Type.Optional(Type.String()),
});

export const GetPictureListSchema = {
    querystring,
    response: {
        '2xx': Type.Object({
            pictures: Type.Array(PictureSchema),
        }),
    },
};
