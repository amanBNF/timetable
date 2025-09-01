const express = require("express");
const prisma = require("../services/prisma.js");

const router = express.Router();

// ✅ Get all subjects
router.get("/", async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//count all subjects
router.get("/count", async (req, res) => {
  try {
    const count = await prisma.subject.count();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: "nahi chalega bhaii jaooo" });
  }
});

// ✅ Create new subject
router.post("/", async (req, res) => {
  try {
    const { name, code, totalHours } = req.body;
    const subject = await prisma.subject.create({
      data: {
        name,
        code,
        totalHours: Number(totalHours),
      },
    });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update subject
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, totalHours } = req.body;
    const subject = await prisma.subject.update({
      where: { id: Number(id) },
      data: {
        name,
        code,
        totalHours: Number(totalHours),
      },
    });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete subject
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.Subject.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Subject deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
