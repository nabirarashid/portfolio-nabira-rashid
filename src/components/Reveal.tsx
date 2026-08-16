import type { ReactNode } from "react";
import useReveal from "../hooks/useReveal";

interface Props {
  children: ReactNode;
  className?: string;
  /** Stagger in milliseconds, for revealing siblings one after another. */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}

const Reveal = ({ children, className = "", delay = 0, as: Tag = "div" }: Props) => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
