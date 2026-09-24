import { useEffect, useRef, useState } from "react";

/**
 * A chalkboard you draw on with the coffee cup. Pick the cup up off its
 * coaster, drag it across the board and it leaves rings and smears where
 * its base touched; let go and it settles back on the coaster. Nothing is
 * stored: a refresh wipes the board, which is the point.
 */
const COFFEE = "196, 150, 96";
const MIN_STEP_PX = 2;

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

  /** The trail the cup leaves: a wide wet wash with a darker thread through it. */
  const smear = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.strokeStyle = `rgba(${COFFEE}, 0.14)`;
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();

    ctx.strokeStyle = `rgba(${COFFEE}, ${0.28 + Math.random() * 0.1})`;
    ctx.lineWidth = 3 + Math.random() * 1.5;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
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
    if (last && Math.hypot(x - last.x, y - last.y) < MIN_STEP_PX) return;
    if (last) smear(last, { x, y });
    lastStamp.current = { x, y };
    if (!hasDrawn) setHasDrawn(true);
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
      </div>

      <div className="doodle__foot">
        <span className="receipt-meta opacity-50">
          {hasDrawn ? "wiped on refresh" : "pick up the cup to doodle"}
        </span>
        <button type="button" className="doodle__wipe receipt-meta" onClick={wipe}>
          wipe it now
        </button>
      </div>

      {/* The saucer stays put; the cup lifts off it and comes back. Both are
          drawn top-down so the cup can leave the plate behind. */}
      <svg className="saucer" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <radialGradient id="saucer-face" cx="40%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#fcfaf3" />
            <stop offset="55%" stopColor="#efe9da" />
            <stop offset="100%" stopColor="#d2c6ae" />
          </radialGradient>
          <radialGradient id="saucer-well" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="rgba(48, 36, 33, 0)" />
            <stop offset="100%" stopColor="rgba(48, 36, 33, 0.16)" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="47" fill="url(#saucer-face)" stroke="rgba(48, 36, 33, 0.2)" strokeWidth="1" />
        {/* rim highlight */}
        <circle cx="50" cy="50" r="43.5" fill="none" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="1.2" />
        {/* the well the cup sits in */}
        <circle cx="50" cy="50" r="32" fill="url(#saucer-well)" />
        <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(48, 36, 33, 0.12)" strokeWidth="1" />
        {/* the ring the cup leaves on the plate */}
        <circle cx="50" cy="50" r="27" fill="none" stroke="rgba(139, 111, 71, 0.3)" strokeWidth="2.4" />
      </svg>
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
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <radialGradient id="cup-face" cx="38%" cy="35%" r="68%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#f3eee2" />
              <stop offset="100%" stopColor="#d6ccb7" />
            </radialGradient>
            <radialGradient id="cup-wall" cx="50%" cy="50%" r="50%">
              <stop offset="78%" stopColor="rgba(48, 36, 33, 0)" />
              <stop offset="100%" stopColor="rgba(48, 36, 33, 0.22)" />
            </radialGradient>
            <radialGradient id="cup-coffee" cx="42%" cy="40%" r="62%">
              <stop offset="0%" stopColor="#5a3a22" />
              <stop offset="55%" stopColor="#3a2312" />
              <stop offset="100%" stopColor="#24140a" />
            </radialGradient>
          </defs>
          {/* handle: a loop with an edge and a highlight */}
          <path d="M80 39c16 0 16 22 0 22" fill="none" stroke="rgba(48, 36, 33, 0.28)" strokeWidth="13" strokeLinecap="round" />
          <path d="M80 39c16 0 16 22 0 22" fill="none" stroke="#f1ebdd" strokeWidth="10" strokeLinecap="round" />
          <path d="M81 41.5c11 0 11 17 0 17" fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1.6" strokeLinecap="round" />
          {/* body, rim, inner wall */}
          <circle cx="50" cy="50" r="34" fill="url(#cup-face)" stroke="rgba(48, 36, 33, 0.22)" strokeWidth="1" />
          <circle cx="50" cy="50" r="30.5" fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1" />
          <circle cx="50" cy="50" r="28" fill="url(#cup-wall)" />
          {/* coffee with crema at the edge and a glint */}
          <circle cx="50" cy="50" r="25" fill="url(#cup-coffee)" />
          <circle cx="50" cy="50" r="24" fill="none" stroke="#c48b4f" strokeWidth="2.4" opacity="0.9" />
          <circle cx="50" cy="50" r="22" fill="none" stroke="#7a4d28" strokeWidth="0.8" opacity="0.6" />
          <path d="M34 42a19 19 0 0 1 12-10" fill="none" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};

export default DoodleBoard;
