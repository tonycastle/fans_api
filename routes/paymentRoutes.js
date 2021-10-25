const express = require("express");
const { addCard, listCards } = require("../controllers/paymentController.js");

const router = express.Router();

router.get("/addcard", addCard);
router.get("/listcards", listCards);

exports.router = router;
