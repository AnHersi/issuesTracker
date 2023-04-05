import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import issuesRouter from "./api/issue";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(
	cors({
		origin: ["http://localhost:5173"],
	})
);

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json());

app.use("/issues", issuesRouter);

mongoose
	.connect(
		"mongodb+srv://anas:gUTWLJqXcMl3glft@cluster0.eewtff5.mongodb.net/?retryWrites=true&w=majority",
		{
			dbName: "issuesTracker",
		}
	)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err: Error) => {
		console.log(err);
	});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));

app.listen(port, () => {
	console.log("Listening on port " + port);
});
