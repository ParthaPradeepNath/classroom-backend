// import AgentAPI from "apminsight";
// AgentAPI.config()

import express from "express";
import cors from "cors";

// why .js not .ts, because node never executes ts only executes js files at runtime
import subjectsRouter from "./routes/subjects.js";
import securiyMiddleware from "./middleware/security.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import usersRouter from "./routes/users.js"
import classesRouter from "./routes/classes.js"

const app = express();
const PORT = 8000;

if (!process.env.FRONTEND_URL) {
  throw new Error("FRONTEND_URL is not set in the .env file");
}

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use(securiyMiddleware);

app.use("/api/subjects", subjectsRouter);
app.use('/api/users', usersRouter)
app.use('/api/classes', classesRouter)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
