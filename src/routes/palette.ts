import * as bodyParser from "body-parser";
import * as express from "express";
import {NextFunction, Request, Response} from "express";
import {filter as imageFilter} from "../request/image.filter";
import IApiResponse from "../response/api.response";

// create router
export const router = express.Router();

// input validation
router.use(bodyParser.raw({limit: "16MB", type: () => true}));
router.use(imageFilter);

// endpoint handler
router.post("/", ((req: Request, res: Response, next: NextFunction) => {
    console.log(req.image);
    res.json({code: 200, status: "OK", result: {}} as IApiResponse);
}));
