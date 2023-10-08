import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/ContactForm.css';

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      )
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
    <form className="form-container">
      <div className="contact-us">Contact Us</div>
      <div className="text-wrapper">Write to us</div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control transparent-input"
          id="name1"
          name="from_first_name"
          placeholder="First Name"
        />

        <input
          type="text"
          name="from_last_name"
          className="form-control transparent-input"
          id="name2"
          placeholder="Last Name"
        />
      </div>

      <div className="mb-1">
        <label htmlFor="exampleInputEmail1" className="form-label visually-hidden">
          Email
        </label>
        <input
          type="email"
          name="from_email"
          className="form-control transparent-input"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Email"
        />
        <div id="emailHelp" className="form-text"></div>
      </div>
      <div className="mb-2">
        <label htmlFor="message" className="form-label visually-hidden">
          Message
        </label>
        <textarea
          className="form-control transparent-input"
          id="message"
          name="message"
          rows="4"
          placeholder="Enter message"
        />
      </div>

      <button type="submit" className="btn-primary">
        Submit
      </button>
    </form>
  );

};

export default ContactForm;
