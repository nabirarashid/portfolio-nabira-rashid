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
        {/* The chalk rule again, above the coffee, so the frame stays clean. */}
        <span className="doodle__frame" aria-hidden="true" />
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
          <linearGradient id="saucer-glaze" x1="18%" y1="12%" x2="85%" y2="92%">
            <stop offset="0%" stopColor="#fbf8f1" />
            <stop offset="55%" stopColor="#ece5d5" />
            <stop offset="100%" stopColor="#cfc3ab" />
          </linearGradient>
          <radialGradient id="saucer-well" cx="50%" cy="50%" r="50%">
            <stop offset="72%" stopColor="rgba(48, 36, 33, 0)" />
            <stop offset="100%" stopColor="rgba(48, 36, 33, 0.2)" />
          </radialGradient>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
        </defs>
        <circle cx="50" cy="50" r="47" fill="url(#saucer-glaze)" />
        <circle cx="50" cy="50" r="46.5" fill="none" stroke="rgba(48, 36, 33, 0.14)" strokeWidth="1" />
        <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1" />
        <circle cx="50" cy="50" r="31" fill="url(#saucer-well)" />
        <circle cx="50" cy="50" r="31" fill="none" stroke="rgba(48, 36, 33, 0.1)" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="26.5" fill="none" stroke="rgba(120, 90, 55, 0.32)" strokeWidth="2.2" filter="url(#soft)" />
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
            {/* porcelain, lit from the top left */}
            <linearGradient id="cup-glaze" x1="15%" y1="10%" x2="85%" y2="90%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f2ede1" />
              <stop offset="100%" stopColor="#d3c8b3" />
            </linearGradient>
            {/* the rim, lit the other way so it reads as a lip */}
            <linearGradient id="cup-rim" x1="85%" y1="90%" x2="15%" y2="10%">
              <stop offset="0%" stopColor="#fffdf8" />
              <stop offset="100%" stopColor="#e2dac8" />
            </linearGradient>
            <radialGradient id="cup-wall" cx="50%" cy="50%" r="50%">
              <stop offset="76%" stopColor="rgba(48, 36, 33, 0)" />
              <stop offset="100%" stopColor="rgba(48, 36, 33, 0.28)" />
            </radialGradient>
            <radialGradient id="cup-coffee" cx="40%" cy="38%" r="65%">
              <stop offset="0%" stopColor="#6a4527" />
              <stop offset="45%" stopColor="#3d2513" />
              <stop offset="100%" stopColor="#1f110a" />
            </radialGradient>
            <filter id="cup-soft" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.2" />
            </filter>
          </defs>

          {/* handle: a proper loop with thickness, the body sits over its root */}
          <path
            d="M79 34.5C104 37 104 63 79 65.5V57.5C94.5 56 94.5 44 79 42.5Z"
            fill="url(#cup-glaze)"
            stroke="rgba(48, 36, 33, 0.16)"
            strokeWidth="0.8"
          />
          <path d="M81.5 39.5c9.5 1.5 9.5 19.5 0 21" fill="none" stroke="rgba(48, 36, 33, 0.14)" strokeWidth="1.2" />
          <path d="M82 37.5c7 1 9.5 3 10.5 6" fill="none" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1.4" strokeLinecap="round" />

          {/* body and rim */}
          <circle cx="50" cy="50" r="34" fill="url(#cup-glaze)" />
          <circle cx="50" cy="50" r="33.6" fill="none" stroke="rgba(48, 36, 33, 0.16)" strokeWidth="0.8" />
          <circle cx="50" cy="50" r="30.5" fill="none" stroke="url(#cup-rim)" strokeWidth="5.5" />
          <circle cx="50" cy="50" r="27.6" fill="none" stroke="rgba(48, 36, 33, 0.14)" strokeWidth="0.8" />
          <circle cx="50" cy="50" r="27.5" fill="url(#cup-wall)" />

          {/* coffee: crema at the edge, a slow swirl, and the light on it */}
          <circle cx="50" cy="50" r="24.5" fill="url(#cup-coffee)" />
          <circle cx="50" cy="50" r="23.6" fill="none" stroke="#b9834a" strokeWidth="2" opacity="0.85" />
          <circle cx="50" cy="50" r="22" fill="none" stroke="#d9a66a" strokeWidth="0.9" opacity="0.35" />
          <path d="M40 58c4-10 16-12 21-4" fill="none" stroke="#c9945a" strokeWidth="1.2" opacity="0.28" strokeLinecap="round" />
          <ellipse cx="41" cy="40.5" rx="6.5" ry="3.6" fill="#ffffff" opacity="0.22" transform="rotate(-35 41 40.5)" filter="url(#cup-soft)" />
        </svg>
      </div>
    </div>
  );
};

export default DoodleBoard;
