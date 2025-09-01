// client/src/pages/Contact/ContactUs.jsx
import React, { useState } from "react";
import axios from "axios";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await axios.post("http://localhost:5000/api/contact", form);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>Contact Us</h1>
      <p>
        Have questions or need support? Fill out the form below or reach us
        through our details.
      </p>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone (optional)"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          style={{ minHeight: "100px" }}
        />
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>
      </form>

      {status === "success" && (
        <p style={{ color: "green" }}>✅ Message sent successfully!</p>
      )}
      {status === "error" && (
        <p style={{ color: "red" }}>❌ Something went wrong. Try again later.</p>
      )}

      {/* Contact Info */}
      <div style={{ marginTop: "30px" }}>
        <h2>Our Office</h2>
        <p>Job Portal Pvt Ltd</p>
        <p>123 Career Street, Tech City</p>
        <p>Email: support@jobportal.com</p>
        <p>Phone: +91 98765 43210</p>
      </div>

      {/* Google Map Embed */}
      <div style={{ marginTop: "20px" }}>
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3..."
          width="100%"
          height="250"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Social Media Links */}
      <div style={{ marginTop: "20px" }}>
        <h3>Connect with us</h3>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
          LinkedIn
        </a>{" "}
        |{" "}
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          Facebook
        </a>{" "}
        |{" "}
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          Twitter
        </a>{" "}
        |{" "}
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          Instagram
        </a>
      </div>
    </div>
  );
};

export default ContactUs;
