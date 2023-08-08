import { Type } from '@sinclair/typebox';
import { TagSchema, TagSimpleSchema } from './tag';

const AlbumSchema = Type.Object({
    id: Type.String(),
    name: Type.String(),
    alias: Type.Optional(Type.String()),
    slug: Type.String(),
    private: Type.Boolean(),
    community: Type.Boolean(),
    tags: Type.Array(TagSimpleSchema),
    picturesCount: Type.Number(),
    pictures: Type.Array(
        Type.Object({
            id: Type.String(),
            url: Type.String(),
            urls: Type.Object({
                thumbnail: Type.String(),
                minimal: Type.Optional(Type.String()),
                standard: Type.Optional(Type.String()),
                original: Type.String(),
            }),
        })
    ),
    createdAt: Type.String(),
    updatedAt: Type.String(),
});
const AlbumSimpleSchema = Type.Object({
    id: Type.String(),
    name: Type.String(),
    alias: Type.Optional(Type.String()),
    slug: Type.String(),
});

const querystring = Type.Object({
    page: Type.Number({ default: 1 }),
    count: Type.Number({ default: 10, maximum: 500 }),
    search: Type.Optional(Type.String()),
    tag: Type.Optional(Type.String()),
});

const params = Type.Object({
    slug: Type.Required(Type.String()),
});

export const GetAlbumListSchema = {
    querystring,
    response: {
        '2xx': Type.Object({
            albums: Type.Array(AlbumSchema),
            tag: Type.Optional(TagSchema),
        }),
    },
};

export const GetAlbumListSimpleSchema = {
    querystring,
    response: {
        '2xx': Type.Object({
            albums: Type.Array(AlbumSimpleSchema),
            tag: Type.Optional(TagSimpleSchema),
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
export const CheckAlbumExistsSchema = {
    params,
    response: {
        default: Type.Boolean(),
    },
};
