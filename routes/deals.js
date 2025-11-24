const express = require("express");
const router = express.Router();
const Deal = require("../models/Deal");

router.get("/", async (req, res) => {
  res.json(await Deal.find().populate("client item"));
});

router.post("/", async (req, res) => {
  const deal = await Deal.create(req.body);
  res.json(deal);
});

router.get("/:id", async (req, res) => {
  res.json(await Deal.findById(req.params.id).populate("client item"));
});

router.put("/:id", async (req, res) => {
  res.json(await Deal.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

router.delete("/:id", async (req, res) => {
  await Deal.findByIdAndDelete(req.params.id);
  res.json({ message: "Deal deleted" });
});

module.exports = router;
