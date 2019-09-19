/* tslint:disable:no-namespace interface-name */
declare namespace Express {
    export interface Request {
        image?: { mime: string, blob: any };
    }
}
