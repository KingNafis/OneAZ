const express = require('express');
const Course = require('../models/Course');

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    // Fetch courses from the database
    const courses = await Course.find();

    // Debugging: Log the fetched courses or handle empty results
    if (!courses || courses.length === 0) {
      console.log('No courses found');
      return res.status(404).json({ message: 'No courses found' });
    }

    console.log('Courses retrieved successfully:', courses); // Debug log
    res.json(courses); // Send the courses as response
  } catch (err) {
    // Log detailed error for debugging
    console.error('Error fetching courses:', err.message, err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Add a new course
router.post('/', async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Debug log
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error('Error adding course:', err.message);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
