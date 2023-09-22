import express from "express";
import bcrypt, { compareSync, hash } from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";
import signin from "./controllers/signin.js";
import register from "./controllers/register.js";
import profile from "./controllers/profile.js";
import { image, handleImageRecognition } from "./controllers/image.js";

const db = knex({
  client: "pg",
  connection: {
    host:
      process.env.DB_URL,
    port: 5432,
    user: "users_s79z_user",
    password: "l2mvWEwaEOBXhEaEzTQEGqMKLJJEuDdq",
    database: "users_s79z",
    ssl: { rejectUnauthorized: false },
  },
});

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("success");
});

app.post("/signin", signin(db, bcrypt));

app.post("/register", register(db, bcrypt));

app.get("/profile/:id", profile(db));

app.put("/image", image(db));

app.post("/image", handleImageRecognition);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
