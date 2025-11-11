import React from "react";
import "../../styles/EventHero.css";

const EventHero = () => {
  return (
    <section className="events-hero">
      <div className="events-overlay">
        <div className="events-context">
        <h1>Events</h1>
        <p>
          Home <span>&#187;</span> Events
        </p>
        </div>
      </div>
    </section>
  );
};

export default EventHero;
