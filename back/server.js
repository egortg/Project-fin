import express from "express"
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import path from "path"
import authRoutes from "./routes/auth.route.js"
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js"

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/front/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "front", "dist", "index.html"));
	});
}

app.listen(PORT, () =>{
    console.log("Server is on http://localhost:" + PORT)

    connectDB()
})

