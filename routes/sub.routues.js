import { Router } from "express";

const subRouter = Router()


subRouter.get("/", (req, res) => res.send({ title: "Get all subcribtions" }));

subRouter.get("/:id", (req, res) => res.send({ title: "Get subcribtion details" }));

subRouter.post("/", (req, res) => res.send({ title: "Create subcribtions" }));

subRouter.put("/:id", (req, res) => res.send({ title: "Update subcribtions" }));

subRouter.delete("/:id", (req, res) => res.send({ title: "Delete subcribtions" }));

subRouter.delete("/users:id", (req, res) => res.send({ title: "Get all users subcribtions" }));

subRouter.put("/:id/cancel", (req, res) => res.send({ title: "Cancel subcribtion" }));

subRouter.get("/:upcoming-renewals", (req, res) => res.send({ title: "GET upcoming renewals" }));






export default subRouter;
