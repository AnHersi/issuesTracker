import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
	{
		id: String,
		issueTitle: { type: String, required: true },
		description: { type: Object },
		solution: { type: Object },
		status: { type: String, enum: ["solved", "unsolved"], required: true },
		created_at: { type: String, default: Date.now },
	},
	{ collection: "issues" }
);

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;
