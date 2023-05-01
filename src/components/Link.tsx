export function Link({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
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
