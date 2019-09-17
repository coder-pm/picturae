import * as envVar from "env-var";
import {AddressInfo} from "net";
import {app} from "./app";

const ADDRESS: string = envVar.get("API_ADDRESS", "127.0.0.1").asString();
const PORT: number = envVar.get("API_PORT", "8080").asInt();

/**
 * Start API server.
 */
const server = app.listen(PORT, ADDRESS, () => {
    const info: AddressInfo | string | null = server.address();
    if (info && typeof info === "object") {
        console.log(`Picturae server started on port: ${info.port}, bound to address: "${info.address}"`);
    } else {
        console.log("Seems like something went wrong while starting server");
    }
});
