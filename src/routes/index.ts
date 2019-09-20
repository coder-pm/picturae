import * as bodyParser from "body-parser";
import * as envVar from "env-var";
import {Router} from "express";
import {filter as imageFilter} from "../request/image.filter";
import colorRouter from "./color";

// create router
const router = Router();

// input validation
router.use(bodyParser.raw({
    limit: envVar.get("MAX_FILE_SIZE", "16MB").asString(),
    type: () => true
}));
router.use(imageFilter);

// register color router
router.use("/color", colorRouter);

// default export
export default router;
