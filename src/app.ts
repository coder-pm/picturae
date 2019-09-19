import * as cors from "cors";
import * as express from "express";
import IApiResponse from "./response/api.response";
import {router as paletteRouter} from "./routes/palette";

// create application
export const app = express();

// middlewares
app.use(cors());

// routes
app.use("/palette", paletteRouter);

// 404 handler
app.use((req: express.Request, res: express.Response) => {
    res.json({
        code: 404,
        status: "Not Found"
    } as IApiResponse);
});

// error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(err);
    res.json({
        code: 500,
        status: "Internal Server Error"
    } as IApiResponse);
});
