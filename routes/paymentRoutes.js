import express from "express";
import * as Payments from "../controllers/paymentController.js";

const router = express.Router();

router.get("/addcard", Payments.addCard);

export default router;
