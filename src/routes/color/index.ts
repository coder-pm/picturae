import {Router} from "express";
import DominantService from "../../services/dominant/dominant.service";
import dominantRoute from "./dominant.route";

// create router
const router = Router();

// register dominant route
router.use("/dominant", dominantRoute(new DominantService()));

// default export
export default router;
