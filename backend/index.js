import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import shipmentRoutes from "./routes/shipment.route.js";
import contactRoutes from "./routes/contact.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Configure CORS to accept requests from any origin
app.use(cors({
	origin: true, // This allows any origin
	credentials: true, // This allows cookies to be sent
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/analytics", analyticsRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log("Server is running on http://localhost:" + PORT);
	connectDB();
});
