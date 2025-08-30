import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Create faculty
router.post("/", async (req, res) => {
  try {
    const { name, subject } = req.body;

    if (!name || !subject) {
      return res.status(400).json({ error: "Name and subject are required" });
    }

    const faculty = await prisma.faculty.create({
      data: { name, subject },
    });

    res.status(201).json({ success: true, faculty });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all faculty
router.get("/", async (req, res) => {
  try {
    const faculties = await prisma.faculty.findMany();
    res.json({ faculties });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
