export interface ApiResponse<T> {
    status: string;
    data?: T;
    message?: string;
    error?: string;
    code?: string;
	details?: string[];
}

export const successResponse = <T>(
	data?: T,
	message?: string
): ApiResponse<T> => ({
	status: "success",
	data,
	message,
});

export const errorResponse = (
	message: string,
	code?: string,
    details?: string[]
): ApiResponse<null> => ({
	status: "error",
	message,
	code,
    details

});
