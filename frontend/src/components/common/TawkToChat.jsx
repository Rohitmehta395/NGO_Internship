import { useEffect } from "react";

const TawkToChat = () => {
  useEffect(() => {
    // 1. Get IDs from .env
    const propertyId = import.meta.env.VITE_TAWK_PROPERTY_ID;
    const widgetId = import.meta.env.VITE_TAWK_WIDGET_ID;

    if (!propertyId || !widgetId) {
      console.warn("Tawk.to: Missing IDs in .env");
      return;
    }

    // 2. Prevent duplicates
    if (document.getElementById("tawk-to-script")) return;

    // 3. Initialize Tawk
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // 4. Inject Script
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.id = "tawk-to-script";
    s1.async = true;
    s1.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(s1, s0);
  }, []);

  return null;
};

export default TawkToChat;
