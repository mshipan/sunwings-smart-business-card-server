const express = require("express");
const { ObjectId } = require("mongodb");

const usersApi = (usersCollection) => {
  const userRouter = express.Router();

  userRouter.get("/", async (req, res) => {
    const result = await usersCollection.find().toArray();
    res.send(result);
  });

  userRouter.post("/", async (req, res) => {
    const newUser = req.body;
    const result = await usersCollection.insertOne(newUser);
    res.send(result);
  });

  return userRouter;
};

module.exports = usersApi;
