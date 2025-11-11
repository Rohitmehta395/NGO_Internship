import React, { useState } from "react";

const DonationForm = () => {
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="card p-8 max-w-lg mx-auto">
      {success ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Thank you for your donation!</h2>
          <p>We appreciate your support.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Donation Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min={1}
              className="input"
              placeholder="Amount"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Message (optional)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input"
              placeholder="Message"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Processing..." : "Donate Now"}
          </button>
        </form>
      )}
    </div>
  );
};

export default DonationForm;
