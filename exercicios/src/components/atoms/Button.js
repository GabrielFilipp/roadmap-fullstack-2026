export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
}) {
  const variants = {
    primary: "bg-blue-600 houver:bg-blue-700 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 active:scale-95 ${variants[variant]}`}
      onMouseOver={(e) => (e.target.style.opacity = "0.8")}
      onMouseOut={(e) => (e.target.style.opacity = "1")}
    >
      {children}
    </button>
  );
}
