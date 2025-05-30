const { Testimonial } = require('../models');

exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll();
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
};

exports.createTestimonial = async (req, res) => {
  try {
    const { name, quote, rating, featured } = req.body;

     if (!name || !quote || !rating) {
      return res.status(400).json({ error: 'Name, quote, and rating are required.' });
    }

    const newTestimonial = await Testimonial.create({
      name,
      quote,
      rating,
      featured: featured ?? false,  
    });

    res.status(201).json(newTestimonial);
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
};