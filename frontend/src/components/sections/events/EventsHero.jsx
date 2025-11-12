import React from "react";
import { useLocation } from "react-router-dom";
import backgroundImage from "../../../assets/eventsbackgroundimage.webp";
import Banner from "../../common/Banner";

const EventsHero = () => {
  const location = useLocation();
  return (
    <Banner
      image={backgroundImage}
      title="Events"
      currentPath={location.pathname}
    />
  );
};

export default EventsHero;
