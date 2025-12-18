import React, { useState } from 'react'
import * as motion from "motion/react-client";

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send to API)
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div 
      className="terminal-section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="terminal-header">
        <span className="terminal-prompt">$</span>
        <span className="terminal-command">./send_feedback.sh</span>
      </div>
      <div className="terminal-content">
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              <span className="terminal-prompt">$</span> name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="terminal-input"
              placeholder="Enter your name..."
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              <span className="terminal-prompt">$</span> message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="terminal-input terminal-textarea"
              placeholder="Type your message here..."
              rows="6"
              required
            />
          </div>
          <motion.button
            type="submit"
            className="terminal-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {submitted ? (
              <span className="terminal-text-green">✓ Message sent!</span>
            ) : (
              <>
                <span className="terminal-prompt">$</span> submit
              </>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}

