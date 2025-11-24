const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

router.get("/", async (req, res) => {
  res.json(await Item.find().populate("owner"));
});

router.post("/", async (req, res) => {
  const item = await Item.create(req.body);
  res.json(item);
});

router.get("/:id", async (req, res) => {
  res.json(await Item.findById(req.params.id).populate("owner"));
});

router.put("/:id", async (req, res) => {
  res.json(await Item.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

router.delete("/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed" });
});

module.exports = router;
