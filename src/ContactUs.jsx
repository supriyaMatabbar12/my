// src/ContactUs.jsx
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./ContactUs.css";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Validation
  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);

      // ✅ fake 0.8s delay (simulate sending)
      setTimeout(() => {
        console.log("Form Submitted:", formData);
        setLoading(false);
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setSubmitted(false), 4000);
      }, 800);
    }
  };

  return (
    <div className="page-container">
      <div className="contact-container">
        <h2 className="contact-title">📩 Contact Us</h2>
        <p className="contact-subtitle">
          Have questions or feedback? Fill out the form or reach us directly.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>

          <label>
            Phone Number
            <PhoneInput
              country={"in"}
              enableSearch={true}   // ✅ allows searching country by name
              value={formData.phone}
              onChange={(value) => handleChange("phone", value)}
              inputStyle={{
                 width: "100%",
                 borderRadius: "8px",
                 padding: "12px",
                 border: "1px solid #ccc",
                 fontSize: "15px",
                 }}
                  
                 />

            {errors.phone && <span className="error">{errors.phone}</span>}
          </label>

          <label>
            Message
            <textarea
              name="message"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
            />
            {errors.message && <span className="error">{errors.message}</span>}
          </label>

          <button type="submit" disabled={loading}>
            {loading ? <span className="spinner"></span> : "Send Message"}
          </button>

          {submitted && (
            <div className="success">
              ✅ Your message has been sent successfully.
              <br />
              Our team will reach out to you shortly.
            </div>
          )}
        </form>

        <div className="contact-details">
          <h3>Our Contact Info</h3>
          <p>📍 Address: Salt Lake, Sector V, Kolkata, India</p>
          <p>📞 Phone: +91 98765 43210</p>
          <p>✉️ Email: support@jobportal.com</p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
