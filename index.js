import env from "dotenv";
env.config();
import express from "express";
import cors from "cors";
import connectionDb from "./db/server.js";
import router from "./routes/message.routes.js";
import path from "path";
import { fileURLToPath } from "url";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB Connection
connectionDb(process.env.MONGOOSE_URI)
  .then(() => {
    console.log("MongoDb Connected");
  })
  .catch((error) => {
    console.log(error);
  });

// Middleware
app.use(cors());
app.use(express.json());

// Static File

app.use(express.static(path.join(__dirname, "./tour-travels/build")));

// Routes
app.get("/", (req, res) => {
  return res.send("<h3>Welcome to culture Backend</h3>");
});

app.use("/api/v1/tour-travels", router);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./tour-travels/build/index.html"));
});

// PORT
const PORT = process.env.PORT || 8081;

// listen port
app.listen(PORT, () => {
  console.log(`Started on PORT ${PORT}`);
});
