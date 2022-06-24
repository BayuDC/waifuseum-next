import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';

interface AlbumModel {
    findAll(): Promise<Object[]>;
    findById(): Promise<Object>;
}

declare module 'fastify' {
    interface FastifyInstance {
        model: AlbumModel;
    }
}

export default fp(function (fastify: FastifyInstance, options: Object, done: Function) {
    fastify.decorate('model', {
        async findAll() {
            return [];
        },
        async findById() {
            return {};
        },
    } as AlbumModel);

    done();
});
