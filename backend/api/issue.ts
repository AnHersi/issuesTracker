import express from "express";
import Issue from "../models/issue";
import { v4 } from "uuid";

const router = express.Router();

router.post("/new", async (req, res) => {
	try {
		const { issueTitle, description, solution } = req.body;

		const id = v4().split("-").pop();

		const date = new Date();
		const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
			.toString()
			.padStart(2, "0")}-${date.getFullYear()}`;

		const status = !solution || solution.ops[0].insert === "\n" ? "unsolved" : "solved";

		const issue = await Issue.create({
			id,
			issueTitle,
			description,
			solution,
			status,
			created_at: formattedDate,
		});

		res.send(issue);
	} catch (err: unknown) {
		if (err instanceof Error) console.log(err.message);
	}
});

router.get("/all", async (req, res) => {
	const issues = await Issue.find({});
	res.send(issues);
});

export default router;
