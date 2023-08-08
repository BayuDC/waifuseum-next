import { MyHandlerMethod } from '.';
import { GetTagListSchema, GetTagListSimpleSchema, GetTagSchema } from '../schemas/tag';

export const GetTagListHandler = async function (req, reply) {
    return {
        tags: await this.Tag.find().lean(),
    };
} as MyHandlerMethod<typeof GetTagListSchema>;
export const GetTagListSimpleHandler = async function (req, reply) {
    return {
        tags: await this.Tag.find().select(['name', 'slug', 'alias']).lean(),
    };
} as MyHandlerMethod<typeof GetTagListSimpleSchema>;
export const GetTagHandler = async function (req, reply) {
    const { slug } = req.params;

    return {
        tag: await this.Tag.findOne({ slug }).lean(),
    };
} as MyHandlerMethod<typeof GetTagSchema>;
