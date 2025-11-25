const express = require("express");
const router = express.Router();
const Deal = require("../models/Deal");
const Item = require("../models/Item");


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
 */
router.get("/", async (req, res) => {
  await autoCheckDeals();
  const deals = await Deal.find().populate("client item");
  res.json(deals);
});

/**
 * @swagger
 * /api/deals:
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
 *               item:
 *                 type: string
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
router.post("/", async (req, res) => {
  const deal = await Deal.create(req.body);
  res.json(deal);
});

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
 */
router.get("/:id", async (req, res) => {
  await autoCheckDeals();
  const deal = await Deal.findById(req.params.id).populate("client item");
  res.json(deal);
});

/**
 * @swagger
 * /api/deals/{id}:
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
 */
router.put("/:id", async (req, res) => {
  const deal = await Deal.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(deal);
});

/**
 * @swagger
 * /api/deals/{id}:
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
router.delete("/:id", async (req, res) => {
  await Deal.findByIdAndDelete(req.params.id);
  res.json({ message: "Deal deleted" });
});

async function autoCheckDeals() {
  const deals = await Deal.find().populate("item");

  const today = new Date();

  for (const deal of deals) {
    if (deal.dueDate < today && !deal.isReturned) {
      const item = deal.item;

      if (item && item.status !== "owned") {
        item.status = "owned";

        item.priceHistory.push({
          date: new Date(),
          price: item.estimatedPrice
        });

        await item.save();
      }
    }
  }
}
module.exports = router;
