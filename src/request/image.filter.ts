import {NextFunction, Request, Response} from "express";
import * as fileType from "file-type";

// supported file types
export const supportedTypes = ["image/jpeg", "image/png", "image/gif"];

// image filter middleware
export const filter = async (req: Request, res: Response, next: NextFunction) => {
    if (req.body instanceof Buffer) {
        const type: fileType.FileTypeResult | undefined = fileType(req.body);
        if (type && supportedTypes.indexOf(type.mime) > -1) {
            req.image = {mime: type.mime, data: req.body};
            next();
        } else {
            throw new Error("Unsupported image type");
        }
    } else {
        throw new Error("Missing image in request body");
    }
};
