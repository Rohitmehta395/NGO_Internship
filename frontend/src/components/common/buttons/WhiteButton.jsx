import { useNavigate } from "react-router-dom";

export default function WhiteButton({ path, className = "", work }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!path) return;

    if (path.startsWith("http")) {
      // External link → open in new tab
      window.open(path, "_blank");
    } else {
      // Internal navigation → use React Router
      navigate(path);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2.5 px-5 py-2.5 bg-white cursor-pointer rounded-full hover:opacity-90 transition-opacity shadow-sm ${className}`}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-orange-500"
      >
        <polyline points="9 18 15 12 9 6"></polyline>
        <polyline points="15 18 21 12 15 6"></polyline>
      </svg>
      <span className="text-black font-bold text-base whitespace-nowrap">
        {work}
      </span>
    </button>
  );
}
