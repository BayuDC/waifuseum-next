import { Type } from '@sinclair/typebox';

export const GetStatisticsSchema = {
    response: {
        '2xx': Type.Object({
            picture: Type.Number(),
            album: Type.Number(),
            tag: Type.Number(),
            user: Type.Number(),
        }),
    },
};
