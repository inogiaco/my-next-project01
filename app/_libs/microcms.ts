
import { createClient } from "microcms-js-sdk";
import type{
    MicroCMSQueries,
    MicroCMSImage,
    MicroCMSListContent,
} from "microcms-js-sdk"

export type Members = {
        name: string;
        position: string;
        profile: string;
        image: MicroCMSImage;
    } & MicroCMSListContent;

export type Category = {
        name: string;
    } & MicroCMSListContent;

export type News = {
    title: string;
    description: string;
    content: string;
    thumbnail?: MicroCMSImage;
    category: Category;
} & MicroCMSListContent;

if (!process.env.MICROCMS_SERVICE_DOMAIN){
    throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY){
    throw new Error("MICROCMS_API_KEY is required");
}

const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY
});

export const getMembersList = async (queries? : MicroCMSQueries) => {
    const listData = await client
        .getList<Members>({
            endpoint: "members",
            queries,
        });
    return listData;
};

export const getNewsList = async (queries? : MicroCMSQueries) => {
    const listData = await client
        .getList<News>({
            endpoint: "news",
            queries,
        });
    return listData;
};

export const getNewsDetail = async (
    contentId: string,
    queries?: MicroCMSQueries
) => {
    const detailData = await client.getListDetail<News>({
        endpoint: "news",
        contentId,
        queries,
        customRequestInit: {
            next: {
                revalidate: queries?.draftKey === undefined ? 60 : 0,
            },
        },
    });
    return detailData;
}

export const getCategoryDetail = async (
    contentId: string,
    queries?: MicroCMSQueries
) => {
    const detailData = await client.getListDetail<Category>({
        endpoint: "categories",
        contentId,
        queries,
    });
    return detailData;
}

export const getAllNewsList = async () => {
    const listData = await client.getAllContents<News>({
       endpoint: "news" 
    });
    return listData;
}

export const getAllCategoryList = async () => {
    const listData = await client.getAllContents<Category>({
       endpoint: "categories" 
    });
    return listData;
}