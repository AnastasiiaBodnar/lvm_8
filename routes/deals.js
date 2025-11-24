/**
 * @swagger
 * tags:
 *   name: Deals
 *   description: Loan deals between clients and the lombard
 */

/**
 * @swagger
 * /api/deals:
 *   get:
 *     summary: Get all deals
 *     tags: [Deals]
 *     responses:
 *       200:
 *         description: List of deals
 *
 *   post:
 *     summary: Create new deal
 *     tags: [Deals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client:
 *                 type: string
 *                 description: Client ID
 *               item:
 *                 type: string
 *                 description: Item ID
 *               loanAmount:
 *                 type: number
 *               commission:
 *                 type: number
 *               issueDate:
 *                 type: string
 *                 format: date
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Deal created
 */

/**
 * @swagger
 * /api/deals/{id}:
 *   get:
 *     summary: Get deal by ID
 *     tags: [Deals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deal data
 *
 *   put:
 *     summary: Update deal
 *     tags: [Deals]
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
 *         description: Deal updated
 *
 *   delete:
 *     summary: Delete deal
 *     tags: [Deals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deal deleted
 */

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
