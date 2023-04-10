import express from "express";
import Issue from "../models/issue";
import { v4 } from "uuid";

const router = express.Router();

router.post("/new", async (req, res) => {
	try {
		const { issueTitle, description, solution } = req.body;

		const id = v4().split("-").pop();

		const status = !solution || solution == "<p><br/></p>" ? "unsolved" : "solved";

		const issue = await Issue.create({
			id,
			issueTitle,
			description,
			solution,
			status,
			created_at: Date.now(),
		});

		res.send(issue);
	} catch (err: unknown) {
		if (err instanceof Error) console.log(err.message);
	}
});

router.get("/all", async (req, res) => {
	const issues = await Issue.find({}).sort({ created_at: -1 });
	res.send(issues);
});

router.delete("/:id", async (req, res) => {
	try {
		const issue = await Issue.deleteOne({ id: req.params.id });
		res.send(issue);
	} catch (err: unknown) {
		if (err instanceof Error) console.log(err.message);
	}
});

router.delete("/", async (req, res) => {
	const ids = (req.query.ids as string).split(",");
	try {
		const issues = await Issue.deleteMany({ id: { $in: ids } });
		res.send(issues);
	} catch (err: unknown) {
		if (err instanceof Error) console.log(err.message);
	}
});

export default router;
