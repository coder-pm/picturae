/**
 * IApiResponse - API response model.
 */
export default interface IApiResponse {
    code: number;
    status: string;
    result?: any;
}
