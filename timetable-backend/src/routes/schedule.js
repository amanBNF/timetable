const express = require("express");
const prisma = require("../services/prisma.js");

const router = express.Router();

// ✅ Get all schedules
router.get("/", async (req, res) => {
  try {
    const schedules = await prisma.Schedule.findMany({
      include: {
        classroom: true,
        faculty: true,
        subject: true,
      },
    });
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Create schedule
router.post("/", async (req, res) => {
  try {
    const { day, timeSlot, classroomId, facultyId, subjectId } = req.body;
    const schedule = await prisma.Schedule.create({
      data: {
        day,
        timeSlot,
        classroomId: Number(classroomId),
        facultyId: Number(facultyId),
        subjectId: Number(subjectId),
      },
    });
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update schedule
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { day, timeSlot, classroomId, facultyId, subjectId } = req.body;
    const schedule = await prisma.Schedule.update({
      where: { id: Number(id) },
      data: {
        day,
        timeSlot,
        classroomId: Number(classroomId),
        facultyId: Number(facultyId),
        subjectId: Number(subjectId),
      },
    });
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete schedule
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.Schedule.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Schedule deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
