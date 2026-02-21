export default function Input({ value, onChange, placeholder, onKeyDown }) {
  const styles = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    width: "100%",
    outline: "none",
    marginBottom: "10px",
  };

  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      style={styles}
    />
  );
}
