/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Lombard items (pledged goods)
 */

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Get all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: List of items
 *
 *   post:
 *     summary: Create new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               estimatedPrice:
 *                 type: number
 *               loanAmount:
 *                 type: number
 *               commission:
 *                 type: number
 *               owner:
 *                 type: string
 *                 description: Client ID
 *     responses:
 *       200:
 *         description: Created item
 */

/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     summary: Get item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item data
 *
 *   put:
 *     summary: Update item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated item
 *
 *   delete:
 *     summary: Delete item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted item
 */

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
