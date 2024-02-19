const express = require("express");
const { ObjectId } = require("mongodb");

const educationApi = (educationCollection) => {
  const educationRouter = express.Router();

  educationRouter.get("/", async (req, res) => {
    const result = await educationCollection.find().toArray();
    res.send(result);
  });
  educationRouter.post("/", async (req, res) => {
    const newEducation = req.body;
    const result = await educationCollection.insertOne(newEducation);
    res.send(result);
  });

  educationRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await educationCollection.deleteOne(query);
    res.send(result);
  });

  return educationRouter;
};

module.exports = educationApi;
