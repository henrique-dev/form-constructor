const express = require("express");

const { getAll, get, add, replace, remove } = require("../data/answers");

const router = express.Router();

router.get("/", async (req, res, next) => {  
  try {
    const answers = await getAll();
    res.json({ answers: answers.filter((answer) => answer.formId === req.formId) });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const data = req.body;

  let errors = {};

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Adding the answer failed due to validation errors.",
      errors,
    });
  }

  try {
    await add(data);
    res.status(201).json({ message: "answer saved.", answer: data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
