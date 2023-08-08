import { MyHandlerMethod } from './_';
import {
    CheckTagExistsSchema,
    GetTagListSchema,
    GetTagListSimpleSchema,
    GetTagSchema,
    LoadTagSchema,
} from '../schemas/tag';

export const LoadTagPreHandler = async function (req, reply) {
    if (!req.query.tag) return;

    const tag = await this.Tag.findOne({ slug: req.query.tag }).lean();
    if (!tag) throw reply.notFound('Tag not found');

    req.state.tag = tag;
} as MyHandlerMethod<typeof LoadTagSchema>;

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

export const CheckTagExistsHandler = async function (req, reply) {
    const { slug } = req.params;

    const exists = await this.Tag.exists({ slug }).lean();

    reply.status(exists ? 200 : 404);
    reply.send(exists != null);
} as MyHandlerMethod<typeof CheckTagExistsSchema>;
