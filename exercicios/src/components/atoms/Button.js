export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
}) {
  const styles = {
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    backgroundColor: variant === "primary" ? "#0070f3" : "#ff4d4d",
    color: "white",
    transition: "opacity 0.2s",
    marginBottom: "10px",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={styles}
      onMouseOver={(e) => (e.target.style.opacity = "0.8")}
      onMouseOut={(e) => (e.target.style.opacity = "1")}
    >
      {children}
    </button>
  );
}
