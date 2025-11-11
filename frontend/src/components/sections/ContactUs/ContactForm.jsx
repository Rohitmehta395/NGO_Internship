import React from "react";

const ContactForm = () => {
  return (
    <div className="card p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <form className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold">Name</label>
          <input type="text" className="input" placeholder="Your Name" required />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Email</label>
          <input type="email" className="input" placeholder="Your Email" required />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Message</label>
          <textarea className="input" placeholder="Your Message" required />
        </div>
        <button type="submit" className="btn btn-primary w-full">Send Message</button>
      </form>
    </div>
  );
};

export default ContactForm;
