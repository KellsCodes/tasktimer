import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello from Express..");
});

router.get("/users", (req, res) => {
  res.json({ users: ["Nikel", "Aioc"] });
});

export default router;
