const express = require("express");
const prisma = require("../services/prisma.js");

const router = express.Router();

// ✅ Get all classrooms
router.get("/", async (req, res) => {
  try {
    const classrooms = await prisma.classroom.findMany();
    res.json(classrooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Count classrooms
router.get("/count", async (req, res) => {
  try {
    const count = await prisma.classroom.count();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Create new classroom
router.post("/", async (req, res) => {
  try {
    const { name, capacity } = req.body;
    const classroom = await prisma.classroom.create({
      data: { name, capacity: Number(capacity) },
    });
    res.json(classroom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update classroom
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, capacity } = req.body;
    const classroom = await prisma.classroom.update({
      where: { id: Number(id) },
      data: { name, capacity: Number(capacity) },
    });
    res.json(classroom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete classroom
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.classroom.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Classroom deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
