export default function Title({ children, nivel = 1 }) {
  const Tag = `h${nivel}`;

  const styles = {
    color: "#333",
    fontFamily: "sans-serif",
    borderBottom: nivel === 1 ? "2px solid #0070f3" : "none",
    paddingBottom: "5px",
  };

  return <Tag style={styles}>{children}</Tag>;
}
