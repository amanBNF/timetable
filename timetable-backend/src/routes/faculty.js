// import express from "express";
// import { PrismaClient } from "@prisma/client";

const express = require('express');
const PrismaClient = require('@prisma/client').PrismaClient;

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

//delete the data
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFaculty = await prisma.faculty.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Faculty deleted", data: deletedFaculty });
  } catch (err) {
    console.error("DELETE /faculty/:id error:", err);
    res.status(500).json({ error: err.message });
  }
});


//get count of faculty
router.get("/count", async (req, res) => {
  try {
    const count = await prisma.faculty.count();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: "nahi chalega bhaii jaooo" });
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

module.exports = router;
