const express = require("express");
const router = express.Router();
const Client = require("../models/Client");

router.get("/", async (req, res) => {
  res.json(await Client.find());
});

router.post("/", async (req, res) => {
  const client = await Client.create(req.body);
  res.json(client);
});

router.get("/:id", async (req, res) => {
  res.json(await Client.findById(req.params.id));
});

router.put("/:id", async (req, res) => {
  res.json(await Client.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

router.delete("/:id", async (req, res) => {
  await Client.findByIdAndDelete(req.params.id);
  res.json({ message: "Client deleted" });
});

module.exports = router;
