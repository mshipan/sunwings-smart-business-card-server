const express = require("express");

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

  educationRouter.delete("/:uid", async (req, res) => {
    const uid = req.params.uid;
    const query = { uid: uid };
    const result = await educationCollection.deleteOne(query);
    res.send(result);
  });

  return educationRouter;
};

module.exports = educationApi;
