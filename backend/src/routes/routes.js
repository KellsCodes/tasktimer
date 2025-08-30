import userRoutes from "./apiRoutes/userRoutes.js";

const routesGroup = (app) => {
  app.use("/api/v1", userRoutes);
};

export default routesGroup;