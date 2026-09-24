import { useEffect, useRef, useState } from "react";

/**
 * A chalkboard you draw on with the coffee cup. Pick the cup up off its
 * coaster, drag it across the board and it leaves rings and smears where
 * its base touched; let go and it settles back on the coaster. Nothing is
 * stored: a refresh wipes the board, which is the point.
 */
const COFFEE = "196, 150, 96";
const STAMP_EVERY_PX = 20;

const DoodleBoard = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cupRef = useRef<HTMLDivElement>(null);
  const holding = useRef(false);
  const restRect = useRef<DOMRect | null>(null);
  const lastStamp = useRef<{ x: number; y: number } | null>(null);
  const [isHolding, setIsHolding] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Size the bitmap to the element at device resolution. Resizing clears a
  // canvas; that is fine here, nothing is meant to last.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const fit = () => {
      const dpr = window.devicePixelRatio || 1;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.getContext("2d")?.scale(dpr, dpr);
      setHasDrawn(false);
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(canvas);
    return () => {
      observer.disconnect();
      document.body.classList.remove("holding-cup");
    };
  }, []);

  /** Where the cup's base touches, as a ring with a smear back to the last one. */
  const stamp = (x: number, y: number, from: { x: number; y: number } | null) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    if (from) {
      ctx.strokeStyle = `rgba(${COFFEE}, 0.2)`;
      ctx.lineWidth = 9;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    // The ring: never quite round, never quite the same weight.
    const r = 7 + Math.random() * 3;
    ctx.strokeStyle = `rgba(${COFFEE}, ${0.3 + Math.random() * 0.25})`;
    ctx.lineWidth = 1.2 + Math.random() * 1.2;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * (0.88 + Math.random() * 0.12), Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.stroke();
  };

  const carryCup = (clientX: number, clientY: number) => {
    const cup = cupRef.current;
    const rest = restRect.current;
    if (!cup || !rest) return;
    // Hold it so the base of the cup, a little below the image's centre,
    // sits under the pointer.
    const dx = clientX - (rest.left + rest.width * 0.5);
    const dy = clientY - (rest.top + rest.height * 0.62);
    cup.style.transform = `translate(${dx}px, ${dy}px) scale(1.06) rotate(-4deg)`;
  };

  const pickUp = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    const cup = event.currentTarget;
    cup.setPointerCapture(event.pointerId);
    restRect.current = cup.getBoundingClientRect();
    holding.current = true;
    setIsHolding(true);
    document.body.classList.add("holding-cup");
    carryCup(event.clientX, event.clientY);
  };

  const carry = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!holding.current) return;
    carryCup(event.clientX, event.clientY);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const box = canvas.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    if (x < 0 || y < 0 || x > box.width || y > box.height) {
      lastStamp.current = null;
      return;
    }

    const last = lastStamp.current;
    if (!last || Math.hypot(x - last.x, y - last.y) >= STAMP_EVERY_PX) {
      stamp(x, y, last);
      lastStamp.current = { x, y };
      if (!hasDrawn) setHasDrawn(true);
    }
  };

  const putDown = () => {
    if (!holding.current) return;
    holding.current = false;
    lastStamp.current = null;
    setIsHolding(false);
    document.body.classList.remove("holding-cup");
    const cup = cupRef.current;
    if (cup) cup.style.transform = ""; // back to the coaster, by transition
  };

  const wipe = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    setHasDrawn(false);
  };

  return (
    <div ref={wrapRef} className="doodle">
      <div className="section-sign doodle__board">
        <canvas ref={canvasRef} className="doodle__canvas" aria-label="a board to doodle on with the cup" />
        {!hasDrawn && (
          <p className="doodle__hint" aria-hidden="true">
            {isHolding ? "now drag it across the board" : "pick up the cup and doodle"}
          </p>
        )}
      </div>

      <div className="doodle__foot">
        <span className="receipt-meta opacity-50">wiped on refresh</span>
        <button type="button" className="doodle__wipe receipt-meta" onClick={wipe}>
          wipe it now
        </button>
      </div>

      {/* The coaster stays put; the cup lifts off it and comes back. */}
      <div className="coaster" aria-hidden="true" />
      <div
        ref={cupRef}
        className={`cup-tool ${isHolding ? "is-holding" : ""}`}
        role="button"
        aria-label="pick up the cup to doodle on the board"
        tabIndex={0}
        onPointerDown={pickUp}
        onPointerMove={carry}
        onPointerUp={putDown}
        onPointerCancel={putDown}
      >
        <img src="/assets/website/new coffee cup.webp" alt="" draggable={false} />
      </div>
    </div>
  );
};

export default DoodleBoard;
