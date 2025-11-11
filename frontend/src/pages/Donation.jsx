import React, { useState } from "react";
import DonationForm from "../components/sections/Donation/DonationForm";

const Donation = () => {
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="container-custom section-padding fade-in">
      <h1 className="gradient-text mb-8 text-center">Support Our Mission</h1>
      <div className="card p-8 max-w-lg mx-auto">
        {success ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Thank you for your donation!
            </h2>
            <p>We appreciate your support.</p>
          </div>
        ) : (
          <DonationForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            amount={amount}
            setAmount={setAmount}
            message={message}
            setMessage={setMessage}
            loading={loading}
            setLoading={setLoading}
          />
        )}
      </div>
    </div>
  );
};

export default Donation;
