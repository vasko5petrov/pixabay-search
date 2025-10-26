import { additionalParams, url } from "../constants";
import type { Image } from '../types';

export const buildUrl = (searchTerm: string) => {
    return `${url}&q=${searchTerm}${additionalParams}`;
};

export const buildImage = (result: Record<string, unknown>): Image => {
    const tags = (result.tags as string).split(",");
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