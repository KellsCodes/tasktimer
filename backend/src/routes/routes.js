const baseURL = "/api/v1";
import userRoutes from "./apiRoutes/userRoutes.js";
import profileRoutes from "./apiRoutes/profileRoutes.js";
import path from "path";

const routesGroup = (app, express) => {
  app.use(baseURL, userRoutes);
  app.use(baseURL, profileRoutes);
  app.use(
    `${baseURL}/storage`,
    express.static(path.join(process.cwd(), "storage"))
  );
};

export default routesGroup;
