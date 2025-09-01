const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.post("/generate-timetable", async (req, res) => {
  try {
    const { days, timeSlots } = req.body;

    // Fetch data
    const classrooms = await prisma.classroom.findMany();
    const subjects = await prisma.subject.findMany({
      include: { teacher: true },
    });

    if (!classrooms.length || !subjects.length) {
      return res.status(400).json({ error: "Insufficient data to generate timetable" });
    }

    // Helper maps to avoid clashes
    const teacherBusy = {};   // teacherBusy[teacherId][day][slot] = true
    const classroomBusy = {}; // classroomBusy[classroomId][day][slot] = true

    let schedules = [];

    for (const subject of subjects) {
      let assigned = false;

      for (const day of days) {
        for (const slot of timeSlots) {
          const teacherId = subject.teacher?.id;

          // Ensure teacherBusy[teacherId][day] exists
          if (teacherId && !teacherBusy[teacherId]) teacherBusy[teacherId] = {};
          if (teacherId && !teacherBusy[teacherId][day]) teacherBusy[teacherId][day] = {};

          // Try to find a free classroom
          const freeClassroom = classrooms.find(c => {
            if (!classroomBusy[c.id]) classroomBusy[c.id] = {};
            if (!classroomBusy[c.id][day]) classroomBusy[c.id][day] = {};
            return !classroomBusy[c.id][day][slot];
          });

          if (
            freeClassroom &&
            (!teacherId || !teacherBusy[teacherId][day][slot])
          ) {
            // Assign subject
            schedules.push({
              day,
              timeSlot: slot,
              subject: { id: subject.id, name: subject.name },
              teacher: teacherId ? { id: subject.teacher.id, name: subject.teacher.name } : null,
              classroom: { id: freeClassroom.id, name: freeClassroom.name },
            });

            // Mark busy
            if (teacherId) teacherBusy[teacherId][day][slot] = true;
            classroomBusy[freeClassroom.id][day][slot] = true;

            assigned = true;
            break; // break out of slot loop
          }
        }

        if (assigned) break; // break out of day loop if scheduled
      }

      if (!assigned) {
        console.warn(`Could not assign subject: ${subject.name}`);
      }
    }

    res.json({ schedules });
  } catch (err) {
    console.error("Timetable generation error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
