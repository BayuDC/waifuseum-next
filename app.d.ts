import {
    FastifyInstance,
    FastifyReply,
    FastifyRequest,
    RawRequestDefaultExpression,
    RawServerDefault,
    RawReplyDefaultExpression,
    ContextConfigDefault,
} from 'fastify';
import { RouteGenericInterface } from 'fastify/types/route';
import { FastifySchema } from 'fastify/types/schema';
import { Type, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

export type FastifyRequestTypebox<TSchema extends FastifySchema> = FastifyRequest<
    RouteGenericInterface,
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    TSchema,
    TypeBoxTypeProvider
>;

export type FastifyReplyTypebox<TSchema extends FastifySchema> = FastifyReply<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    RouteGenericInterface,
    ContextConfigDefault,
    TSchema,
    TypeBoxTypeProvider
>;

export type MyHandlerMethod<T> = (
    this: FastifyInstance,
    req: FastifyRequestTypebox<T>,
    reply: FastifyReplyTypebox<T>
) => any | Promise<any>;

export {};
