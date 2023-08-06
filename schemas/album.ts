import { Type } from '@sinclair/typebox';

export const AlbumSchema = Type.Object({
    id: Type.String(),
    name: Type.String(),
    alias: Type.String(),
    slug: Type.String(),
    private: Type.Boolean(),
    community: Type.Boolean(),
    tags: Type.Array(
        Type.Object({
            id: Type.String(),
            name: Type.String(),
            alias: Type.String(),
            slug: Type.String(),
        })
    ),
    picturesCount: Type.Number(),
    pictures: Type.Array(
        Type.Object({
            id: Type.String(),
            url: Type.String(),
            urls: Type.Object({
                thumbnail: Type.String(),
                minimal: Type.String(),
                standard: Type.String(),
                original: Type.String(),
            }),
        })
    ),
    createdAt: Type.String(),
    updatedAt: Type.String(),
});
export const AlbumSimpleSchema = Type.Object({
    id: Type.String(),
    name: Type.String(),
    alias: Type.String(),
    slug: Type.String(),
});

const querystring = Type.Object({
    page: Type.Number({ default: 1 }),
    count: Type.Number({ default: 10, maximum: 500 }),
    search: Type.Optional(Type.String()),
});

const params = Type.Object({
    id: Type.Required(Type.String()),
});

export const GetAlbumListSchema = {
    querystring,
    response: {
        '2xx': Type.Object({
            albums: Type.Array(AlbumSchema),
        }),
    },
};

export const GetAlbumListSimpleSchema = {
    querystring,
    response: {
        '2xx': Type.Object({
            albums: Type.Array(AlbumSimpleSchema),
        }),
    },
};

export const GetAlbumSchema = {
    params,
    response: {
        '2xx': Type.Object({
            album: AlbumSchema,
        }),
    },
};
