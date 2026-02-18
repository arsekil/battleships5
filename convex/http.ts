import { httpRouter } from "convex/server";
import { corsRouter } from "convex-helpers/server/cors";
import { getAllUsers, updateUserMetadata } from "./clerkBackendApi";

const http = httpRouter();
const cors = corsRouter(http);

cors.route({
  path: "/users",
  method: "GET",
  handler: getAllUsers  
});

cors.route({
  path: "/user/metadata",
  method: "PATCH",
  handler: updateUserMetadata
});

export default http;