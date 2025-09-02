import userRoutes from "./apiRoutes/userRoutes.js";
const baseURL = "/api/v1";

const routesGroup = (app) => {
  app.use(baseURL, userRoutes);
};

export default routesGroup;