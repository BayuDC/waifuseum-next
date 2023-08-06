import { Type } from '@sinclair/typebox';

import { AlbumSimpleSchema } from './album';

export const PictureSchema = Type.Object({
    id: Type.String(),
    url: Type.String(),
    urls: Type.Object({
        thumbnail: Type.String(),
        minimal: Type.String(),
        standard: Type.String(),
        original: Type.String(),
    }),
    album: Type.Optional(AlbumSimpleSchema),
    source: Type.String(),
    createdAt: Type.String(),
    updatedAt: Type.String(),
});

export const GetPictureSchema = {
    querystring: Type.Object({
        page: Type.Number({ default: 1 }),
        count: Type.Number({ default: 10, maximum: 500 }),
    }),
    response: {
        '2xx': Type.Object({
            pictures: Type.Array(PictureSchema),
        }),
    },
};
