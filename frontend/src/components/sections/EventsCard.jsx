import "../../styles/EventCard.css";

const EventCard = ({ image, title, description, date, month, venue, onReadMore }) => {
  return (
    <div className="event-card">
      <img src={image} alt={title} className="event-img" />
      <div className="event-content">
        <h3 className="event-title">{title}</h3>
        <p className="event-date">
          {date} {month}
        </p>
        <p className="event-venue">{venue}</p>
        <p className="event-desc">
          {description.slice(0, 130)}...
        </p>
        <button className="event-btn" onClick={onReadMore}>
          Read More →
        </button>
      </div>
    </div>
  );
};

export default EventCard;
