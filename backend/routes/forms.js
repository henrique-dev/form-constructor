const express = require("express");

const { getAll, get, add } = require("../data/form");

const router = express.Router();
const answersRouter = require("./answers");

router.get("/", async (req, res, next) => {
  try {
    const forms = await getAll();
    res.json({ forms: forms });
  } catch (error) {
    next(error);
  }
});

router.get("/:formId", async (req, res, next) => {
  try {
    const form = await get(req.params.formId);
    res.json({ form: form });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const data = req.body;

  let errors = {};

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Adding the form failed due to validation errors.",
      errors,
    });
  }

  try {
    await add(data);
    res.status(201).json({ message: "form saved.", form: data });
  } catch (error) {
    next(error);
  }
});

router.use(
  "/:formId/answers",
  (req, res, next) => {
    req.formId = req.params.formId;
    next();
  },
  answersRouter
);

module.exports = router;
