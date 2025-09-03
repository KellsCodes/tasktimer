const baseURL = "/api/v1";
import userRoutes from "./apiRoutes/userRoutes.js";
import profileRoutes from "./apiRoutes/profileRoutes.js";

const routesGroup = (app) => {
  app.use(baseURL, userRoutes);
  app.use(baseURL, profileRoutes);
};

export default routesGroup;
