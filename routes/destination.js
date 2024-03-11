import express from "express";
import { createDestination, deleteDestination, getAllDestinations, getSingleDestination, updateDestination } from "../controllers/tourController.js";

const router = express.Router();

router.post("/", createDestination);

router.put("/:id", updateDestination);

router.delete("/:id", deleteDestination);

router.get("/:id", getSingleDestination);

router.get("/", getAllDestinations);

export default router;
