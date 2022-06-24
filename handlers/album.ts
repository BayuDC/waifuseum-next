import { FastifyRequest, RouteHandlerMethod } from 'fastify';

export default {
    async index(req: FastifyRequest) {
        const full = (req.query as { full: any }).full != undefined;
        const albums = await req.server.model.find(full);

        return { albums };
    },
} as {
    index: RouteHandlerMethod;
};
