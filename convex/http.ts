import { httpRouter } from "convex/server";
import { corsRouter } from "convex-helpers/server/cors";
import { getAllUsers } from "./clerkBackendApi";

const http = httpRouter();
const cors = corsRouter(http);

cors.route({
  path: "/users",
  method: "GET",
  handler: getAllUsers  
});


export default http;