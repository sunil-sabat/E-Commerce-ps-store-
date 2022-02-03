import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import connectDB from "./config/db.js";
import color from "colors";
import { notFound, errorHandler } from "./middlewares/errorMiddleWare.js";
import userRoutes from "./routes/userRoutes.js";
import { authUser } from "./controllers/userController.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";
dotenv.config();
connectDB();

const app = express();

app.use(express.json()); /// req.body parsing

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadRoutes);

//PayPal Client_id route
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_ID);
});

//create static Folder

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}
//ERROR MIDDLEWARE

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `server running in ${process.env.NODE_ENV} mode on  port number ${PORT}`
      .yellow.bold
  )
);
