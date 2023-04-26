const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

//file imports
const connectDB = require("./config/dbConfig");
const authRoutes = require("./routes/authRoute");
const openaiRoutes = require("./routes/openAiRoute");
const extraOpenaiRoutes = require("./routes/ExtraOpenAiRoute");
const errorHandler = require("./middlewares/errorMiddleware");

//config
dotenv.config();

//middleware
app.use(errorHandler);
app.use(express.json({ limit: "3mb" }));
app.use(cors());

//API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/openai", openaiRoutes);
app.use("/api/v1/openai", extraOpenaiRoutes);

//Default route
app.get("/", (req, res) => {
  res.status(200).send(`<h1>Welcome to PROTOOLKIT Api Server 🚀</h1>`);
});

//DB Connection
const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server on port:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
