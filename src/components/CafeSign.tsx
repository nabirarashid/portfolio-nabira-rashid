interface CafeSignProps {
  position?: "top-right" | "top-left";
  opacity?: number;
}

const CafeSign = ({ position = "top-right", opacity = 1 }: CafeSignProps) => {
  const positionClass = position === "top-right" 
    ? "top-0 right-0" 
    : "top-0 left-0";

  return (
    <div className={`absolute ${positionClass} pointer-events-none z-10`} style={{ opacity }}>
      <img 
        src="/assets/website/image-removebg-preview.png"
        alt="cafe sign"
        className="w-48 h-auto md:w-64"
      />
    </div>
  );
};

export default CafeSign;
