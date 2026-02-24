import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user_routes.js";
import authRouter from "./routes/auth_routus.js";
import subcribeRouter from "./routes/sub.routues.js";
import connectToDatabase from "./DATABASE/mongeDB.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleWare from "./middlewares/arcjet.middle.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleWare)

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subcribe", subcribeRouter);

// Error handling middleware
app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send("Welcome to the Subscription Tracker API");
});

// Connect to DB then start server
const startServer = async () => {
    try {
        await connectToDatabase();
        app.listen(PORT, () => {
            console.log(`SERVER IS RUNNING AT: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();

export default app;
