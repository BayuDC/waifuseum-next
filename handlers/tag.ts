import { MyHandlerMethod } from '.';
import { GetTagListSchema, GetTagListSimpleSchema, GetTagSchema } from '../schemas/tag';

export const GetTagListHandler = async function (req, reply) {
    const { page, count, search: keyword } = req.query;

    return {
        tags: await this.Tag.find().paginate(page, count).search(keyword).lean(),
    };
} as MyHandlerMethod<typeof GetTagListSchema>;
export const GetTagListSimpleHandler = async function (req, reply) {
    const { page, count, search: keyword } = req.query;

    return {
        tags: await this.Tag.find().paginate(page, count).search(keyword).select(['name', 'slug', 'alias']).lean(),
    };
} as MyHandlerMethod<typeof GetTagListSimpleSchema>;
export const GetTagHandler = async function (req, reply) {
    const { slug } = req.params;

    return {
        tag: await this.Tag.findOne({ slug }).lean(),
    };
} as MyHandlerMethod<typeof GetTagSchema>;
