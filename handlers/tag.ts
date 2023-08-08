import { MyHandlerMethod } from '.';
import { GetTagListSchema, GetTagListSimpleSchema, GetTagSchema } from '../schemas/tag';

export const GetTagListHandler = async function (req, reply) {
    return {};
} as MyHandlerMethod<typeof GetTagListSchema>;
export const GetTagListSimpleHandler = async function (req, reply) {
    return {};
} as MyHandlerMethod<typeof GetTagListSimpleSchema>;
export const GetTagHandler = async function (req, reply) {
    return {};
} as MyHandlerMethod<typeof GetTagSchema>;
