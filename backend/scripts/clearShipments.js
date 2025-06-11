
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Import the Shipment model
import Shipment from "../models/shipment.model.js";

const clearAllShipments = async () => {
	try {
		// Connect to MongoDB
		console.log("Connecting to MongoDB...");
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("✅ Connected to MongoDB");

		// Count existing shipments
		const shipmentCount = await Shipment.countDocuments();
		console.log(`📦 Found ${shipmentCount} shipments in the database`);

		if (shipmentCount === 0) {
			console.log("🎉 No shipments to delete!");
			return;
		}

		// Ask for confirmation
		console.log("⚠️  WARNING: This will permanently delete ALL shipments from the database!");
		console.log("⚠️  This action cannot be undone!");

		// Delete all shipments
		const result = await Shipment.deleteMany({});
		console.log(`🗑️  Successfully deleted ${result.deletedCount} shipments`);

		// Verify deletion
		const remainingCount = await Shipment.countDocuments();
		console.log(`📊 Remaining shipments: ${remainingCount}`);

		if (remainingCount === 0) {
			console.log("✅ All shipments have been successfully cleared from the database!");
		} else {
			console.log("❌ Some shipments may not have been deleted. Please check manually.");
		}

	} catch (error) {
		console.error("❌ Error clearing shipments:", error.message);
		process.exit(1);
	} finally {
		// Close the database connection
		await mongoose.connection.close();
		console.log("🔌 Database connection closed");
		process.exit(0);
	}
};

// Run the script
console.log("🚀 Starting shipments cleanup script...");
clearAllShipments();
