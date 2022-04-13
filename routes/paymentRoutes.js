const express = require("express");
const {
  addCard,
  listCards,
  deleteCard,
} = require("../controllers/paymentController.js");

const router = express.Router();

router.post("/addcard", addCard);
router.post("/listcards", listCards);
router.post("/deletecard", deleteCard);

exports.router = router;
