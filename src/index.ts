import express from "express";
import userRoutes from "./routes/user_routes.ts";

const app = express();
app.use(express.json()); 

const port= Bun.env.PORT || 8000;

app.use("/api/users", userRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port,()=>{
    console.log("Server is running on port", port);
});
