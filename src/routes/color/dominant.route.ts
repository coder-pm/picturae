import * as express from "express";
import {NextFunction, Request, Response} from "express";
import IApiResponse from "./../../response/api.response";
import DominantService from "./../../services/dominant/dominant.service";

// route handler
export default ((service: DominantService): express.Router => {
    // create router
    const router = express.Router();
    // endpoint handler
    router.post("/", (async (req: Request, res: Response, next: NextFunction) => {
        if (req.image) {
            const dominant = await service.color(req.image.data);
            res.json({code: 200, status: "OK", result: dominant} as IApiResponse);
        } else {
            throw new Error("Missing image parameter");
        }
    }));
    return router;
});
