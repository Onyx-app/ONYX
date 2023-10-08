import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(import.meta.env.VITE_EMAIL_SERVICE_ID,
              import.meta.env.VITE_EMAIL_TEMPLATE_ID,
              form.current, 
              import.meta.env.VITE_EMAIL_PUBLIC_KEY)
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="center-container">
      <div className="form-container">
        <h1>Contact Us</h1>
        <form className="contact-form" ref={form} onSubmit={sendEmail}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" name="from_name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="from_email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea type="text" name="message" required />
          </div>
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
