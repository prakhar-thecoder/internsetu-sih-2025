const express = require('express');
const dbUtils = require('../utils/database');
const router = express.Router();

// GET route to render the add internship form
router.get('/add-internship', async (req, res) => {
  try {
    res.render('addInternship', {
      title: 'Add New Internship',
      message: null,
      error: null
    });
  } catch (error) {
    console.error('Error rendering add internship page:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST route to handle internship creation
router.post('/add-internship', async (req, res) => {
  try {
    const {
      title,
      description,
      required_skills,
      sector,
      location,
      duration,
      stipend,
      company
    } = req.body;

    if (!title || !description || !company || !location || !sector) {
      return res.render('addInternship', {
        title: 'Add New Internship',
        message: null,
        error: 'Please fill in all required fields (title, description, company, location, sector)'
      });
    }

    const newInternship = {
      title: title.trim(),
      description: description.trim(),
      required_skills: required_skills ? required_skills.trim() : '',
      sector: sector.trim(),
      location: location.trim(),
      duration: duration ? duration.trim() : '',
      stipend: stipend ? stipend.trim() : '',
      company: company.trim(),
      posted_at: new Date()
    };

    const result = await dbUtils.insert('internships', newInternship);

    if (result.acknowledged) {
      res.render('addInternship', {
        title: 'Add New Internship',
        message: 'Internship added successfully!',
        error: null
      });
    } else {
      res.render('addInternship', {
        title: 'Add New Internship',
        message: null,
        error: 'Failed to add internship. Please try again.'
      });
    }
  } catch (error) {
    console.error('Error adding internship:', error);
    res.render('addInternship', {
      title: 'Add New Internship',
      message: null,
      error: 'Internal server error. Please try again.'
    });
  }
});

// GET route to list all internships (for admin viewing)
router.get('/internships', async (req, res) => {
  try {
    let internships = await dbUtils.select('internships', {});
    internships = internships.sort((a, b) => new Date(b.posted_at) - new Date(a.posted_at));
    res.json({
      success: true,
      count: internships.length,
      data: internships
    });

  } catch (error) {
    console.error('Error fetching internships:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch internships'
    });
  }
});

module.exports = router;