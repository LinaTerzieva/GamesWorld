import { Query } from "./types";

export const convertToURLSearchParams = (query: Query): Record<string, string | string[]> => {
    let searchParams: Record<string, string | string[]> = { };

    if(query.query) {
        searchParams = { ...searchParams, query: query.query }
    }

    if(query.sortBy) {
        searchParams = { ...searchParams, sortBy: query.sortBy }
    }

    searchParams = { ...searchParams, discount: query.discount ? "true" : "false"}

    if(query.offset) {
        if(typeof query.offset == "string") {
            searchParams = { ...searchParams, offset: query.offset }
        } else {
            searchParams = { ...searchParams, offset: query.offset.toString() }
        }
    }

    searchParams = { ...searchParams, pageSize: query.pageSize.toString() }

    return searchParams;
}


export const convertOffset = (offset: string | null | number): number => {
    if(typeof offset === 'string') return parseInt(offset);
    else if(offset === null) return 0;
    else return offset;
} 