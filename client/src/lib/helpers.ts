import { ServerError } from "./types";

export function isServerError(error: ServerError | {isError: boolean}): error is ServerError {
    return (error as ServerError) !== undefined;
}