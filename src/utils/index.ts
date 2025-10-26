import { additionalParams, url } from "../constants";
import type { Image } from '../types';

export const buildUrl = (searchTerm: string, perPage: number, page: number,) => {
    return `${url}&per_page=${perPage}&q=${searchTerm}${additionalParams}&page=${page}`;
};

export const buildImage = (result: Record<string, unknown>): Image => {
    const tags = Array.from(new Set((result.tags as string).split(",")));

    return {
        id: result.id,
        src: result.webformatURL,
        userUrl: result.userURL,
        userImageURL: result.userImageURL,
        userName: result.user,
        pageUrl: result.pageURL,
        tags: tags,
    } as Image;
};