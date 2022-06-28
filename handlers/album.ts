import { FastifyRequest, RouteHandlerMethod } from 'fastify';
import { ObjectId } from 'mongoose';
import createError from 'http-errors';
import Album from '../models/album';

export default {
    async index(req: FastifyRequest) {
        const albums = await Album.find().lean();

        return { albums };
    },
    async show(req: FastifyRequest) {
        const { id } = req.params as { id: string };

        const album = await Album.findById(id).lean();
        if (!album) throw createError(404, 'Album not found');

        return { album };
    },
} as {
    index: RouteHandlerMethod;
    show: RouteHandlerMethod;
};
