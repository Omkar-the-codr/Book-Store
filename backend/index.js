import express from "express";
import mongoose from "mongoose";
import { PORT } from "./config.js";
import { MONGODB_URI } from "./config.js";
import bookRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();
app.get("/", (req, res) => {
  // console.log(JSON.stringify(req.headers));
  return res.status(200).send("Hello World");
});
app.use("/books", bookRoute);

app.use(express.json());
// we can either use cors policy like below code
app.use(cors());
//or we can use this following code to allow custom origins
// app.use(cors({ origin: "http://localhost:3000",
//   methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
//   allowedHeaders: ["Content-Type"],
//  }));
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`App is listening on port "+${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });