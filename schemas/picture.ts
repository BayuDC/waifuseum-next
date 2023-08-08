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
            alias: Type.Optional(Type.String()),
            slug: Type.String(),
        })
    ),
    source: Type.Optional(Type.String()),
    createdAt: Type.String(),
    updatedAt: Type.String(),
});

const AlbumSchema = Type.Object({
    id: Type.String(),
    name: Type.String(),
    alias: Type.Optional(Type.String()),
    slug: Type.String(),
    private: Type.Boolean(),
    community: Type.Boolean(),
    picturesCount: Type.Number(),
    createdAt: Type.String(),
    updatedAt: Type.String(),
});

const TagSchema = Type.Object({
    id: Type.String(),
    name: Type.String(),
    alias: Type.String(),
    slug: Type.String(),
    createdAt: Type.String(),
    updatedAt: Type.String(),
});

export const GetPictureListSchema = {
    querystring: Type.Object({
        page: Type.Number({ default: 1 }),
        count: Type.Number({ default: 10, maximum: 500 }),
        album: Type.Optional(Type.String()),
        tag: Type.Optional(Type.String()),
    }),
    response: {
        '2xx': Type.Object({
            pictures: Type.Array(PictureSchema),
            album: Type.Optional(AlbumSchema),
            tag: Type.Optional(TagSchema),
        }),
    },
};

export const GetPictureListTodaySchema = {
    querystring: Type.Object({
        page: Type.Number({ default: 1 }),
        count: Type.Number({ default: 10, maximum: 500 }),
    }),
    response: {
        '2xx': Type.Object({
            picturesCount: Type.Number(),
            pictures: Type.Array(PictureSchema),
        }),
    },
};

export const GetPixivPictureSchema = {
    params: Type.Object({
        id: Type.String(),
    }),
};
