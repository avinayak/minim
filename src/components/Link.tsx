export function Link({ href, children }) {
  return (
    <span
      className="link"
      onClick={() => {
        window.open(href, "_blank");
      }}
    >
      {children}
    </span>
  );
}
