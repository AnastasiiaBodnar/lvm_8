require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swagger = require("./swagger");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("DB error:", err));

app.use("/api/clients", require("./routes/clients"));
app.use("/api/items", require("./routes/items"));
app.use("/api/deals", require("./routes/deals"));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swagger));

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
