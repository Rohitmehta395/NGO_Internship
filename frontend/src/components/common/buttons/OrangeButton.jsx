import { useNavigate } from "react-router-dom";

export default function OrangeButton({ path, className = "", work }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!path) return;

    if (path.startsWith("http")) {
      // External link → open in new tab
      window.open(path, "_blank");
    } else {
      // Internal navigation via React Router
      navigate(path);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2.5 px-3.5 py-2 bg-orange-400 border-none cursor-pointer rounded-full hover:bg-orange-600 transition-colors shadow-md ${className}`}
    >
      <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-orange-400"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
          <polyline points="15 18 21 12 15 6"></polyline>
        </svg>
      </div>
      <span className="text-white font-semibold text-base whitespace-nowrap">
        {work}
      </span>
    </button>
  );
}
