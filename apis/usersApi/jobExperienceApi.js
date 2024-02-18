const express = require("express");
const { ObjectId } = require("mongodb");

const jobExperienceApi = (jobExperienceCollection) => {
  const jobExperienceRouter = express.Router();
  jobExperienceRouter.get("/", async (req, res) => {
    const result = await jobExperienceCollection.find().toArray();
    res.send(result);
  });
  jobExperienceRouter.post("/", async (req, res) => {
    const newJobExperience = req.body;
    const result = await jobExperienceCollection.insertOne(newJobExperience);
    res.send(result);
  });

  jobExperienceRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    // { uid: uid };
    const result = await jobExperienceCollection.deleteOne(query);
    res.send(result);
  });
  return jobExperienceRouter;
};

module.exports = jobExperienceApi;
