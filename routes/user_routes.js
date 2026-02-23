import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js"
import { getUsers, getUser } from "../Controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.post("./", (req, res) => res.send({ title: 'create new users' }));

userRouter.put("./:id", (req, res) => res.send({ title: 'Update users id' }));

userRouter.delete("./:id", (req, res) => res.send({ title: 'Delete user' }));


export default userRouter;
